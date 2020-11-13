import { Role } from './../../../enums/role.enum';
import { User } from './../../../models/user.model';
import { LoginRequest } from './../../../models/login-request.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest;
  errorMessage: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.errorMessage = false;
    this.loginRequest = new LoginRequest();
  }

  public login(): void {
    this.loginRequest.password = btoa(this.loginRequest.password);
    this.loginService.findByEmailAndPassword(this.loginRequest).subscribe((user: User) => {
      if (user) {
        this.loginService.setCurrentUser(user);
        if (user.role === Role.MANAGER) {
          this.router.navigate(['/users']);
        } else if (user.role === Role.SALES) {
          this.router.navigate(['/companies']);
        } else {
          // Option not currently used as only two Roles
        }
        this.loginService.sendUser(user);
      } else {
        this.errorMessage = true;
      }

    });
  }

  public logout(): void {
    this.loginService.logOut();
  }
}
