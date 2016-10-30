import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TabContentDirective, TabDirective, TabsetComponent, TabTitleDirective } from './tab';
import { ConnectionFormComponent } from './connection-form/connection-form.component';

export { TabChangeEvent } from './tab';

export const COMPONENTS = [
  TabContentDirective,
  TabDirective,
  TabsetComponent,
  TabTitleDirective,
  ConnectionFormComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
