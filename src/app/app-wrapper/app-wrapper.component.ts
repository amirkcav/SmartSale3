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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.appUci = params.get('uci');
      this.appKey = params.get('apm');
      // calling initApp after the app data is updated.
      setTimeout(() => {
        if (this.app) {
          this.app.initApp();
        }
      });
    });

  }

}
