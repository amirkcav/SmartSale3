import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppService } from '../app/app.service';

import { AlertsService } from '@cavsys/zang/src/app/alerts.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenubarSub } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService, AlertsService, MessageService ]
})
export class AppComponent implements OnInit {

  hamburgerMenuItems: MenuItem[];
  mainMenuItems: MenuItem[] = new Array<MenuItem>(); // require('../assets/menu.json');
  
  constructor(private service: AppService, private alertsService: AlertsService) {
    this.service.getMenu().then((data) => {
      this.setMenu(data);
    });
  }

  ngOnInit(): void {
    // the "hamburger" button menu.
    this.hamburgerMenuItems = [
      {label: 'התנתק', icon: 'fa fa-sign-out' /*, 'command': this.logout */ },
      {label: 'מספר גירסה', icon: ''}
    ];

    this.setRtlMenu();    
  }

  setMenu(menuData) {
    menuData.forEach(element => {
      const newElem = this.setMenuItem(element);
      this.mainMenuItems.push(newElem);
    });
  }

  setMenuItem(itemData) {
    const elem: any = { label: itemData.TXT };
    if (itemData.MENU) {
      elem.items = [];
      itemData.MENU.forEach((item) => {
        elem.items.push(this.setMenuItem(item));
      });
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
