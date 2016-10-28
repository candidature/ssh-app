import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TabComponent, TabsComponent } from './tab';
import { ConnectionFormComponent } from './connection-form/connection-form.component';

export const COMPONENTS = [
  TabComponent,
  TabsComponent,
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
