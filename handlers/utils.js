export const convertToBoolean = (value) => {
  if (typeof value === 'string') {
    const lowerCaseValue = value.trim().toLowerCase();
    if (lowerCaseValue === 'yes' || lowerCaseValue === 'true' || lowerCaseValue === '1') {
      return true;
    } else if (lowerCaseValue === 'no' || lowerCaseValue === 'false' || lowerCaseValue === '0') {
      return false;
    }
  }
  return Boolean(value);
};