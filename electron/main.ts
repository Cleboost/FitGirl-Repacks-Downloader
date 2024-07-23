import {app, BrowserWindow, shell} from "electron";
import {join} from "path";
import {author, productName, version} from "../package.json";

import {registerIPCHandlers} from "./IPC/IPCHandlers";

/**
 * ** The built directory structure
 * ------------------------------------
 * ├─┬ build/electron
 * │ └── main.js        > Electron-Main
 * │ └── preload.js     > Preload-Scripts
 * ├─┬ build/app
 *   └── index.html     > Electron-Renderer
 */

process.env.BUILD_APP = join(__dirname, "../app");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
	? join(__dirname, "../../public")
	: process.env.BUILD_APP;

let mainWindow: BrowserWindow | null = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		icon: join(__dirname, "../../src/assets/icons/icon.png"),
		title: `${productName} by ${author} - v${version}`,
		width: 800,
		height: 500,
		resizable: false,
		maximizable: false,
		autoHideMenuBar: true,
		webPreferences: {
			sandbox: false,
			preload: join(__dirname, "preload.js"),
		},
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.loadFile(join(process.env.BUILD_APP, "index.html"));
	}

	mainWindow.webContents.setWindowOpenHandler(({url}) => {
		if (url.startsWith("https:")) shell.openExternal(url);
		return {action: "deny"};
	});
}


app.whenReady().then(async () => {


	registerIPCHandlers();
	createWindow();


	// header security policy
	// session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
	// 	callback({
	// 		responseHeaders: {
	// 			...details.responseHeaders,
	// 			"Content-Security-Policy": ["script-src 'self'"],
	// 		},
	// 	});
	// });
	//
	// app.on("activate", () => {
	// 	// On macOS it's common to re-create a window in the app when the
	// 	// dock icon is clicked and there are no other windows open.
	// 	const allWindows = BrowserWindow.getAllWindows();
	// 	allWindows.length === 0 ? createWindow() : allWindows[0].focus();
	// });

});

app.on("window-all-closed", () => {
	mainWindow = null;
	if (process.platform !== "darwin") app.quit();
});