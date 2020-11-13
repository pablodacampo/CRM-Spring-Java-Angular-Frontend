import { Role } from './../../../enums/role.enum';
import { LoginService } from './../../../services/login.service';
import { User } from './../../../models/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUser: User;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.getUserUpdates();
        this.router.navigate(['/login']);
      }
    });
  }

  private getUserUpdates(): void {
    this.loginService.currentUser.subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  public isCurrentUserManager(): boolean {
    return this.currentUser.role === Role.MANAGER.toString();
  }
  public logout(): void {
    this.loginService.logOut();
    this.currentUser = null;
  }

}
