import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicAppComponent } from '@cavsys/zang/src/app/dynamic-app/dynamic-app.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.css']
})
export class AppWrapperComponent implements OnInit {

  @ViewChild('app') app: DynamicAppComponent;

  appUci: string;
  appKey: string;
  appWcy: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.appUci = params.get('uci');
      this.appKey = params.get('apm');
      this.appWcy = params.get('wcy');
      if (this.app) {
        // changing the appData to null, so the app would be refreshed.
        this.app.appData = null;
        this.app.headerFormSubmitted = false;
      }
      setTimeout(() => {
        this.app.initApp();
      });
    });

  }

}
