import {BrowserWindow, ipcMain, IpcMainEvent} from "electron";
import {IPC_ACTION} from "./IPCActions";
import axios from "axios";
import parse from "node-html-parser";

const handleSetWindowTitle = (event: IpcMainEvent, title: string) => {
	const webContents = event?.sender;
	const window = BrowserWindow.fromWebContents(webContents);

	window.setTitle(title);
	return "1234";
};

const getNewGames = async (event: IpcMainEvent) => {
	return await axios.get("https://fitgirl-repacks.site/popular-repacks/").then(async (response) => {
		const root = parse.parse(response.data);
		const games = root.querySelectorAll(".entry-content a");
		const gamesList = games.map((game) => {
			return {
				name: game.attributes.href.split("?")[0]
					.replace("https://fitgirl-repacks.site/", "")
					.replace(/-/g, " ")
					.replace(/\b\w/g, (l) => l.toUpperCase())
					.replace(/\/$/, ""),
				url: game.attributes.href.split("?")[0],
				image: game.querySelector("img")?.attributes.src || "",
			};
		});
		return gamesList;
	});
};

const ipcHandlers = [
	{
		event: IPC_ACTION.Window.SET_WINDOW_TITLE,
		callback: handleSetWindowTitle,
	},
	{
		event: IPC_ACTION.Game.GET_NEW_GAMES,
		callback: getNewGames,
	},
];

export const registerIPCHandlers = () => {
	ipcHandlers.forEach(({event, callback}) => {
		ipcMain.handle(event, callback);
	});
};