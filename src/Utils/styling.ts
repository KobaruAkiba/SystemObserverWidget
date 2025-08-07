export enum StyleColors {
	GOOD = 'green',
	OK = 'yellow',
	NOT_OK = 'orange',
	BAD = 'red',
}

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
export const calculateColorFromPercentage = (percentage: number): StyleColors => {
	if (percentage < 40) {
		return StyleColors.GOOD;
	} else if (percentage < 75) {
		return StyleColors.OK;
	} else if (percentage < 90) {
		return StyleColors.NOT_OK;
	} else {
		return StyleColors.BAD;
	}
};
