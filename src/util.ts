/**
 * Check number is valid percentage
 * @param percentage
 * @returns
 */
export function isPercentage(percentage: number): boolean {
  if (isNaN(percentage) || percentage < 0 || percentage > 100) {
    return false;
  }

  return true;
}

/**
 * Get dates difference in month
 * @param date1
 * @param date2
 * @returns
 */
export function getDateDiffInMonth(date1: Date, date2: Date) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error('Input date must be in Date format');
  }

  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();

  return month2 + 12 * year2 - (month1 + 12 * year1);
}
