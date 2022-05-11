import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API_URL = "http://localhost:3600/auth";

  constructor(private http : HttpClient) { }

  public isAuthenticated() : Boolean {
    let userData = sessionStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public validate(username: String, password: String) {
    return this.http.post(this.AUTH_API_URL + '/authenticate', {'username' : username, 'password' : password});
  }
}