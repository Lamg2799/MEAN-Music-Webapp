import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor(private toastr: ToastrService, private router : Router, private authService : AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.removeUserInfo();
    this.userService.logout();
    this.userService.emitLoggedOut();
    this.toastr.success('Successfully Logged Out');
    this.router.navigate(['/']);
  }



}
