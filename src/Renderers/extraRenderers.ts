import si from 'systeminformation';

/**
 * Gets the OS information (distro and architecture).
 */
export const getOsInfo = async () =>
	si
		.osInfo()
		.then((data) => {
			return {
				distro: data.distro || 'N/A',
				arch: data.arch || 'N/A',
			};
		})
		.catch((error) => {
			console.error('Error fetching OS info:', error);
			return {
				distro: 'N/A',
				arch: 'N/A',
			};
		});

si.getAllData().then((data) => {
	console.log('System Information:', data);
});

