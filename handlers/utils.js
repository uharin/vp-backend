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
