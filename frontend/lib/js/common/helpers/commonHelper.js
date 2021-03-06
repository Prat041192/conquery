// @flow

export const isEmpty = (variable: any) => {
  return typeof variable === 'undefined' ||
    variable === null ||
    variable === "" ||
    (variable instanceof Array && variable.length === 0) ||
    (variable.constructor === Object && Object.keys(variable).length === 0);
};

export const isEmptyObject = (variable: any) => {
  if (!variable) return false;

  return (
    variable.constructor === Object && (
      Object.keys(variable).length === 0 || (
        Object.keys(variable).length > 0 &&
        Object.keys(variable).every(k => typeof variable[k] === 'undefined')
      )
    )
  );
};

export const stripObject = (obj: Object) => {
  return Object.keys(obj).reduce((acc, k) => ({
    ...acc,
    [k]: (isEmpty(obj[k]) || isEmptyObject(obj[k])) ? undefined : obj[k]
  }), {});
}

export const includes = (array: any[], element: any) => {
  return array.indexOf(element) !== -1;
};

export const numberToThreeDigitArray = (number: number) => {
  // Input: 10       Output: [10]
  // Input: 1234     Output: [1, 234]
  // Input: 24521280 Output: [23, 521, 280]
  //
  // Taken from:
  // http://stackoverflow.com/questions/2901102/
  // how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").split(' ');
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toUpperCaseUnderscore = (str: string) => {
  if (str.toUpperCase() === str)
    return str;

  return str.replace(
    /[A-Z]/g,
    (upperCaseChar) => '_' + upperCaseChar.toLowerCase()
  ).toUpperCase();
}

export const isObject = (item: any) =>
  item && typeof item === 'object' && !Array.isArray(item);

export const mergeDeep = (...elements: Object[]) => {
  return elements
    .filter(isObject)
    .reduce((aggregate, current) => {
      const nonObjectKeys = Object.keys(current).filter(key => !isObject(current[key]));
      const objectKeys = Object.keys(current).filter(key => isObject(current[key]));
      const newKeys = objectKeys.filter(key => !(key in aggregate));
      const mergeKeys = objectKeys.filter(key => key in aggregate);

      return Object.assign(
        {},
        aggregate,
        ...nonObjectKeys.map(key => ({ [key]: current[key] })),
        ...newKeys.map(key => ({ [key]: current[key] })),
        ...mergeKeys.map(key => ({ [key]: mergeDeep(aggregate[key], current[key]) }))
      );
    }, {});
};
