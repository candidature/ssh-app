import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { Connection, ConnectionStatus } from '../../models/connection';

import { remote } from 'electron';

const {Menu, MenuItem} = remote;

@Component({
  selector: 'sa-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  connections$: Observable<Connection[]>;

  constructor(private _store: Store<fromRoot.State>) {
    this.connections$ = this._store.let(fromRoot.getConnections);
  }

  connStatus(conn: Connection): boolean {
    return (conn.status === ConnectionStatus.CONNECTING || conn.status === ConnectionStatus.DISCONNECTING);
  }

  connContextMenu(conn: Connection) {
    if (conn.status === ConnectionStatus.CONNECTING || conn.status === ConnectionStatus.DISCONNECTING) {
      return;
    }
    let menu = new Menu();
    menu.append(new MenuItem({
      label: 'Edit Connection',
      click() { console.log('item 1 clicked'); },
      enabled: (ConnectionStatus.DISCONNECTED === conn.status || ConnectionStatus.ERROR === conn.status)
    }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Connect', enabled: (ConnectionStatus.DISCONNECTED === conn.status) }));
    menu.append(new MenuItem({
      label: 'Disconnect',
      enabled: (ConnectionStatus.CONNECTED === conn.status || ConnectionStatus.WARNING === conn.status)
    }));
    menu.popup(remote.getCurrentWindow());
  }
}
