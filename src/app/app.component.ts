import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AppService } from '../app/app.service';

import { AlertsService } from '@cavsys/zang/src/app/alerts.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenubarSub } from 'primeng/menubar';
import { QuestionService } from '@cavsys/zang/src/app/dynamic-form/question.service';
import { DynamicAppComponent } from '@cavsys/zang/src/app/dynamic-app/dynamic-app.component';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService, AlertsService, MessageService ]
})
export class AppComponent implements OnInit {

  @ViewChild('app') app: DynamicAppComponent;

  hamburgerMenuItems: MenuItem[];
  mainMenuItems: MenuItem[] = new Array<MenuItem>(); // require('../assets/menu.json');
  appUci: string;
  appKey: string;
  
  constructor(private service: AppService, private alertsService: AlertsService, private router: Router) {    
    this.service.getMenu().then((data) => {
      this.setMenu(data);
    });
  }

  ngOnInit(): void {    

    // the "hamburger" button menu.
    this.hamburgerMenuItems = [
      {label: 'התנתק', icon: 'fa fa-sign-out', 'command': this.logout },
      {label: 'מספר גירסה', icon: ''}
    ];

    this.setRtlMenu();    

    // QuestionService.unauthorizedResponse.subscribe(this.unauthorizedError);
    QuestionService.unauthorizedResponse.subscribe((a) => { 
      this.unauthorizedError(a); 
    });
  }

  logout() {
    window.location.href = environment.dynamicFormBaseDevUrl;
  }

  unauthorizedError(error: any) {
    // this.alertsService.clear();
    console.log('++++++   unauthorizedError    +++++++');
    this.alertsService.alert('error', 'יש צורך להתחבר למערכת', 'מייד תועבר לדף ההתחברות');
  }

  setMenu(menuData) {
    // if there is only one menu item except the favorites, set its children as parents.
    if (menuData.length === 2) {
      menuData = menuData[0].MENU.concat(menuData[1]);
    }
    menuData.forEach(element => {
      const newElem = this.setMenuItem(element);
      this.mainMenuItems.push(newElem);
    });
  }

  setMenuItem(itemData) {
    const elem: any = { label: itemData.TXT };
    // set child menu
    if (itemData.MENU) {
      elem.items = [];
      itemData.MENU.forEach((item) => {
        elem.items.push(this.setMenuItem(item));
      });
    }
    // run app on click
    if (itemData.TYP === 'A') {
      elem.command = () => {
        let url = `/${itemData.UCI}/${itemData.APM}`;
        if (itemData.wCY) {
          url += `/${itemData.wCY}`;
        }
        console.log(url);
        this.router.navigateByUrl(url);
        // this.appUci = itemData.UCI;
        // this.appKey = itemData.APM;
        // // currently, on the first click the app component does not exist.
        // if (this.app) {
        //   this.app.initApp();
        // }
      };
    }
    return elem;
  }

  setRtlMenu() {
    MenubarSub.prototype.onItemMouseEnter = function(event, item, menuitem) {
      const abc: any = this; 
      if (abc.autoDisplay || (!abc.autoDisplay && abc.root && abc.menuHoverActive)) {
        if (menuitem.disabled) {
            return;
        }
        if (abc.hideTimeout) {
            clearTimeout(abc.hideTimeout);
            abc.hideTimeout = null;
        }
        abc.activeItem = abc.activeItem ? (abc.activeItem.isEqualNode(item) ? null : item) : item;
        const nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            const sublist = nextElement.children[0];
            sublist['style'].zIndex = String(1000 /*++domhandler_1.DomHandler.zindex*/);
            if (abc.root) {
                sublist['style'].top = abc.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist['style'].right = '0px';
            }
            else {
                sublist['style'].top = '0px';
                sublist['style'].right = abc.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
        abc.activeMenu = abc.activeMenu ? (abc.activeMenu.isEqualNode(item) ? null : item) : item;
      }
    };
  }

}
