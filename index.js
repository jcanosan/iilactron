const { app, BaseWindow, WebContentsView } = require("electron");

var nodeConsole = require("console");
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const createWindow = () => {
  const mainWindow = new BaseWindow({
    width: 500,
    height: 360,
    // frame: false,
    backgroundColor: "#000000ff",
    resizable: true,
  });

  const iinactContent = new WebContentsView();
  mainWindow.contentView.addChildView(iinactContent);
  iinactContent.webContents.loadURL(
    "http://proxy.iinact.com/overlay/kagerou/?HOST_PORT=ws://127.0.0.1:10501#/"
  );
  const bounds = mainWindow.getBounds();
  iinactContent.setBounds({
    x: 0,
    y: 0,
    width: bounds.width,
    height: bounds.height,
  });
  iinactContent.setBackgroundColor("#000000ff");

  mainWindow.on("resize", () => {
    if (!mainWindow || !iinactContent) {
      myConsole.log("No mainWindow or iinactOverlay");
      return;
    }
    const bounds = mainWindow.getBounds();
    iinactContent.setBounds({
      x: 0,
      y: 0,
      width: bounds.width,
      height: bounds.height,
    });
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
