const electron = require("electron");
const url = require("url");
const path = require("path");
const { Menu } = require("electron");
const ipc = require("electron").ipcMain;

const { app, BrowserWindow } = electron;

let mainWindow;
let sendWindow;
let settingsWindow;
let addWindow;

app.on("ready", function () {
	mainWindow = new BrowserWindow({
		minWidth: 1400,
		minHeight: 680,
		maxWidth: 1400,
		maxHeight: 680,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	mainWindow.setMenuBarVisibility(true);
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "mainWindow.html"),
			protocol: "file",
			slashes: true,
		})
	);
	mainWindow.on("closed", function () {
		app.quit();
	});
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
	addWindow = new BrowserWindow({
		minWidth: 700,
		minHeight: 339,
		maxWidth: 700,
		maxHeight: 339,
		frame: true,
		parent: mainWindow,
		protocol: "file",
		slashes: true,
		title: "Create Wallet",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	addWindow.setMenuBarVisibility(false);
	addWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "wallet-settings.html"),
			protocol: "file",
			slashes: true,
		})
	);
	addWindow.on("close", function () {
		addWindow = null;
	});
}

const mainMenuTemplate = [
	{
		label: "Helium Wallet",
		submenu: [
			{
				label: "Create Wallet",
				click() {
					createAddWindow();
				},
			},
			{
				label: "Quit",
				accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
				click() {
					app.quit();
				},
			},
		],
	},
];

ipc.on("send", () => {
	sendWindow = new BrowserWindow({
		minWidth: 700,
		minHeight: 441,
		maxWidth: 700,
		maxHeight: 441,
		frame: true,
		parent: mainWindow,
		protocol: "file",
		slashes: true,
		title: "Send HNT",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	sendWindow.setMenuBarVisibility(false);
	sendWindow.loadURL(path.join("file:", __dirname, "send.html"));

	sendWindow.on("close", function () {
		sendWindow = null;
	});
});

ipc.on("start_val", () => {
	startValWindow = new BrowserWindow({
		minWidth: 700,
		minHeight: 441,
		maxWidth: 700,
		maxHeight: 441,
		frame: true,
		protocol: "file",
		slashes: true,
		title: "Start Validator",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	startValWindow.setMenuBarVisibility(false);
	startValWindow.loadURL(path.join("file:", __dirname, "start-validator.html"));

	startValWindow.on("close", function () {
		startValWindow = null;
	});
});

ipc.on("val_list", () => {
	listWindow = new BrowserWindow({
		minWidth: 800,
		minHeight: 328,
		maxWidth: 800,
		maxHeight: 328,
		frame: true,
		protocol: "file",
		slashes: true,
		title: "Validators",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	listWindow.loadURL(path.join("file:", __dirname, "list-validator.html"));

	listWindow.on("close", function () {
		listWindow = null;
	});
});
