'use strict';

const parse = require('../lib/util')

test('Parse int should be ok', () => {
    expect(parse("%s", 1)).toBe("1");
  });