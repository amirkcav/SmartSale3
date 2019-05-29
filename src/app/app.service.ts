import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.post('http://max:8080/zjBoard/mcall?_ROUTINE=%25JMUJSON&_NS=CAV&_LABEL=ZZ', { 'SYSTEM': 'SS3' }).toPromise().then((resp) => {
      return resp;
    })
    .catch((error) => {
      console.log(999);
    });
  }

}
