import si from 'systeminformation';

export const setMotherBoardInfo = async (
	mbManufacturerElement: HTMLElement,
	mbModelElement: HTMLElement
) =>
	si
		.baseboard()
		.then((data) => {
			mbManufacturerElement.textContent = data.manufacturer;
			mbModelElement.textContent = data.model;
		})
		.catch((error) => console.error('Error fetching baseboard info:', error));

export const setOsInfo = async (osDistroElement: HTMLElement, osArchElement: HTMLElement) =>
	si
		.osInfo()
		.then((data) => {
			osDistroElement.textContent = data.distro;
			osArchElement.textContent = data.arch;
		})
		.catch((error) => console.error('Error fetching OS info:', error));

