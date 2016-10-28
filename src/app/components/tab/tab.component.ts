import { Component, Input } from '@angular/core';

@Component({
  selector: 'sa-tab',
  template: `
    <div [hidden]="!active" class="container is-fluid pane">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
      width: 100%;
    }
    .pane{
      padding-top: 0.25em;
    }
  `],
})
export class TabComponent {
  @Input() title: string;
  @Input() active: boolean = false;
}
