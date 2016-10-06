import { Component, Input, OnInit } from '@angular/core';
import { remote } from 'electron';

const {Menu, MenuItem} = remote;

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  @Input() model: ExplorerModel;
  constructor() { }

  ngOnInit() {
  }
  itemClicked(item: PaneItem) {
    alert(JSON.stringify(item));
  }
  itemContextMenu(item: PaneItem) {
    const menu = new Menu();
    menu.append(new MenuItem({ label: 'Edit Connection', click() { console.log('item 1 clicked'); } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Connect' }));
    menu.append(new MenuItem({ label: 'Disconnect' }));
    menu.popup(remote.getCurrentWindow());
  }
}

export interface PaneItem {
  label?: string;
  value?: any;
}
export interface Pane {
  title?: string;
  items?: PaneItem[];
}
export interface ExplorerModel {
  panes?: Pane[];
}
