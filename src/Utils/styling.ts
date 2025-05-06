// Function to calculate the animation duration based on the percentage of load
export const calculateAnimationDurationFromPercentage = (percentage: number) =>
	Math.max(0.2, 1 - (percentage / 100) * (1 - 0.2));

// Function to calculate the color based on the percentage of load
export const calculateUsageColorFromPercentage = (percentage: number): string => {
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

