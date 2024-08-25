import { RESOURCES } from '../db/resources.js';
import { capitalize, toCamelCase } from './utils.js';
import { executeQuery } from '../db/db.js';
import { createCustomError } from './errors.js';

// Used for fetching data from tables that are related to a primary table (usually lookup tables)
const fetchRelatedData = async (id, fetchFn, key) => {
  if (id) {
    try {
      const data = await fetchFn(id);
      console.log(`Fetched ${key}:`, data);
      return { [key]: data };
    } catch (err) {
      console.error(`Error fetching ${key}:`, err.message);
      return { [key]: null };
    }
  }
  return { [key]: null };
};

export const handleGetRequest = async (resourceType, req, res, next) => {
  if (!RESOURCES[resourceType]) {
    return next(createCustomError(400, `Invalid resource type: ${resourceType}`));
  }

  const { 
    table, 
    id: tableId,
    queryGenerator,
    relatedData,
  } = RESOURCES[resourceType];

  const { id } = req.params;
  const idSearch = !!id;

  if (idSearch && isNaN(id)) {
    return next(createCustomError(400, `Invalid ${resourceType} ID`));
  }

  try {
    const queryId = idSearch
      ? `WHERE ${table}.${tableId} = $1` 
      : '';
  
    const query = queryGenerator()(queryId);
    const result = await executeQuery(query, idSearch ? [id] : []);
    const data = idSearch ? result.rows[0] : result.rows;
    
    if (!data) {
      return next(createCustomError(404, `No ${entity} were found`));
    }

    /* 
      Fetch related data for resource_ids returned by the initial query.
      If resource config includes relatedData, use 'fetchRelated' fn to fetch and merge data into a single object w/reduce.
    */
    let response;

    if (relatedData && data) {
      const fetchRelated = async (resourceData) => {
        const relatedPromises = Object.entries(relatedData).map(
          async ([key, fetchFn]) => {
            const relatedId = resourceData[`${key}_id`];
            return fetchRelatedData(relatedId, fetchFn, key);
          }
        );

        const relatedResults = await Promise.all(relatedPromises).reduce(
          (acc, result) => ({ ...acc, ...result }), {}
        );

        return { ...toCamelCase(resourceData), ...toCamelCase(relatedResults) };
      };

      const finalData = await Promise.all((idSearch ? [data] : data).map(fetchRelated));

      response = idSearch ? finalData[0] : finalData;
    } else {
      response = idSearch ? toCamelCase(data) : data.map(toCamelCase);
    }

    res.status(200).json({
      status: 'success',
      data: idSearch ? response : { [resourceType]: response },
      message: `${capitalize(resourceType)} retrieved successfully`,
    });
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};

