import si from 'systeminformation';
import {
	calculateAnimationDurationFromPercentage,
	calculateUsageColorFromPercentage,
} from '../Utils/styling';

/**
 * Gets the cpu name and sets it to the cpuName element.
 */
export const setCpuName = async (cpuNameElement: HTMLElement) =>
	await si
		.cpu()
		.then((cpuData) => {
			cpuNameElement.textContent = cpuData.manufacturer + ' ' + cpuData.brand;
		})
		.catch((error) => console.error('Error fetching CPU data:', error));

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
			cpuCircleIcon.style.animationDuration = `${calculateAnimationDurationFromPercentage(cpuData.currentLoad)}s`;
			cpuPercentageElement.textContent = `${cpuData.currentLoad.toFixed(1)}%`;
			cpuPercentageBarElement.style.width = `${cpuData.currentLoad}%`;
			cpuPercentageBarElement.style.backgroundColor = calculateUsageColorFromPercentage(
				cpuData.currentLoad
			);
		})
		.catch((error) => console.error('Error fetching current load data:', error));

/**
 * Sets the cpu temperature to the cpuTemperature element.
 */
export const setCpuTemperature = (
	cpuTemperatureElement: HTMLElement,
	cpuTemperatureBarElement: HTMLElement
) => {
	// TODO: implementare il recupero della temperatura della CPU
	cpuTemperatureElement.textContent = 'N/A °C';
	cpuTemperatureBarElement.style.width = '0%';
};
