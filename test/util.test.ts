import { getDateDiffInMonth, isPercentage } from '../src/util';

describe('test isPercentage', () => {
  it('valid isPercentage', () => {
    expect(isPercentage(-10)).toBe(false);
    expect(isPercentage(101)).toBe(false);
    expect(isPercentage(0)).toBe(true);
    expect(isPercentage(10)).toBe(true);
    expect(isPercentage(100)).toBe(true);
  });
});

describe('test getDateDiffInMonth', () => {
  it('valid getDateDiffInMonth', () => {
    expect(
      getDateDiffInMonth(new Date('2022-01-01'), new Date('2022-02-01'))
    ).toBe(1);
    expect(
      getDateDiffInMonth(new Date('2022-01-01'), new Date('2022-01-01'))
    ).toBe(0);
    expect(
      getDateDiffInMonth(new Date('2022-01-01'), new Date('2021-12-01'))
    ).toBe(-1);
    expect(
      getDateDiffInMonth(new Date('2022-01-01'), new Date('2023-01-01'))
    ).toBe(12);
  });
});
