import { Company } from './../../../models/company.model';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  companies: Company[];
  newUser: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getUserById();
  }

  private getUserById(): void {
    const userId: number = +this.route.snapshot.paramMap.get('userId');
    if (userId > 0) {
      this.userService.getUserById(userId).subscribe((user: User) => {
      this.user = user;
      this.newUser = false;
      this.getCompaniesByUserId();
    });
    } else {
      this.user = new User();
      this.newUser = true;
    }
  }

  public createUser(): void {
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

  private getCompaniesByUserId(): void {
    const userId: number = +this.route.snapshot.paramMap.get('userId');
    this.userService.getCompaniesByUserId(userId).subscribe((companies: Company[]) => {
      this.companies = companies;
      console.log(this.companies);
    });
  }


  // private addCompanyToUser(): Company {
  //   return this.userService.addCompanyToUser();
  // }

  // private removeCompanyToUser(): void {
  //   return this.userService.removeCompanyFromUser();
  // }

  // private createUserAddress(): User {
  //   return this.userService.createUserAddress();
  // }

  // private updateUserAddress(): User {
  //   return this.userService.updateUserAddress();
  // }


  public goBack(): void {
    this.location.back();
  }

}
