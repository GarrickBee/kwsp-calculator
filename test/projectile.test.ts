import { getKWSPProjection } from '../src/projection';

describe('getKWSPProjectile', () => {
  it('invalid projectile', () => {
    expect(() =>
      getKWSPProjection({
        monthlySalary: -1000,
        annualSalaryIncrementPercentage: 0,
        kwspAnnualInterest: 6,
        currentKwspAmount: 50000,
        workerRate: 11,
        employerRate: 0,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError("Monthly salary can't less than or equal to 0");

    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: -10,
        kwspAnnualInterest: 6,
        currentKwspAmount: 50000,
        workerRate: 11,
        employerRate: 0,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('annualSalaryIncrementPercentage must be a valid percentage');
    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: 101,
        kwspAnnualInterest: 6,
        currentKwspAmount: 50000,
        workerRate: 11,
        employerRate: 0,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('annualSalaryIncrementPercentage must be a valid percentage');

    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: 30,
        kwspAnnualInterest: -10,
        currentKwspAmount: 50000,
        workerRate: 11,
        employerRate: 0,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('kwspAnnualInterest must be a valid percentage');

    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: 30,
        kwspAnnualInterest: 101,
        currentKwspAmount: 50000,
        workerRate: 11,
        employerRate: 0,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('kwspAnnualInterest must be a valid percentage');

    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: 30,
        kwspAnnualInterest: 6,
        currentKwspAmount: 50000,
        workerRate: 11,
        employerRate: -10,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('employerRate must be a valid percentage');

    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: 30,
        kwspAnnualInterest: 6,
        currentKwspAmount: 50000,
        workerRate: 11,
        employerRate: 101,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('employerRate must be a valid percentage');

    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: 30,
        kwspAnnualInterest: 6,
        currentKwspAmount: 50000,
        workerRate: -10,
        employerRate: 0,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('workerRate must be a valid percentage');

    expect(() =>
      getKWSPProjection({
        monthlySalary: 3000,
        annualSalaryIncrementPercentage: 30,
        kwspAnnualInterest: 6,
        currentKwspAmount: 50000,
        workerRate: 101,
        employerRate: 0,
        from: new Date('2022-01-01'),
        to: new Date('2022-01-01'),
      })
    ).toThrowError('workerRate must be a valid percentage');
  });

  it('valid projectile within 1 year with 6% interest', () => {
    const kwspProjectile = getKWSPProjection({
      monthlySalary: 3000,
      annualSalaryIncrementPercentage: 0,
      kwspAnnualInterest: 6,
      currentKwspAmount: 50000,
      workerRate: 11,
      employerRate: 0,
      from: new Date('2022-01-01'),
      to: new Date('2022-01-01'),
    });

    expect(kwspProjectile.totalAmount).toEqual(50580);
    expect(kwspProjectile.annual).toBeInstanceOf(Array);
    expect(kwspProjectile.annual).toEqual([
      {
        year: 2022,
        amount: 330,
        dividendAmount: 250,
      },
    ]);
  });

  it('valid projectile 1 year and 1 month with 6% interest', () => {
    const kwspProjectile = getKWSPProjection({
      monthlySalary: 3000,
      annualSalaryIncrementPercentage: 0,
      kwspAnnualInterest: 6,
      currentKwspAmount: 50000,
      workerRate: 11,
      employerRate: 0,
      from: new Date('2022-01-01'),
      to: new Date('2023-01-01'),
    });

    console.log(kwspProjectile);
    expect(kwspProjectile.annual.length).toBe(2);
    expect(Math.round(kwspProjectile.totalAmount)).toEqual(57770);
    expect(Math.round(kwspProjectile.annual[0].year)).toEqual(2022);
    expect(Math.round(kwspProjectile.annual[0].amount)).toEqual(3960);
    expect(Math.round(kwspProjectile.annual[0].dividendAmount)).toEqual(3195);
    expect(Math.round(kwspProjectile.annual[1].year)).toEqual(2023);
    expect(Math.round(kwspProjectile.annual[1].amount)).toEqual(330);
    expect(Math.round(kwspProjectile.annual[1].dividendAmount)).toEqual(286);
  });
});
