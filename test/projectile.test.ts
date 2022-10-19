import { getKWSPProjectile } from '../src/projectile';

describe('getKWSPProjectile', () => {
  it('valid projectile', () => {
    const totalKwsp = getKWSPProjectile({
      monthlySalary: 3000,
      annualSalaryIncrementPercentage: 0,
      kwspAnnualInterest: 6,
      currentKwspAmount: 50000,
      workerRate: 11,
      employerRate: 0,
      from: new Date('2022-01-01'),
      to: new Date('2024-12-01'),
    });

    console.log(totalKwsp);
  });
});
