import { Component, Input } from '@angular/core';

@Component({
  selector: 'sa-tab',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .pane{
      padding-left: 1em;
    }
  `],
})
export class TabComponent {
  @Input() title: string;
  @Input() active: boolean = false;
}
