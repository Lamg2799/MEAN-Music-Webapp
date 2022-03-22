import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  user? : User 

  constructor(private user_service: UserService) { }

  ngOnInit(): void {
    this.user_service.getLoggedIn().subscribe(user => { 
      this.user = user;
    });
  }
}
