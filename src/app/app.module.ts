import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { environment } from '../environments/environment';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { DynamicFormModule } from '@cavsys/zang/public_api';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: ':uci/:apm', component: AppWrapperComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppWrapperComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule,
    MenuModule,
    MenubarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    DynamicFormModule.forRoot(environment);
  }
}
