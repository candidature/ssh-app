import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { MainComponent } from './containers/main/main.component';
import { ComponentsModule } from './components';

import { reducer } from './reducers';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,

    /**
    * StoreModule.provideStore is imported once in the root module, accepting a reducer
    * function or object map of reducer functions. If passed an object of
    * reducers, combineReducers will be run creating your application
    * meta-reducer. This returns all providers for an @ngrx/store
    * based application.
    */
    StoreModule.provideStore(reducer),

    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
