import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ExplorerComponent } from './explorer';
import { TabComponent, TabsComponent} from './tab';



export const COMPONENTS = [
  ExplorerComponent,
  TabComponent,
  TabsComponent
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
