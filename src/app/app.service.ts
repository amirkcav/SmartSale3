import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.post(environment.dynamicFormBaseDevUrl + environment.menuUrl, { 'SYSTEM': 'SS3' }, {'headers': this.headers}).toPromise().then((resp) => {
      return resp;
    })
    .catch((error) => {
      console.log(999);
    });
  }

  getSessionInfo() {
    return this.http
      .get(environment.dynamicFormBaseDevUrl + environment.sessionInfoUrl, {'headers': this.headers})
      .toPromise()
      .then(response => {
        return response;
      });
  }

}
