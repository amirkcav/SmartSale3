import { Component, OnInit, ViewChild, isDevMode } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AppService } from '../app/app.service';

import { AlertsService } from '@cavsys/zang/src/app/alerts.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenubarSub } from 'primeng/menubar';
import { QuestionService } from '@cavsys/zang/src/app/dynamic-form/question.service';
import { DynamicAppComponent } from '@cavsys/zang/src/app/dynamic-app/dynamic-app.component';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService, AlertsService, MessageService ]
})
export class AppComponent implements OnInit {

  @ViewChild('app') app: DynamicAppComponent;
  @ViewChild('panelMenu') panelMenu: PanelMenu;

  hamburgerMenuItems: MenuItem[];
  mainMenuItems: MenuItem[] = new Array<MenuItem>(); // require('../assets/menu.json');
  mobileMenu: MenuItem[];
  appUci: string;
  appKey: string;
  job: number;
  isTouchDevice: boolean;
  isMobile: boolean;
  displayMenu: boolean;

  constructor(private service: AppService, private alertsService: AlertsService, private router: Router) {    
    // no hover on touch device. working with click.
    this.isTouchDevice = this.checkIsTouchDevice();
    this.isMobile = this.checkIsMobile();
    this.service.getMenu().then((data) => {
      this.setMenu(data);
      this.mobileMenu = this.mainMenuItems.concat([{separator: true, styleClass: 'menu-separator'}]).concat(this.hamburgerMenuItems);
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
    if (!isDevMode()) {
      this.service.getSessionInfo().then((res) => {
        this.job = res['data']['sessionId'];
      })
      .catch((err) => {
        console.log(err.message);
        if (err.status === 403) {
          this.unauthorizedError(err);
        }
        else {
          this.alertsService.alert('error', 'אירעה שגיאה', err.message);
        }
      });
    }
  }

  logout() {
    window.location.href = environment.dynamicFormBaseDevUrl;
  }

  unauthorizedError(error: any) {
    this.alertsService.alert('error', 'יש צורך להתחבר למערכת', 'מייד תועבר לדף ההתחברות');
    setTimeout(() => {
      this.logout();
    }, 1500);
  }

  setMenu(menuData) {
    // if there is only one menu item (system) except the favorites, and it has only one company, skip the system and the company.
    if (menuData.length === 2 && menuData[0].MENU.length === 1) {
      menuData = menuData[0].MENU[0].MENU.concat(menuData[1]);
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

        setTimeout(() => {
          this.displayMenu = false;
        }, 200);
      };
    }
    return elem;
  }

  setRtlMenu() {
    MenubarSub.prototype.onItemMouseEnter = function(event, item, menuitem) {
      const thisHolder: any = this; 
      if (thisHolder.autoDisplay || (!thisHolder.autoDisplay && thisHolder.root && thisHolder.menuHoverActive)) {
        if (menuitem.disabled) {
            return;
        }
        if (thisHolder.hideTimeout) {
            clearTimeout(thisHolder.hideTimeout);
            thisHolder.hideTimeout = null;
        }
        thisHolder.activeItem = thisHolder.activeItem ? (thisHolder.activeItem.isEqualNode(item) ? null : item) : item;
        const nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            const sublist = nextElement.children[0];
            sublist['style'].zIndex = String(1000 /*++domhandler_1.DomHandler.zindex*/);
            if (thisHolder.root) {
                sublist['style'].top = thisHolder.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist['style'].right = '0px';
            }
            else {
                sublist['style'].top = '0px';
                sublist['style'].right = thisHolder.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
        thisHolder.activeMenu = thisHolder.activeMenu ? (thisHolder.activeMenu.isEqualNode(item) ? null : item) : item;
      }
    };

    MenubarSub.prototype.onItemMenuClick = function (event, item, menuitem) {
      if (!this.autoDisplay) {
          if (menuitem.disabled) {
              return;
          }
          this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
          const nextElement = item.children[0].nextElementSibling;
          if (nextElement) {
            const sublist = nextElement.children[0];
              if (this.autoZIndex) {
                  sublist['style'].zIndex = String(this.baseZIndex + (1001 /*++domhandler_1.DomHandler.zindex*/));
              }
              if (this.root) {
                  sublist['style'].top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                  sublist['style'].right = '0px';
              }
              else {
                  sublist['style'].top = '0px';
                  sublist['style'].right = this.domHandler.getOuterWidth(item.children[0]) + 'px';
              }
          }
          this.menuClick = true;
          this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
          this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
          this.bindEventListener();
      }
  };
  }

  checkIsTouchDevice() {
    return (('ontouchstart' in window)
         || (navigator['MaxTouchPoints'] > 0)
         || (navigator['msMaxTouchPoints'] > 0));
  }

  checkIsMobile() {
    return window.innerWidth <= 650;
  }

  onSidebarHide(event: any) {
    this.panelMenu.collapseAll();
  }

}
