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

// Handles blank values in import data
export const parseValue = (value, parser, offset = 0) => {
  if (
    value === undefined 
    || value === null 
    || value.trim() === ''
  ) return null;
  return parser(value) + offset;
};