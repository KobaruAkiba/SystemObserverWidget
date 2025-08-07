export type MemoryValueTypes = 'N/A' | 'DDR3' | 'DDR4' | 'DDR5';

export enum MemoryTypes {
	NA,
	DDR3,
	DDR4,
	DDR5,
}

/**
 * Tries to convert strings to MemoryType
 * @param val Memory type string
 * @returns Memory type
 */
export const toMemoryType = (val: MemoryValueTypes): MemoryTypes => {
	switch (val) {
		case 'DDR3':
			return MemoryTypes.DDR3;
		case 'DDR4':
			return MemoryTypes.DDR4;
		case 'DDR5':
			return MemoryTypes.DDR5;
		default:
			return MemoryTypes.NA;
	}
};

/**
 * Tries to convert MemoryType to string
 * @param val Memory type
 * @returns Memory type string
 */
export const fromMemoryType = (type: MemoryTypes): MemoryValueTypes => {
	switch (type) {
		case MemoryTypes.DDR3:
			return 'DDR3';
		case MemoryTypes.DDR4:
			return 'DDR4';
		case MemoryTypes.DDR5:
			return 'DDR5';
		default:
			return 'N/A';
	}
};
