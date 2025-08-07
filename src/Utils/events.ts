/**
 * Events for the Electron app
 */
export const ipcEvents = {
	minimize: 'minimize',
	close: 'close',
};

/**
 * Events for the components
 */
export const componentEvents = {
	ticks_changed: 'ticks-changed',
};

export type ComponentEvent = Omit<CustomEvent, 'detail'> & {
	detail: {
		value: number | string | null;
	};
};
