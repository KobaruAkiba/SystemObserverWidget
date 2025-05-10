import si from 'systeminformation';

/**
 * Sets the OS information (distro and architecture) to the provided elements.
 */
export const setOsInfo = async (osDistroElement: HTMLElement, osArchElement: HTMLElement) =>
	si
		.osInfo()
		.then((data) => {
			osDistroElement.textContent = data.distro || 'N/A';
			osArchElement.textContent = data.arch || 'N/A';
		})
		.catch((error) => console.error('Error fetching OS info:', error));

si.getAllData().then((data) => {
	console.log('System Information:', data);
});

