import si from 'systeminformation';
import { getGpuMemoryUsage, getGpuTemperature } from '../Utils/gpuInfo';
import { notAvailableData, notAvailableText } from '../Utils/notAvailable';

/**
 * Gets the gpu name.
 */
export const getGpuName = async () =>
	await si
		.graphics()
		.then((gpuData) => {
			return gpuData.controllers[0].model || notAvailableText;
		})
		.catch((error) => {
			console.error('Error fetching GPU data: ', error);
			return notAvailableText;
		});

/**
 * Gets the gpu memory currently used.
 */
export const getGpuMemoryLoad = async () =>
	await getGpuMemoryUsage()
		.then((data) => data?.used || notAvailableData)
		.catch((error) => {
			console.error('Error fetching GPU memory data: ', error);
			return notAvailableData;
		});

/**
 * Gets the gpu total memory
 */
export const getGpuTotalMemory = async () =>
	await getGpuMemoryUsage()
		.then((data) => data?.total || notAvailableData)
		.catch((error) => {
			console.error('Error fetching GPU total memory: ', error);
			return notAvailableData;
		});

/**
 * Gets the gpu current temperature
 */
export const getGpuLoadTemperature = async () =>
	await getGpuTemperature()
		.then((data) => data || notAvailableData)
		.catch((error) => {
			console.error('Error fetching GPU temperature data: ', error);
			return notAvailableData;
		});

