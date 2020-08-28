const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const url = require("url");
const { autoUpdater } = require("electron-updater");
let win;
function isDev() {
  return process.mainModule.filename.indexOf("app.asar") === -1;
}
const electron = require("electron");
const iconPath = path.join(__dirname, "dist/deh-app/assets/images/16.png");
const ipcMain = electron.ipcMain;
let tray = null;
let mainWindow;
var isAppStart = true;
ipcMain.on("uninstallApp", (event, arg) => {
  uninstallApp();
});

function uninstallApp() {
  apiProcess.kill();
  app.quit();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    show: true,
    icon: "src/assets/images/16.png",
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/deh-app/index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  if (isDev()) {
    //mainWindow.webContents.openDevTools()
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Open" },
    // {
    //     type: 'separator'
    // },
    { label: "Sign In" },
    {
      label: "Close Session",
      click: () => {
        app.quit();
      },
    },
    { label: "Unmount" },
    { label: "About" },
  ]);
  tray.setToolTip("DEH Online");
  tray.setContextMenu(contextMenu);

  mainWindow.maximize();
  // mainWindow.show();
  autoUpdater.checkForUpdatesAndNotify();
}

app.on("ready", () => {
  startApi();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null && isAppStart) {
    createWindow();
  }
});

const os = require("os");
var apiProcess = null;

function startApi() {
  var proc = require("child_process").spawn;
  //  run server
  var apipath = "";
  if (os.arch() === "x64") {
    apipath = path.join(__dirname, "..\\api\\bin\\dist\\win\\DEHSErvice.exe");
  }
  console.log("__dirname : ", path.join(__dirname, "..\\..\\..\\"));
  if (os.platform() === "darwin") {
    apipath = path.join(__dirname, "..//api//bin//dist//osx//APIDEH");
  }
  apiProcess = proc(apipath);

  apiProcess.stdout.on("data", (data) => {
    writeLog(`stdout: ${data}`);
    if (mainWindow == null && isAppStart) {
      createWindow();
    }
  });
}

process.on("exit", function () {
  writeLog("exit");
  apiProcess.kill();
});

function writeLog(msg) {
  console.log(msg);
}

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

//only remaining, skip due to error. try toinstall again

// npm install -g electron-installer-debian

// & run
// npm run create-debian-installer
