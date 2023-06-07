export const hasOwnProperty = (obj: object, key: string): boolean => {
  if (Boolean(obj) && Boolean(key)) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  return false;
};
