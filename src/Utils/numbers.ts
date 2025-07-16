type ByteFormat = 'GB' | 'MB' | 'KB' | 'B';

const toGB = (bytes: number): number => toMB(bytes) / 1024;
const toMB = (bytes: number): number => toKB(bytes) / 1024;
const toKB = (bytes: number): number => bytes / 1024;

/**
 * Converts bytes to the specified format. Can be GB, MB, KB or B.
 * @param value Bytes to convert
 * @param unit Format to convert to. Can be GB, MB, KB or B.
 * @returns Converted value in the specified format
 */
export const toBytes = (value: number, unit: ByteFormat): number => {
	switch (unit) {
		case 'GB':
			return toGB(value);
		case 'MB':
			return toMB(value);
		case 'KB':
			return toKB(value);
		default:
			return value;
	}
};

/**
 * Converts a value to a percentage of a total.
 * @param value Value to convert
 * @param total Total value
 * @returns Percentage of the value in relation to the total
 */
export const toPercentage = (value: number, total: number): number => {
	if (total === 0) {
		return 0;
	}
	return (value / total) * 100;
};

/**
 * Checks if passed value is a number
 * @param val Value to check
 * @returns True if value has type number
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number';

