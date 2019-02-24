import { css } from 'glamor';
import { compose } from 'lodash/fp';
import nested from '.';

test('sanity check', () => {
  expect(typeof nested).toBe('function');
});

test('single level', () => {
  expect(nested({
    font: {
      family: 'Lato',
      size: '1em',
    },
  })).toEqual({
    fontFamily: 'Lato',
    fontSize: '1em',
  });
});

test('recursive levels', () => {
  expect(nested({
    border: {
      style: 'dashed',
      top: {
        width: '1px',
        color: 'black',
      },
      bottom: {
        width: '2px',
        color: 'red',
      },
    },
  })).toEqual({
    borderStyle: 'dashed',
    borderTopWidth: '1px',
    borderTopColor: 'black',
    borderBottomWidth: '2px',
    borderBottomColor: 'red',
  });
});

test('multiple recursive levels', () => {
  expect(nested({
    border: {
      style: 'dashed',
      top: {
        width: '1px',
        color: 'black',
      },
      bottom: {
        width: '2px',
        color: 'red',
      },
    },
    margin: {
      top: 10,
      bottom: 5,
    },
  })).toEqual({
    borderStyle: 'dashed',
    borderTopWidth: '1px',
    borderTopColor: 'black',
    borderBottomWidth: '2px',
    borderBottomColor: 'red',
    marginTop: 10,
    marginBottom: 5,
  });
});

test('with glamor', () => {
  expect(css({
    background: 'green',
    ...nested({
      border: {
        style: 'dashed',
        top: {
          width: '1px',
          color: 'black',
        },
        bottom: {
          width: '2px',
          color: 'red',
        },
      },
      margin: {
        top: 10,
        bottom: 5,
      },
    }),
  })).toEqual(css({
    background: 'green',
    borderStyle: 'dashed',
    borderTopWidth: '1px',
    borderTopColor: 'black',
    borderBottomWidth: '2px',
    borderBottomColor: 'red',
    marginTop: 10,
    marginBottom: 5,
  }));
});

test('with glamor (no object-rest-spread)', () => {
  expect(css(nested({
    background: 'green',
    border: {
      style: 'dashed',
      top: {
        width: '1px',
        color: 'black',
      },
      bottom: {
        width: '2px',
        color: 'red',
      },
    },
    margin: {
      top: 10,
      bottom: 5,
    },
  }))).toEqual(css({
    background: 'green',
    borderStyle: 'dashed',
    borderTopWidth: '1px',
    borderTopColor: 'black',
    borderBottomWidth: '2px',
    borderBottomColor: 'red',
    marginTop: 10,
    marginBottom: 5,
  }));
});

test('with glamor (composed)', () => {
  const ncss = compose(css, nested);
  expect(ncss(nested({
    background: 'green',
    border: {
      style: 'dashed',
      top: {
        width: '1px',
        color: 'black',
      },
      bottom: {
        width: '2px',
        color: 'red',
      },
    },
    margin: {
      top: 10,
      bottom: 5,
    },
  }))).toEqual(css({ // Match without composition
    background: 'green',
    borderStyle: 'dashed',
    borderTopWidth: '1px',
    borderTopColor: 'black',
    borderBottomWidth: '2px',
    borderBottomColor: 'red',
    marginTop: 10,
    marginBottom: 5,
  }));
});
