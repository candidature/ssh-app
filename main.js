const { app, BrowserWindow } = require('electron');

let win;

if (process.env.DEV) {
  require('electron-debug')();
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  if (process.env.DEV) {
    win.loadURL('http://localhost:4200');
    win.openDevTools();
    require('devtron').install();
  } else {
    win.loadURL(`file://${__dirname}/index.html`);
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
