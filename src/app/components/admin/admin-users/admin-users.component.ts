import { Router } from '@angular/router';
import { LoginRequest } from './../../../models/login-request.model';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: User[];
  currentUser: User;
  loginRequest: LoginRequest;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  public deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
    });
  }

}
