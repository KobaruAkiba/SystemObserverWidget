import si from 'systeminformation';
import {
	calculateAnimationDurationFromPercentage,
	calculateColorFromPercentage,
} from '../Utils/styling';

/**
 * Gets the cpu name.
 */
export const getCpuName = async () =>
	await si
		.cpu()
		.then((cpuData) => {
			return cpuData.manufacturer + ' ' + cpuData.brand || 'N/A';
		})
		.catch((error) => {
			console.error('Error fetching CPU data:', error);
			return 'N/A';
		});

/**
 * Sets the cpu load to the cpuPercentage element and sets the animation duration of the cpuCircle element.
 * The animation duration is calculated based on the current load of the CPU.
 */
export const setCpuLoad = async (
	cpuCircleIcon: HTMLElement,
	cpuPercentageElement: HTMLElement,
	cpuPercentageBarElement: HTMLElement
) =>
	await si
		.currentLoad()
		.then((cpuData) => {
			if (!cpuData) {
				cpuPercentageElement.textContent = 'N/A';
				cpuPercentageBarElement.style.width = '0%';
				return;
			}

			cpuCircleIcon.style.animationDuration = `${calculateAnimationDurationFromPercentage(cpuData.currentLoad)}s`;
			cpuPercentageElement.textContent = `${cpuData.currentLoad.toFixed(1)}%`;
			cpuPercentageBarElement.style.width = `${cpuData.currentLoad}%`;
			cpuPercentageBarElement.style.backgroundColor = calculateColorFromPercentage(
				cpuData.currentLoad
			);
		})
		.catch((error) => console.error('Error fetching current load data:', error));

/**
 * Gets the cpu temperature.
 */
export const getCpuTemperature = () => {
	// TODO: implementare il recupero della temperatura della CPU
	return 'N/A';
};
