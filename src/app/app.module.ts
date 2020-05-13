import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';
import {CustomerViewComponent} from './customer-view/customer-view.component';
import {NgxsModule} from '@ngxs/store';
import {CustomerState} from './state/customer.state.';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

@NgModule({
  declarations: [
    AppComponent,
    CustomerAddComponent,
    CustomerViewComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      CustomerState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
