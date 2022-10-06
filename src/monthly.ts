import { isPercentage } from './util';

export function getMonthlyContribution(
  monthlySalary: number,
  employeeContributionRate: number = 11,
  option?: {
    overwriteEmployerContribution?: number;
  }
) {
  if (monthlySalary <= 0) {
    throw new Error("Monthly salary can't less than or equal to 0");
  }

  /**
   * Rate from KWSP Portals
   * @URL https://www.kwsp.gov.my/member/overview#:~:text=When%20you%20contribute%2011%25%20of,government)%20to%20your%20EPF%20savings.
   */
  let employerContributionRate = monthlySalary <= 5000 ? 13 : 12;
  // Overwrite employer contribution
  if (option?.overwriteEmployerContribution) {
    if (!isPercentage(option.overwriteEmployerContribution)) {
      throw new Error('Empoyer contribution must be a valid percentage');
    }

    employeeContributionRate = option.overwriteEmployerContribution;
  }

  if (!isPercentage(employeeContributionRate)) {
    throw new Error('employeeContributionRate rate must be a valid percentage');
  }

  const totalContributedByEmployee =
    (monthlySalary * employeeContributionRate) / 100;
  const totalContributedByEmployer =
    (monthlySalary * employerContributionRate) / 100;
  const total = totalContributedByEmployee + totalContributedByEmployer;

  return {
    total: total,
    employee: totalContributedByEmployee,
    employer: totalContributedByEmployer,
  };
}
