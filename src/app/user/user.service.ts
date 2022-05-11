
import { HttpClient } from '@angular/common/http'
import { Injectable, Output, EventEmitter } from '@angular/core'
import { Observable} from 'rxjs'
import { User } from './user' 
import { AuthService } from '../auth/auth.service'
import { Constants } from 'src/constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() loggedIn: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient, private authService: AuthService, private constants: Constants) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.constants.USERS_API_URL + "/register", user, this.constants.HTTP_OPTIONS); 
  }

  logout() {
    return this.http.get(this.constants.USERS_API_URL + "/logout", this.constants.HTTP_OPTIONS); 
  }

  emitLoggedIn(user: User): void {
    this.loggedIn.emit(user);
  }

  emitLoggedOut(): void {
    this.loggedIn.emit(undefined);
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  setUserInfo(user: User){
    sessionStorage.setItem('userInfo', JSON.stringify(user));
  }

  removeUserInfo() {
    sessionStorage.removeItem('userInfo');
  }

  getUserInfo() {
    if (this.authService.isAuthenticated()) {
      return JSON.parse(sessionStorage.getItem('userInfo')!)
    }
  }
}


