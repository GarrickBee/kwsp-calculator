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
