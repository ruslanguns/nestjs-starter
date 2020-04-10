import { randomNumberGenerator } from '../../utils/random-number-generator.utils';

describe('randomNumberGenerator', () => {
  const min = 1000;
  const max = 9999;
  let result;

  beforeEach(() => {
    result = randomNumberGenerator(min, max);
  });

  it('should return number with value', () => {
    expect(typeof result).toBe('number');
  });

  it('should be greter than 1000 and less than 9999', () => {
    expect(result).toBeGreaterThan(1000);
    expect(result).toBeLessThan(9999);
  });
});
