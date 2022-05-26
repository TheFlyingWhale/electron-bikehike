const { app, BrowserWindow } = require("electron");

const path = require("path");
const iconPath = path.join(__dirname, "build", "icon.png");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
        titleBarOverplay: true,
        icon: iconPath,
    });

    win.loadFile("index.html");
};

app.whenReady().then(() => {
    createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
