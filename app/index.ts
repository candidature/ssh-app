import {app, BrowserWindow, Menu} from 'electron';
import {template} from './menu';

let win;
let menu;

require('electron-debug')();

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    acceptFirstMouse: true,
    titleBarStyle: 'hidden'
  });

  if (process.env.DEV) {
    win.loadURL('http://localhost:4200');
    win.openDevTools();
    require('devtron').install();
  } else {
    win.loadURL(`file://${__dirname}/../dist/index.html`);
  }

  win.on('closed', () => {
    win = null;
  });

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
