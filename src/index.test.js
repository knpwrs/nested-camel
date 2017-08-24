import test from 'ava';
import nested from './';

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
