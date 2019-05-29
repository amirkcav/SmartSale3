import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { DynamicFormModule } from '@cavsys/zang/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule,
    MenuModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    DynamicFormModule.forRoot(environment);
  }
}
