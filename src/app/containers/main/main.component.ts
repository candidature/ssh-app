import { Component } from '@angular/core';
import { ExplorerModel } from '../../components/explorer';

@Component({
  selector: 'sa-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  explorerModel: ExplorerModel;
  title = 'Welcome to electron app!!!';
  connections: Array<any> = [];

  constructor() {
    this.explorerModel = {
      panes: [{ title: 'Connections', items: [{ label: 'Conn1' }, { label: 'Conn2' }] }]
    };
  }
}
