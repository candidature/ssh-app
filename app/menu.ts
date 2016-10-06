import { dialog } from 'electron';

export const template = [{
  label: 'Help',
  submenu: [{
    label: 'About',
    click() {
      dialog.showMessageBox({
        type: 'info',
        title: 'SSH2 Client',
        message: 'A SSH2 Client Application',
        detail: 'Version 1.0.0\n' +
        `Electron ${process.versions.electron}\n` +
        `Chrome ${process.versions.chrome}\n` +
        `Node ${process.versions.node}`,
        buttons: []
      });
    }
  }]
}];
