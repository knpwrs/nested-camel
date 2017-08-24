# nested-camel
[![Dependency Status](https://img.shields.io/david/knpwrs/nested-camel.svg)](https://david-dm.org/knpwrs/nested-camel)
[![devDependency Status](https://img.shields.io/david/dev/knpwrs/nested-camel.svg)](https://david-dm.org/knpwrs/nested-camel#info=devDependencies)
[![Build Status](https://img.shields.io/travis/knpwrs/nested-camel.svg)](https://travis-ci.org/knpwrs/nested-camel)
[![Npm Version](https://img.shields.io/npm/v/nested-camel.svg)](https://www.npmjs.com/package/nested-camel)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Badges](https://img.shields.io/badge/badges-6-orange.svg)](http://shields.io/)

A function which flattens a nested object tree by recursively joining and
camelcasing keys. Useful as a utility for css-in-js frameworks.

## Usage

```js
import { css } from 'glamor';
import nested from 'nested-camel';

// Use it directly:
const rule = css(nested({
  font: {
    family: 'fantasy',  // fontFamily
    size: '30em',       // fontSize
    weight: 'bold',     // fontWeight
  },
  border: {
    top: {
      style: 'dashed',  // borderTopStyle
      color: 'red',     // borderTopColor
      width: 'thick',   // borderTopWidth
    },
    bottom: {
      style: 'light',   // borderBottomStyle
      color: 'blue',    // borderBottomColor
      width: 'thin',    // borderBottomWidth
    },
  },
}));

// Use it with object-rest-spread:
const rule2 = css({
  background: 'blue',    // background
  ...nested({
    font: {
      family: 'fantasy', // fontFamily
      size: '30em',      // fontSize
      weight: 'bold',    // fontWeight
    },
  }),
});

// Compose it:
import { compose } from 'ramda';
const ncss = compose(css, nested);

const rule3 = ncss({
  font: {
    family: 'fantasy',  // fontFamily
    size: '30em',       // fontSize
    weight: 'bold',     // fontWeight
  },
  border: {
    top: {
      style: 'dashed',  // borderTopStyle
      color: 'red',     // borderTopColor
      width: 'thick',   // borderTopWidth
    },
    bottom: {
      style: 'solid',   // borderBottomStyle
      color: 'blue',    // borderBottomColor
      width: 'thin',    // borderBottomWidth
    },
  },
});
```

## License

**MIT**
