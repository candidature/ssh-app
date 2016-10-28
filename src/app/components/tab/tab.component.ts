import { Component, Input } from '@angular/core';

@Component({
  selector: 'sa-tab',
  template: `
    <div *ngIf="active" class="tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-content {
      padding-top: 0.25em;
      display: inline-block;
      position: absolute;
      top: 35px;
      width: 100%;
      bottom: 0;
      overflow: auto;
    }
  `],
})
export class TabComponent {
  @Input() title: string;
  @Input() active: boolean = false;
}
