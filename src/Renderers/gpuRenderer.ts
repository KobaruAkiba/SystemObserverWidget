import si from 'systeminformation';
import {
	calculateAnimationDurationFromPercentage,
	calculateColorFromPercentage,
} from '../Utils/styling';
import { getGpuMemoryUsage, getGpuTemperature } from '../Utils/gpuInfo';
import { toPercentage } from '../Utils/numbers';

/**
 * Gets the gpu name and sets it to the gpuName element.
 */
export const setGpuName = async (gpuNameElement: HTMLElement) =>
	await si
		.graphics()
		.then((gpuData) => {
			gpuNameElement.textContent = gpuData.controllers[0].model || 'N/A';
		})
		.catch((error) => console.error('Error fetching GPU data:', error));

/**
 * Sets the gpu load to the gpuPercentage element and sets the animation duration of the gpuCircle element.
 */
export const setGpuMemoryLoad = async (
	gpuCircleIcon: HTMLElement,
	gpuPercentageElement: HTMLElement,
	gpuPercentageBarElement: HTMLElement
) =>
	await getGpuMemoryUsage()
		.then((gpuMemoryData) => {
			if (!gpuMemoryData) {
				gpuPercentageElement.textContent = 'N/A';
				gpuPercentageBarElement.style.width = '0%';
				return;
			}

			const percentage = toPercentage(gpuMemoryData.used, gpuMemoryData.total);
			gpuCircleIcon.style.animationDuration = `${calculateAnimationDurationFromPercentage(percentage)}s`;
			gpuPercentageElement.textContent = `${percentage.toFixed(1)}%`;
			gpuPercentageBarElement.style.width = `${percentage}%`;
			gpuPercentageBarElement.style.backgroundColor = calculateColorFromPercentage(percentage);
		})
		.catch((error) => console.error('Error fetching GPU memory data:', error));

/**
 * Sets the gpu temperature to the gpuTemperature element.
 */
export const setGpuTemperature = async (
	gpuTemperatureElement: HTMLElement,
	gpuTemperatureBarElement: HTMLElement
) =>
	await getGpuTemperature()
		.then((tempData) => {
			if (!tempData) {
				gpuTemperatureElement.textContent = 'N/A';
				gpuTemperatureBarElement.style.width = `0%`;
				return;
			}

			const temperaturePercentage = toPercentage(tempData, 82); // Assuming 82°C is the max temperature
			gpuTemperatureElement.textContent = `${tempData}°C`;
			gpuTemperatureBarElement.style.width = `${temperaturePercentage}%`;
			gpuTemperatureBarElement.style.backgroundColor =
				calculateColorFromPercentage(temperaturePercentage);
		})
		.catch((error) => console.error('Error fetching GPU temperature data:', error));

