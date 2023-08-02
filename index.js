const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "js/preload.js"),
      nodeIntegration: true,
      contextIsolation: true, // this should be true
    },
  });

  pythonapi();

  win.loadFile("html/index.html");
  win.webContents.openDevTools();
};

const pythonapi = () => {
  var python = require("child_process").spawn("python", ["./py/api.py"]);
  python.stdout.on("data", function (data) {
    console.log("data 1: ", data.toString("utf8"));
  });
  python.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`); // when error
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
