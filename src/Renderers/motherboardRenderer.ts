import si from 'systeminformation';

/**
 * Sets the motherboard name and model to the provided elements.
 */
export const setMotherBoardName = async (
	mbManufacturerElement: HTMLElement,
	mbModelElement: HTMLElement
) =>
	si
		.baseboard()
		.then((data) => {
			mbManufacturerElement.textContent = data.manufacturer || 'N/A';
			mbModelElement.textContent = data.model || 'N/A';
		})
		.catch((error) => console.error('Error fetching baseboard info:', error));

/**
 *Sets the motherboard bios version to the provided element.
 */
export const setMotherBoardBiosVersion = async (mbBiosElement: HTMLElement) =>
	si
		.bios()
		.then((data) => {
			mbBiosElement.textContent = `${data.vendor} v.${data.version}` || 'N/A';
		})
		.catch((error) => console.error('Error fetching BIOS info:', error));

