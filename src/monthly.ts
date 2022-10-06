import { isPercentage } from './util';

export function getMonthlyContribution(
  monthlySalary: number,
  workerRate: number = 11,
  option?: {
    overwriteEmployerRate?: number;
  }
) {
  if (monthlySalary <= 0) {
    throw new Error("Monthly salary can't less than or equal to 0");
  }

  /**
   * Rate from KWSP Portals
   * @URL https://www.kwsp.gov.my/member/overview#:~:text=When%20you%20contribute%2011%25%20of,government)%20to%20your%20EPF%20savings.
   */
  let employerRate = monthlySalary <= 5000 ? 13 : 12;
  // Overwrite employer contribution
  if (option?.overwriteEmployerRate) {
    if (!isPercentage(option.overwriteEmployerRate)) {
      throw new Error('overwriteEmployerRate must be a valid percentage');
    }

    employerRate = option.overwriteEmployerRate;
  }

  if (!isPercentage(workerRate)) {
    throw new Error('workerRate rate must be a valid percentage');
  }

  const totalContributedByEmployee = (monthlySalary * workerRate) / 100;
  const totalContributedByEmployer = (monthlySalary * employerRate) / 100;
  const total = totalContributedByEmployee + totalContributedByEmployer;

  return {
    total: total,
    worker: totalContributedByEmployee,
    employer: totalContributedByEmployer,
    rate: {
      worker: workerRate,
      employer: employerRate,
    },
  };
}
