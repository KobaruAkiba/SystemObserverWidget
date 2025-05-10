/**
 * Calculates the animation duration based on the percentage.
 * @param percentage Percentage to calculate the animation duration from.
 * @returns Seconds for the animation duration.
 */
export const calculateAnimationDurationFromPercentage = (percentage: number) =>
	Math.max(0.2, 1 - (percentage / 100) * (1 - 0.2));

/**
 * Calculates the color based on the percentage.
 * @param percentage Percentage to calculate the color from.
 * @returns Css color string.
 */
export const calculateColorFromPercentage = (percentage: number): string => {
	if (percentage < 40) {
		return 'green';
	} else if (percentage < 75) {
		return 'yellow';
	} else if (percentage < 90) {
		return 'orange';
	} else {
		return 'red';
	}
};

