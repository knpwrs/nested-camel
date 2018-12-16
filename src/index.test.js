import test from 'ava';
import { css } from 'glamor';
import { compose } from 'lodash/fp';
import nested from '.';

test('sanity check', (t) => {
  t.is(typeof nested, 'function');
});

test('single level', (t) => {
  t.deepEqual(nested({
    font: {
      family: 'Lato',
      size: '1em',
    },
  }), {
    fontFamily: 'Lato',
    fontSize: '1em',
  });
});

test('recursive levels', (t) => {
  t.deepEqual(nested({
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
  }), {
    borderStyle: 'dashed',
    borderTopWidth: '1px',
    borderTopColor: 'black',
    borderBottomWidth: '2px',
    borderBottomColor: 'red',
  });
});

test('multiple recursive levels', (t) => {
  t.deepEqual(nested({
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
  }), {
    borderStyle: 'dashed',
    borderTopWidth: '1px',
    borderTopColor: 'black',
    borderBottomWidth: '2px',
    borderBottomColor: 'red',
    marginTop: 10,
    marginBottom: 5,
  });
});

test('with glamor', (t) => {
  t.deepEqual(css({
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
  }), css({
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

test('with glamor (no object-rest-spread)', (t) => {
  t.deepEqual(css(nested({
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
  })), css({
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

test('with glamor (composed)', (t) => {
  const ncss = compose(css, nested);
  t.deepEqual(ncss(nested({
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
  })), css({ // Match without composition
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
