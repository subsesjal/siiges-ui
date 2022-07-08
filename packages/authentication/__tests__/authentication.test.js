const addition = require('../src/test');

describe('given a set of numbers', () => {
  const adden2 = 4;
  const adden1 = 5;
  describe('when we call addition function', () => {
    test('then adition should return its sum', () => {
      expect(addition(adden1, adden2)).toEqual(9);
    });
  });
});
