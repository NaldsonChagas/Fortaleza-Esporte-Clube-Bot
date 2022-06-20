import { ArrayUtils } from './array.utils';

describe('Tests for Array Utils', () => {
  it('Should return a random item from array', () => {
    const array = [1, 2, 3, 4];

    const item = ArrayUtils.returnRandomItem(array);
    expect(item).toEqual(expect.any(Number));
  });
});
