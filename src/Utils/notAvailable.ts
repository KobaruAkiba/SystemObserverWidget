/**
 * Check if string has a not available value
 */
export const isNotAvailableText = (val: string) => val === loadingStrings.NotAvailable;

/**
 * Centralized value for not available data
 */
export const notAvailableData = -1;

/**
 * Checks if number has not available number
 */
export const isNotAvailableNumber = (val: number) => val === -1;

/**
 * Centralized value for not available text
 */
export const loadingStrings = {
	Dots: '...',
	NotAvailable: 'N/A',
};

