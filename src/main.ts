import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const createWindow = () => {
	const win = new BrowserWindow({
		width: 420,
		height: 200,
		minWidth: 300,
		minHeight: 200,
		frame: false, // niente barra finestra = stile widget
		transparent: true,
		alwaysOnTop: true,
		webPreferences: {
			preload: join(__dirname, 'preload.js'),
			nodeIntegration: true,
		},
	});

	// Automatically opens dev tools if not packaged
	if (!app.isPackaged) {
		win.webContents.openDevTools();
	}

	win.loadFile(join(__dirname, 'index.html'));
};

app.whenReady().then(createWindow);
