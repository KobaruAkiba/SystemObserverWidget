import si from 'systeminformation';

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
 * Gets the cpu current load (percentage).
 */
export const getCpuLoad = async () =>
	await si
		.currentLoad()
		.then((cpuData) => (cpuData ? cpuData.currentLoad : -1))
		.catch((error) => {
			console.log('Error fetching current load data:', error);
			return -1;
		});

/**
 * Gets the cpu temperature.
 */
export const getCpuTemperature = () => {
	// TODO: implementare il recupero della temperatura della CPU
	return 'N/A';
};
