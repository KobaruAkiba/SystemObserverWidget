import si from 'systeminformation';
import { calculateColorFromPercentage } from '../Utils/styling';
import { toBytes } from '../Utils/numbers';

/**
 * Sets the memory load to the provided elements.
 */
export const setMemoryLoad = async (
	ramPercentageElement: HTMLElement,
	ramPercentageBarElement: HTMLElement
) =>
	si
		.mem()
		.then((data) => {
			if (!data) {
				ramPercentageElement.textContent = 'N/A';
				ramPercentageBarElement.style.width = '0%';
				return;
			}

			const usedMemoryPercentage = (data.used / data.total) * 100;
			ramPercentageElement.textContent = `${usedMemoryPercentage.toFixed(1)}%`;
			ramPercentageBarElement.style.width = `${usedMemoryPercentage}%`;
			ramPercentageBarElement.style.backgroundColor =
				calculateColorFromPercentage(usedMemoryPercentage);
		})
		.catch((error) => console.error('Error fetching memory load:', error));

/**
 * Sets the memory banks information to the provided element.
 */
export const setMemoryBanks = async (ramBanksElement: HTMLElement) =>
	si
		.memLayout()
		.then((data) => {
			if (!data || data.length === 0) {
				ramBanksElement.textContent = 'N/A';
				return;
			}

			let memoriesText = '';
			data.map((bank, index, total) => {
				if (index === total.length - 1) {
					memoriesText += `| ${bank.type} ${toBytes(bank.size, 'GB')} GB |`;
				} else {
					memoriesText += `| ${bank.type} ${toBytes(bank.size, 'GB')} GB | + `;
				}
			});

			ramBanksElement.textContent = memoriesText;
		})
		.catch((error) => console.error('Error fetching memory banks:', error));

