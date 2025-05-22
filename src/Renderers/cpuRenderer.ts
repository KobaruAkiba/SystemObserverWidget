import { notAvailableData, notAvailableText } from '../Utils/notAvailable';
import si from 'systeminformation';

/**
 * Gets the cpu name.
 */
export const getCpuName = async () =>
	await si
		.cpu()
		.then((cpuData) => {
			return cpuData.manufacturer + ' ' + cpuData.brand || notAvailableText;
		})
		.catch((error) => {
			console.error('Error fetching CPU data:', error);
			return notAvailableText;
		});

/**
 * Gets the cpu current load (percentage).
 */
export const getCpuLoad = async () =>
	await si
		.currentLoad()
		.then((cpuData) => (cpuData ? cpuData.currentLoad : notAvailableData))
		.catch((error) => {
			console.error('Error fetching current load data: ', error);
			return notAvailableData;
		});

/**
 * Gets the cpu temperature.
 */
export const getCpuTemperature = () => {
	// TODO: implementare il recupero della temperatura della CPU
	return notAvailableText;
};
