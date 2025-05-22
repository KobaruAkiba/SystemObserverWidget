import { notAvailableText } from '../Utils/notAvailable';
import si from 'systeminformation';

/**
 * Gets the motherboard name and model.
 */
export const getMotherboardName = async () =>
	si
		.baseboard()
		.then((data) => {
			return {
				manufacturer: data.manufacturer || notAvailableText,
				model: data.model || notAvailableText,
			};
		})
		.catch((error) => {
			console.error('Error fetching baseboard info:', error);
			return {
				manufacturer: notAvailableText,
				model: notAvailableText,
			};
		});

/**
 * Gets the motherboard bios version.
 */
export const getMotherboardBiosVersion = async () =>
	si
		.bios()
		.then((data) => {
			return `${data.vendor} v.${data.version}` || notAvailableText;
		})
		.catch((error) => {
			console.error('Error fetching BIOS info:', error);
			return notAvailableText;
		});

