import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required)
  })

  constructor(private router : Router, private user_service: UserService) { }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginForm.valid){
      console.log('Invalid Form'); return;
    }
    var user : User = {full_name:"", username:this.loginForm.get("username")!.value, password:this.loginForm.get("password")!.value}
    this.user_service.login(user)
    .subscribe(
      data=>{console.log(data); this.user_service.emitLoggedIn({full_name: data.full_name, username: data.username, password: ""}); this.router.navigate(['/']);} ,
    )
  }
}
