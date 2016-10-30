import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  Directive,
  TemplateRef,
  ContentChild,
  AfterContentChecked,
  Output,
  EventEmitter
} from '@angular/core';

let nextId = 0;

@Directive({selector: '[saTabTitle]'})
export class TabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({selector: '[saTabContent]'})
export class TabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}


/**
 * A directive representing an individual tab.
 */
@Directive({selector: 'sa-tab'})
export class TabDirective {
  /**
   * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
   */
  @Input() id: string = `sa-tab-${nextId++}`;
  /**
   * Simple (string only) title. Use the "NgbTabTitle" directive for more complex use-cases.
   */
  @Input() title: string;
  /**
   * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
   */
  @Input() disabled = false;

  @ContentChild(TabContentDirective) contentTpl: TabContentDirective;
  @ContentChild(TabTitleDirective) titleTpl: TabTitleDirective;
}

/**
 * The payload of the change event fired right before the tab change
 */
export interface TabChangeEvent {
  /**
   * Id of the currently active tab
   */
  activeId: string;

  /**
   * Id of the newly selected tab
   */
  nextId: string;

  /**
   * Function that will prevent tab switch if called
   */
  preventDefault: () => void;
}

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'sa-tabset',
  exportAs: 'saTabset',
  template: `
    <div class="tabs is-boxed">
      <ul role="tablist">
        <li *ngFor="let tab of tabs" [class.is-active]="tab.id === activeId" [class.disabled]="tab.disabled">
          <a [id]="tab.id" href (click)="!!select(tab.id)">
            {{tab.title}}<template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></template>
          </a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <template ngFor let-tab [ngForOf]="tabs">
        <div *ngIf="tab.id === activeId" role="tabpanel" [attr.aria-labelledby]="tab.id">
          <template [ngTemplateOutlet]="tab.contentTpl.templateRef"></template>
        </div>
      </template>
    </div>
  `
})
export class TabsetComponent implements AfterContentChecked {
  @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

  /**
   * An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically.
   */
  @Input() activeId: string;

  /**
   * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
   */
  @Output() tabChange = new EventEmitter<TabChangeEvent>();

  /**
   * Selects the tab with the given id and shows its associated pane.
   * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
   */
  select(tabId: string) {
    let selectedTab = this._getTabById(tabId);
    if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
      let defaultPrevented = false;

      this.tabChange.emit(
          {activeId: this.activeId, nextId: selectedTab.id, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        this.activeId = selectedTab.id;
      }
    }
  }

  ngAfterContentChecked() {
    // auto-correct activeId that might have been set incorrectly as input
    let activeTab = this._getTabById(this.activeId);
    this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
  }

  private _getTabById(id: string): TabDirective {
    let tabsWithId: TabDirective[] = this.tabs.filter(tab => tab.id === id);
    return tabsWithId.length ? tabsWithId[0] : null;
  }
}

