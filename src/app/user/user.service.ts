
import { HttpClient } from '@angular/common/http'
import { Injectable, Output, EventEmitter } from '@angular/core'
import { Observable} from 'rxjs'
import { User } from './user'

import { HttpHeaders } from '@angular/common/http';

const http_options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USERS_API_URL = "http://localhost:3600/users";

  @Output() loggedIn: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.USERS_API_URL + "/register", user, http_options); 
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.USERS_API_URL + "/login", user, http_options); 
  }

  emitLoggedIn(user: User): void {
    this.loggedIn.emit(user);
  }

  getLoggedIn() {
    return this.loggedIn;
  }
}


