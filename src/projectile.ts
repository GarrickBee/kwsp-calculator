import { getDateDiffInMonth, isPercentage } from './util';

export function getKWSPProjectile(param: {
  monthlySalary: number;
  annualSalaryIncrementPercentage: number;
  kwspAnnualInterest: number;
  currentKwspAmount: number;
  workerRate: number;
  employerRate: number;
  from: Date;
  to: Date;
}) {
  if (param.monthlySalary <= 0) {
    throw new Error("Monthly salary can't less than or equal to 0");
  }
  if (!isPercentage(param.employerRate)) {
    throw new Error('employerRate must be a valid percentage');
  }
  if (!isPercentage(param.annualSalaryIncrementPercentage)) {
    throw new Error('employerRate must be a valid percentage');
  }
  if (!isPercentage(param.kwspAnnualInterest)) {
    throw new Error('kwspAnnualInterest must be a valid percentage');
  }
  if (!isPercentage(param.workerRate)) {
    throw new Error('workerRate must be a valid percentage');
  }
  if (!isPercentage(param.employerRate)) {
    throw new Error('employerRate must be a valid percentage');
  }

  // Get Difference in months
  const totalMonths = getDateDiffInMonth(param.from, param.to);
  const currentMonth = param.from.getMonth() + 1;
  let projectKwspAmount = Math.max(param.currentKwspAmount, 0);
  let monthlySalary = param.monthlySalary;

  const output: {
    totalAmount: number;
    annual: { year: number; amount: number; dividendAmount: number }[];
  } = {
    totalAmount: 0,
    annual: [],
  };

  // Loop through all months with 12 months cycle
  // Annual increment after 1 cycle at the beginning of the 12 months cycle
  let pass1Year = false;
  let annualAmount = 0;
  let annualDividend = 0;
  let currentYear = param.from.getFullYear();
  // Assuming fixed annual interest rate
  const monthlyInterestRate = param.kwspAnnualInterest / 100 / 12;
  for (
    let cumMonth = currentMonth;
    cumMonth <= totalMonths + currentMonth;
    cumMonth++
  ) {
    const month = cumMonth % 12;

    if (month == 1 && pass1Year) {
      // Move current year to next year
      currentYear += 1;
      // Salary increment
      monthlySalary +=
        (monthlySalary * param.annualSalaryIncrementPercentage) / 100;
    }

    // Calculate dividend by interest rate
    const monthlyDividend = projectKwspAmount * monthlyInterestRate;
    annualDividend += monthlyDividend;
    projectKwspAmount += monthlyDividend;

    // Calculate monthly amount
    const monthlyKwspAmount =
      (monthlySalary * param.employerRate) / 100 +
      (monthlySalary * param.workerRate) / 100;
    annualAmount += monthlyKwspAmount;
    projectKwspAmount += monthlyKwspAmount;

    // Surpass 1 year
    if (month == 0) {
      pass1Year = true;

      output.annual.push({
        year: currentYear,
        amount: annualAmount,
        dividendAmount: annualDividend,
      });

      // Reset for next year
      annualDividend = 0;
      annualAmount = 0;
    }
  }

  output.totalAmount = projectKwspAmount;
  return output;
}
