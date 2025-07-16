import { notAvailableData, loadingStrings } from '../Utils/notAvailable';
import si from 'systeminformation';

/**
 * Gets the cpu name.
 */
export const getCpuName = async () =>
	await si
		.cpu()
		.then((cpuData) => {
			return cpuData?.manufacturer && cpuData?.brand
				? cpuData.manufacturer + ' ' + cpuData.brand
				: loadingStrings.NotAvailable;
		})
		.catch((error) => {
			console.error('Error fetching CPU data:', error);
			return loadingStrings.NotAvailable;
		});

/**
 * Gets the cpu current load (percentage).
 */
export const getCpuLoad = async () =>
	await si
		.currentLoad()
		.then((cpuData) => cpuData?.currentLoad || notAvailableData)
		.catch((error) => {
			console.error('Error fetching current load data: ', error);
			return notAvailableData;
		});

/**
 * Gets the cpu current temperature.
 */
export const getCpuTemperature = async () =>
	await si
		.cpuTemperature()
		.then((cpuTemp) => {
			return cpuTemp?.main || notAvailableData;
		})
		.catch((error) => {
			console.error('Error fetching CPU temperature: ', error);
			return notAvailableData;
		});

/**
 * Gets the cpu maximum temperature.
 */
export const getCpuMaxTemperature = async () =>
	await si
		.cpuTemperature()
		.then((cpuTemp) => {
			return cpuTemp?.max || notAvailableData;
		})
		.catch((error) => {
			console.error('Error fetching CPU temperature: ', error);
			return notAvailableData;
		});
