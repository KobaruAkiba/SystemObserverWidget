import { notAvailableText } from '../Utils/notAvailable';
import si from 'systeminformation';

/**
 * Gets the OS information (distro and architecture).
 */
export const getOsInfo = async () =>
	si
		.osInfo()
		.then((data) => {
			return {
				distro: data.distro || notAvailableText,
				arch: data.arch || notAvailableText,
			};
		})
		.catch((error) => {
			console.error('Error fetching OS info:', error);
			return {
				distro: notAvailableText,
				arch: notAvailableText,
			};
		});

si.getAllData().then((data) => {
	console.log('System Information:', data);
});

