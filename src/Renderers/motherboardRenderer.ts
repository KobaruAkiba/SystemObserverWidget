import { loadingStrings } from '../Utils/notAvailable';
import si from 'systeminformation';

/**
 * Gets the motherboard name and model.
 */
export const getMotherboardName = async () =>
	si
		.baseboard()
		.then((data) => {
			return {
				manufacturer: data?.manufacturer || loadingStrings.NotAvailable,
				model: data?.model || loadingStrings.NotAvailable,
			};
		})
		.catch((error) => {
			console.error('Error fetching baseboard info:', error);
			return {
				manufacturer: loadingStrings.NotAvailable,
				model: loadingStrings.NotAvailable,
			};
		});

/**
 * Gets the motherboard bios version.
 */
export const getMotherboardBiosVersion = async () =>
	si
		.bios()
		.then((data) => {
			return data?.vendor && data?.version
				? `${data.vendor} v.${data.version}`
				: loadingStrings.NotAvailable;
		})
		.catch((error) => {
			console.error('Error fetching BIOS info:', error);
			return loadingStrings.NotAvailable;
		});

