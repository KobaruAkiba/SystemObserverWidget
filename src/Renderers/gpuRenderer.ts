import si from 'systeminformation';
import { getGpuMemoryUsage, getGpuTemperature } from '../Utils/gpuInfo';

/**
 * Gets the gpu name.
 */
export const getGpuName = async () =>
	await si
		.graphics()
		.then((gpuData) => {
			return gpuData.controllers[0].model || 'N/A';
		})
		.catch((error) => {
			console.error('Error fetching GPU data: ', error);
			return 'N/A';
		});

/**
 * Gets the gpu memory currently used.
 */
export const getGpuMemoryLoad = async () =>
	await getGpuMemoryUsage()
		.then((data) => data?.used || -1)
		.catch((error) => {
			console.error('Error fetching GPU memory data: ', error);
			return -1;
		});

/**
 * Gets the gpu total memory
 */
export const getGpuTotalMemory = async () =>
	await getGpuMemoryUsage()
		.then((data) => data?.total || -1)
		.catch((error) => {
			console.error('Error fetching GPU total memory: ', error);
			return -1;
		});

/**
 * Gets the gpu current temperature
 */
export const getGpuLoadTemperature = async () =>
	await getGpuTemperature()
		.then((data) => data || -1)
		.catch((error) => {
			console.error('Error fetching GPU temperature data: ', error);
			return -1;
		});

