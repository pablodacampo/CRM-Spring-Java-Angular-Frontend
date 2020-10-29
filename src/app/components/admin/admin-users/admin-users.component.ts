import { Company } from './../../../models/company.model';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  public deleteUser(user: User): void {
    this.userService.deleteUser(user.userId).subscribe(() => {
      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
    });
  }


}
