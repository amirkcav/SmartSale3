import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { environment } from '../environments/environment';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';

import { DynamicFormModule } from '@cavsys/zang/public_api';
import { RouterModule, Routes } from '@angular/router';

import {CanDeactivateGuard} from './can-deactivate.guard';

const appRoutes: Routes = [
  { path: ':uci/:apm', component: AppWrapperComponent, canDeactivate: [CanDeactivateGuard] },
  { path: ':uci/:apm/:wcy', component: AppWrapperComponent, canDeactivate: [CanDeactivateGuard] }
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
    SidebarModule,
    PanelMenuModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    DynamicFormModule.forRoot(environment);
  }
}
