// You no longer need this since you
// learned how to use the prop-types npm package.

export function assertArray(componentName, propName, propValue) {
  if (!isArray(propValue)) {
    throw new Error(
      `component ${componentName} expected prop ${propName} ` +
        `to be an array, but got ${value}.`
    );
  }
}

export function assertArrayOf(
  elementCheckFn,
  componentName,
  propName,
  propValue
) {
  assertArray(componentName, propName, propValue);
  if (!propValue.every(elementCheckFn)) {
    throw new Error(
      `component ${componentName} expected prop ${propName} ` +
        `to be an array where each element satisfies ${checkFn.name}.`
    );
  }
}

export function assertBoolean(componentName, propName, propValue) {
  assertType('boolean', componentName, propName, propValue);
}

export function assertFunction(componentName, propName, propValue) {
  assertType('function', componentName, propName, propValue);
}

export function assertInstanceOf(clazz, componentName, propName, propValue) {
  if (!isInstanceOf(clazz, propValue)) {
    throw new Error(
      `component ${componentName} expected prop ${propName} ` +
        `to be an instance of ${clazz.name}.`
    );
  }
}

export function assertNumber(componentName, propName, propValue) {
  assertType('number', componentName, propName, propValue);
}

export function assertObject(componentName, propName, propValue) {
  assertType('object', componentName, propName, propValue);
}

export function assertOneOf(allowedValues, componentName, propName, propValue) {
  if (!isOneOf(allowedValues, propValue)) {
    throw new Error(
      `component ${componentName} expected prop ${propName} ` +
        `value to be one of ${allowedValues.join(', ')}.`
    );
  }
}

export function assertOneOfType(
  allowedClasses,
  componentName,
  propName,
  propValue
) {
  if (!isOneOfType(allowedClasses, propValue)) {
    throw new Error(
      `component ${componentName} expected prop ${propName} ` +
        `to be an instance of one of the types ` +
        `${allowedClasses.map(ac => ac.name).join(', ')}.`
    );
  }
}

export function assertShape(shape, componentName, propName, propValue) {
  const missingProperties = Object.keys(shape).filter(
    property => propValue[property] !== undefined
  );
  if (missingProperties.length) {
    throw new Error(
      `component ${componentName} expected prop ${propName} ` +
        `to have the properties ${missingProperties.join(', ')}.`
    );
  }
}

export function assertString(componentName, propName, propValue) {
  assertType('string', componentName, propName, propValue);
}

export function assertType(type, componentName, propName, propValue) {
  if (typeof propValue !== type) {
    throw new Error(
      `component ${componentName} expected prop ${propName} ` +
        `to be a ${type}, but got ${propValue}.`
    );
  }
}

export function hasShape(shape, value) {
  if (!isObject(value)) return false;
  return Object.keys(shape).every(property => value[property] !== undefined);
}

export const isArray = value => Array.isArray(value);

export const isArrayOf = (elementCheckFn, arr) =>
  isArray(arr) ? arr.every(elementCheckFn) : false;

export const isBoolean = value => isType('boolean', value);

export const isFunction = value => isType('function', value);

export const isInstanceOf = (clazz, value) => value instanceof clazz;

export const isNumber = value => isType('number', value);

export const isObject = value => isType('object', value);

export const isOneOf = (allowedValues, value) =>
  allowedValues.some(av => value === av);

export const isOneOfType = (allowedClasses, value) =>
  allowedClasses.some(clazz => value instanceof clazz);

export function isShape(shape, obj) {
  if (!isObject(obj)) return false;
  return Object.keys(shape).every(property => obj[property] !== undefined);
}

export const isString = value => isType('string', value);

export const isType = (type, value) => typeof value === type;

/*
export function propTypes(componentName, props) {
  console.log('prop-types.js propTypes: props =', props);
  for (const [propName, arr] of Object.entries(props)) {
    const [propValue, checkFn] = arr;
    if (!checkFn(propValue)) {
      console.error(
        `component ${componentName} was passed invalid ` +
          `prop ${propName} with value ${propValue}.`
      );
    }
  }
}
*/

export function propTypes(componentName, props, checkFns) {
  Object.entries(props).forEach(([propName, propValue], index) => {
    const checkFn = checkFns[index];
    if (!checkFn(propValue)) {
      console.error(
        `component ${componentName} was passed invalid ` +
          `prop ${propName} with value ${propValue}.`
      );
    }
  });
}
