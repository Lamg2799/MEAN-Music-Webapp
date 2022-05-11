import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'
import { User } from '../user/user'
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  private validateSubscription: Subscription = new Subscription;

  loginForm:FormGroup = new FormGroup({
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required)
  })

  constructor(private toastr: ToastrService, private router : Router, private authService : AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginForm.valid){
      console.log('Invalid Form'); return;
    }
    this.validateSubscription = this.authService.validate(this.loginForm.get("username")!.value, this.loginForm.get("password")!.value)
    .subscribe(response => {
      let data : any = response;
      let user : User = {full_name : data['user'].full_name, username: data['user'].username, password: data['user'].password}
      this.userService.setUserInfo(user);
      this.userService.emitLoggedIn(user);
      this.toastr.success('Successfully Logged In');
      this.router.navigate(['/']);
    })
  }

  ngOnDestroy(): void {
    this.validateSubscription.unsubscribe();
  }
}
