import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<AppWrapperComponent> {
  canDeactivate(wrapper: AppWrapperComponent): boolean {
    if (wrapper.app.isAppDirty()) {
        if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
            return true;
        } 
        else {
            return false;
        }
    }
    return true;
  }
}
