import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user';
import { Constants } from '../../../constants'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private constants : Constants) { }

  public isAuthenticated() : Boolean {
    let userData = sessionStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public validate(username: String, password: String) {
    return this.http.post(this.constants.AUTH_API_URL + '/authenticate', {'username' : username, 'password' : password});
  }
}