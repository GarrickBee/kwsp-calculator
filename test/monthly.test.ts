import { getMonthlyContribution } from '../src/monthly';

describe('getMonthlyContribution', () => {
  it('valid monthly contribution', () => {
    expect(() => getMonthlyContribution(-3000, 11)).toThrowError(
      "Monthly salary can't less than or equal to 0"
    );
    expect(() => getMonthlyContribution(3000, 11)).not.toThrowError();
  });

  it('valid worker contribution', () => {
    expect(() => getMonthlyContribution(3000, -11)).toThrowError(
      'workerRate rate must be a valid percentage'
    );
    expect(() => getMonthlyContribution(3000, 11)).not.toThrowError();
    expect(getMonthlyContribution(3000).worker).toEqual(330);
    expect(getMonthlyContribution(3000).rate.worker).toEqual(11);
    expect(getMonthlyContribution(3000, 9).worker).toEqual(270);
    expect(getMonthlyContribution(3000, 9).rate.worker).toEqual(9);
  });

  it('valid employer contribution', () => {
    expect(
      getMonthlyContribution(3000, 11, {
        overwriteEmployerRate: 10,
      }).rate.employer
    ).toEqual(10);
    expect(
      getMonthlyContribution(3000, 11, {
        overwriteEmployerRate: 10,
      }).employer
    ).toEqual(300);
    expect(
      getMonthlyContribution(3000, 11, {
        overwriteEmployerRate: 10,
      }).total
    ).toEqual(630);
  });

  it('official employer rate', () => {
    expect(getMonthlyContribution(3000, 11).rate.employer).toEqual(13);
    expect(getMonthlyContribution(5000, 11).rate.employer).toEqual(13);
    expect(getMonthlyContribution(6000, 11).rate.employer).toEqual(12);
  });
});
