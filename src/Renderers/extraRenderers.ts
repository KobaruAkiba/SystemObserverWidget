import { loadingStrings } from '../Utils/notAvailable';
import si from 'systeminformation';

/**
 * Gets the OS information (distro and architecture).
 */
export const getOsInfo = async () =>
	si
		.osInfo()
		.then((data) => {
			return {
				distro: data?.distro || loadingStrings.NotAvailable,
				arch: data?.arch || loadingStrings.NotAvailable,
			};
		})
		.catch((error) => {
			console.error('Error fetching OS info:', error);
			return {
				distro: loadingStrings.NotAvailable,
				arch: loadingStrings.NotAvailable,
			};
		});

