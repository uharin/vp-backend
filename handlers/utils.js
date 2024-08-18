// Handles binary (0/1, yes/no) values in import data
export const convertToBoolean = (value) => {
  if (typeof value === 'string') {
    const lowerCaseValue = value.trim().toLowerCase();
    return ['yes', 'true', '1'].includes(lowerCaseValue)
      ? true
      : ['no', 'false', '0'].includes(lowerCaseValue)
        ? false
        : Boolean(value);
  }
  return Boolean(value);
};

// Converts snake case query results to camelCase for front-end consumption
export function toCamelCase(obj) {
  const camelCaseKeys = (key) => key.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const camelKey = camelCaseKeys(key);

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      acc[camelKey] = toCamelCase(value);
    } else if (Array.isArray(value)) {
      acc[camelKey] = value.map(item => (item && typeof item === 'object') ? toCamelCase(item) : item);
    } else {
      acc[camelKey] = value;
    }

    return acc;
  }, {});
}

/*
  Handles blank values in import data. 
  Offset = 1 as default because many values in csv start at value 0, but we want database table IDs to start at 1.
*/
export const parseValue = (value, parser, { defaultValue = null, offset = 1 } = {}) => {
  try {
    if (value === undefined
      || value === null 
      || (typeof value === 'string' && value.trim() === ''))
    return defaultValue;

    const parsedValue = parser(value);
    return isNaN(parsedValue)
      ? defaultValue
      : parsedValue + offset;
  } catch (error) {
    return defaultValue;
  }
};
