import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public httpClient: HttpClient) { }
  get addRequestHeader() {
    return this.requestHeader();
  }
  private requestHeader() {
    let storage = localStorage.getItem("token");
    let token = ' ';
    if (!storage) {
      return null;
    }
    token = storage;
    return new HttpHeaders({
      'Authorization': 'bearer ' + token
    })
  }

}
