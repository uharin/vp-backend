import { executeQuery } from '../../db.js';
import { createCustomError } from '../../../handlers/errors.js';
import { toCamelCase } from '../../../handlers/utils.js';

const generateFirearmsQuery = (params = '') => `
  SELECT 
    fa.make_and_model,
    ARRAY_AGG(DISTINCT CONCAT(sh.first_name, ' ', sh.last_name)) AS used_by,
    COUNT(DISTINCT cf.case_id) AS case_count,
    ca.size AS caliber,
    fc.name AS firearm_classification
  FROM firearms fa
  LEFT JOIN case_firearms cf 
    ON fa.firearm_id = cf.firearm_id
  LEFT JOIN caliber ca 
    ON cf.caliber_id = ca.caliber_id
  LEFT JOIN firearm_classifications fc 
    ON cf.firearm_classification_id = fc.firearm_classification_id
  LEFT JOIN cases c 
    ON cf.case_id = c.case_id
  LEFT JOIN case_shooters cs 
    ON c.case_id = cs.case_id
  LEFT JOIN shooters sh 
    ON cs.shooter_id = sh.shooter_id
  ${params}
  GROUP BY 
    fa.firearm_id, 
    fa.make_and_model, 
    ca.size, 
    fc.name;
`;

// Used in case query
export const FIREARMS_SUBQUERY = `
  WITH FirearmsData AS (
  SELECT
    cf.case_id,
    fa.make_and_model,
    ARRAY_AGG(DISTINCT CONCAT(sh.first_name, ' ', sh.last_name)) AS used_by,
    COUNT(DISTINCT cf.case_id) AS case_count,
    ca.size AS caliber,
    fc.name AS firearm_classification,
    fil.status AS firearm_illegal_status,
    fle.status AS firearm_legal_status,
    ftp.timeframe AS firearm_purchase_timeframe,
    fth.status AS firearm_theft_status,
    cf.used_in_shooting,
    cf.modified,
    cf.large_capacity_magazine,
    cf.extended_magazine,
    cf.assembled_with_legal_parts,
    cf.gifted,
    cf.unknown
  FROM case_firearms cf
  LEFT JOIN firearms fa 
    ON cf.firearm_id = fa.firearm_id
  LEFT JOIN caliber ca
    ON cf.caliber_id = ca.caliber_id
  LEFT JOIN firearm_classifications fc
    ON cf.firearm_classification_id = fc.firearm_classification_id
  LEFT JOIN firearm_illegal_purchases fil
    ON cf.firearm_illegal_id = fil.firearm_illegal_id
  LEFT JOIN firearm_legal_purchases fle 
    ON cf.firearm_legal_id = fle.firearm_legal_id
  LEFT JOIN firearm_purchase_timeframes ftp
    ON cf.firearm_purchase_timeframe_id = ftp.firearm_purchase_timeframe_id
  LEFT JOIN firearm_thefts fth
    ON cf.firearm_theft_id = fth.firearm_theft_id
  LEFT JOIN case_shooters cs 
    ON cf.case_id = cs.case_id
  LEFT JOIN shooters sh 
    ON cs.shooter_id = sh.shooter_id
  GROUP BY 
    cf.case_id, 
    fa.make_and_model,
    ca.size, 
    fc.name, 
    fil.status, 
    fle.status, 
    ftp.timeframe, 
    fth.status, 
    cf.used_in_shooting, 
    cf.modified, 
    cf.large_capacity_magazine, 
    cf.extended_magazine, 
    cf.assembled_with_legal_parts, 
    cf.gifted, 
    cf.unknown
  )
`;

const getFirearmQuery = (singleFirearm = false) => {
  if (singleFirearm) {
    return generateFirearmsQuery('WHERE fa.firearm_id = $1');
  }
  return generateFirearmsQuery();
};

export const getFirearms = async (_req, res, next) => {
  try {
    const result = await executeQuery(getFirearmQuery());

    const responsePayload = {
      status: 'success',
      data: { firearms: result.rows },
      message: 'Firearms retrieved successfully'
    };

    res.status(200).json(responsePayload);
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};

export const getFirearm = async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return next(createCustomError(400, 'Invalid firearm ID'));
  }

  try {
    const result =  await executeQuery(getFirearmQuery(true), [id]);

    const firearmData = result.rows[0];

    if (!firearmData) {
      return next(createCustomError(404, 'Firearm not found'));
    }

    res.status(200).json(toCamelCase(firearmData));
  } catch (err) {
    next(createCustomError(500, 'Internal Server Error', err.message));
  }
};