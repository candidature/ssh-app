import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelComponent } from './panel/panel.component';
import { TabComponent, TabsComponent} from './tab';
import { ListItemComponent } from './list/list-item.component';



export const COMPONENTS = [
  ListItemComponent,
  PanelComponent,
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
