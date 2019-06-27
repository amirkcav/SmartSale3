import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.post(environment.menuUrl, { 'SYSTEM': 'SS3' }).toPromise().then((resp) => {
      return resp;
    })
    .catch((error) => {
      console.log(999);
    });
  }

  getSessionInfo() {
    return this.http
      .get(environment.dynamicFormBaseDevUrl + environment.sessionInfoUrl)
      .toPromise()
      .then(response => {
        return response;
      });
  }

}
