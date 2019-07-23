'use strict';

import  { parse } from '../lib/util.js'

test('Parse int variable should be ok', () => {
    expect(parse("%s", 1)).toBe("1");
  });

test('Parse string variable should be ok', () => {
    expect(parse("%s", "a")).toBe("a");
  });

test('Parse multi variables should be ok', () => {
    expect(parse("%s%s", "a", 1)).toBe("a1");
  });

test('Overlap arrays should return true', () => {
    expect(twoArrayOverlap([1], [1])).toBeTruthy();
  });

test('NotOverlap arrays should return false', () => {
    expect(twoArrayOverlap([1], [0])).toBeFalsy();
  });

test('twoArrayOverlap should work for empty arrays', () => {
    expect(twoArrayOverlap([], [])).toBeFalsy();
  });
