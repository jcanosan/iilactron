const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  mainWindow.loadURL('http://proxy.iinact.com/overlay/ember_overlay/?HOST_PORT=ws://127.0.0.1:10501#/')
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
