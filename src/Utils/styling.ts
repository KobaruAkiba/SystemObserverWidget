export enum StyleColors {
	GREEN = 'green',
	YELLOW = 'yellow',
	ORANGE = 'orange',
	RED = 'red',
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
		return StyleColors.GREEN;
	} else if (percentage < 75) {
		return StyleColors.YELLOW;
	} else if (percentage < 90) {
		return StyleColors.ORANGE;
	} else {
		return StyleColors.RED;
	}
};

