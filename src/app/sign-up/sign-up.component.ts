import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user'
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private registerSubscription: Subscription = new Subscription;

  registerForm:FormGroup = new FormGroup({
    full_name:new FormControl(null,Validators.required),
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required)
  })

  constructor(private toastr: ToastrService, private router : Router, private user_service: UserService) { }

  ngOnInit(): void {
  }

  register(){

    if(!this.registerForm.valid){
      console.log('Invalid Form'); return;
    }
    var user : User = {full_name:this.registerForm.get("full_name")!.value, username:this.registerForm.get("username")!.value, password:this.registerForm.get("password")!.value};
    this.registerSubscription = this.user_service.register(user)
    .subscribe(
      data => {this.toastr.success('Success'); this.router.navigate(['/log-in']);}
    )
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }
}
