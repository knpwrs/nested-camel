import { forEach, isObject, assign, camelCase } from 'lodash';

const nested = (input, ...keys) => {
  const obj = {};
  forEach(input, (value, key) => {
    if (isObject(value)) {
      assign(obj, nested(value, ...keys, key));
    } else {
      obj[camelCase([...keys, key].join('-'))] = value;
    }
  });
  return obj;
};

export default nested;
