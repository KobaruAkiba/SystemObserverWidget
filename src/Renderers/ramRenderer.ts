import si from 'systeminformation';
import { fromMemoryType, MemoryTypes } from '../Utils/ram';
import { notAvailableData, notAvailableText } from '../Utils/notAvailable';

/**
 * Gets current memory load.
 */
export const getMemoryLoad = async () =>
	si
		.mem()
		.then((data) => data.used || notAvailableData)
		.catch((error) => {
			console.error('Error fetching RAM data: ', error);
			return notAvailableData;
		});

/**
 * Gets total memory.
 */
export const getTotalMemory = async () =>
	si
		.mem()
		.then((data) => data.total || notAvailableData)
		.catch((error) => {
			console.error('Error fetching RAM data: ', error);
			return notAvailableData;
		});

/**
 * Gets the memory banks information.
 */
export const getMemoryBanksLayout = async () =>
	si
		.memLayout()
		.then((data) => {
			if (!data || data.length === 0) {
				return notAvailableText;
			}

			let ddr3 = 0;
			let ddr4 = 0;
			let ddr5 = 0;

			data.map((bank) => {
				if (bank.type === fromMemoryType(MemoryTypes.DDR3)) {
					ddr3++;
				} else if (bank.type === fromMemoryType(MemoryTypes.DDR4)) {
					ddr4++;
				} else if (bank.type === fromMemoryType(MemoryTypes.DDR5)) {
					ddr5;
				}
			});

			return `${!!ddr5 ? `${ddr5} DDR5` : ''}${!!ddr4 ? ` ${ddr4} DDR4` : ''}${!!ddr3 ? ` ${ddr3} DDR3` : ''}`;
		})
		.catch((error) => {
			console.error('Error fetching memory banks:', error);
			return notAvailableText;
		});

