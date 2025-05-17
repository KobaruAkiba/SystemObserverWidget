import si from 'systeminformation';

/**
 * Gets the motherboard name and model.
 */
export const getMotherboardName = async () =>
	si
		.baseboard()
		.then((data) => {
			return {
				manufacturer: data.manufacturer || 'N/A',
				model: data.model || 'N/A',
			};
		})
		.catch((error) => {
			console.error('Error fetching baseboard info:', error);
			return {
				manufacturer: 'N/A',
				model: 'N/A',
			};
		});

/**
 * Gets the motherboard bios version.
 */
export const getMotherboardBiosVersion = async () =>
	si
		.bios()
		.then((data) => {
			return `${data.vendor} v.${data.version}` || 'N/A';
		})
		.catch((error) => {
			console.error('Error fetching BIOS info:', error);
			return 'N/A';
		});

