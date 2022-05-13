import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user'
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

  constructor(private toastr: ToastrService, private router : Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  register(){
    if(!this.registerForm.valid){
      this.toastr.error('The Provided Information is Invalid. Please Try Again.'); return;
    }

    var user : User = {full_name:this.registerForm.get("full_name")!.value, username:this.registerForm.get("username")!.value, password:this.registerForm.get("password")!.value};

    this.registerSubscription = this.userService.register(user)
    .subscribe(
      (_) => {this.toastr.success('Successfully Registered.'); this.router.navigate(['/log-in']);}
    )
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }
}
