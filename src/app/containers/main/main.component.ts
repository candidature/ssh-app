import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as connection from '../../actions/connection';
import { Connection, ConnectionStatus } from '../../models';

import { remote } from 'electron';

const {Menu, MenuItem} = remote;

@Component({
  selector: 'sa-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  connections$: Observable<Connection[]>;
  constructor(private _store: Store<fromRoot.State>) {
    this.connections$ = this._store.let(fromRoot.getConnections);
  }

  connBusy(conn: Connection): boolean {
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

  isNew(conn: Connection) {
    return conn.status === ConnectionStatus.NEW;
  }

  submit(obj) {
    let payload: Connection = {
      name: obj.name,
      host: obj.host,
      port: obj.port,
      username: obj.username,
      privateKey: obj.privateKey,
      status: ConnectionStatus.DISCONNECTED,
      tags: obj.tags
    };
    this._store.dispatch(new connection.SaveAction(payload));
  }
}
