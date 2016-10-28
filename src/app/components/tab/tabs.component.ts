import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'sa-tabs',
  template: `
    <div class="tabs is-boxed">
      <ul>
        <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.is-active]="tab.active">
          <a href="#">{{tab.title}}</a>
        </li>
      </ul>
    </div>
    <ng-content></ng-content>
  `
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  ngAfterContentInit() {
    if (this.tabs.length === 0) {
      return;
    }
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(t => t.active = false);

    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
