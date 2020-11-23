import { Role } from './../../../enums/role.enum';
import { LoginService } from './../../../services/login.service';
import { Company } from './../../../models/company.model';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  userCompanies: Company;
  roles: string[];
  newUser: boolean;
  currentUser: User;
  showAddress: boolean;
  showCompanies: boolean;

  constructor(
    private userService: UserService,
    public loginService: LoginService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.showAddress = false;
    this.showCompanies = false;
    this.loginService.getCurrentUser().subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.loginService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      this.getUserById();
    });
  }

  private getUserById(): void {
    const userId: number = +this.route.snapshot.paramMap.get('userId');
    if (userId > 0) {
      this.userService.getUserById(userId).subscribe((user: User) => {
      this.user = user;
      this.newUser = false;
      this.arrangeRoles();
    });
    } else {
      this.user = new User();
      this.user.role = Role.SALES.toString();
      this.arrangeRoles();
      this.newUser = true;
    }
  }

  private arrangeRoles(): void {
    this.roles = this.roles.filter((role: string) => role !== this.user.role);
    this.roles.unshift(this.user.role);
  }

  public createUser(): void {
    this.user.password = btoa(this.user.password);
    this.userService.createUser(this.user).subscribe(() => {
      this.goBack();
    });
  }

  public updateUser(): void {
    this.userService.updateUser(this.user).subscribe((user: User) => {
      this.user = user;
      this.goBack();
    });
  }

  public receiveAddressMessage(visible: boolean): void {
    this.showAddress = visible;
  }

  public receiveCompanyMessage(visible: boolean): void {
    this.showCompanies = visible;
  }

  public goBack(): void {
    this.location.back();
  }

}
