import { Component } from '@angular/core';
import { ExplorerModel } from './explorer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  explorerModel: ExplorerModel;
  title = 'Welcome to electron app!!!';
  connections: Array<any> = [];

  constructor() {
    this.explorerModel = {
      panes: [{ title: 'Connections', items: [{ label: 'Conn1' }, { label: 'Conn2' }] }]
    };
  }
}
