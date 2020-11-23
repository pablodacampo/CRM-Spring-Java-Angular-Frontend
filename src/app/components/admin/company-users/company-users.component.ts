import { UserService } from './../../../services/user.service';
import { CompanyService } from './../../../services/company.service';
import { Company } from './../../../models/company.model';
import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { LoginRequest } from './../../../models/login-request.model';
import { User } from './../../../models/user.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.css']
})
export class CompanyUsersComponent implements OnInit {

  @Input() company: Company;
  @Output() showUsers = new EventEmitter<boolean>();
  searchTerm: Subject<string> = new Subject<string>();
  companyUsers: User[];
  currentUser: User;
  loginRequest: LoginRequest;
  usersFoundInSearch: User[];

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
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
    this.getUsersByCompanyId(this.company.id);
    this.listenForSearchTerms();
  }

  private getUsersByCompanyId(id: number): void {
    this.companyService.getUsersByCompanyId(id).subscribe((users: User[]) => {
      this.companyUsers = users;
    });
  }

  private listenForSearchTerms(): void {
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((searchTerm: string) => {
      this.userService.searchUsers(searchTerm).subscribe((users: User[]) => {
        const existingUserIds = this.companyUsers.map((user: User) => user.id);
        this.usersFoundInSearch = users
          .filter((searchedUser) => !existingUserIds.includes(searchedUser.id));
      });
    });
  }

  public searchUsers(searchTerm: string): void {
    this.searchTerm.next(searchTerm);
  }

  public addUserToCompany(companyId: number, userId: number): void {
    if (!this.companyUsers.map((user: User) => user.id).includes(userId)) {
      this.companyService.addUserToCompany(companyId, userId).subscribe((addedUser: User) => {
        this.companyUsers.push(addedUser);
        const index = this.usersFoundInSearch.map((user: User) => user.id).indexOf(addedUser.id);
        this.usersFoundInSearch.splice(index, 1);
      });
    }
  }

  public removeUserFromCompany(companyId: number, userId: number): void {
    this.companyService.removeUserfromCompany(companyId, userId).subscribe(() => {
      const index = this.companyUsers.map((user: User) => user.id).indexOf(userId);
      this.companyUsers.splice(index, 1);
    });
  }

  public cancel(): void {
    this.showUsers.emit(false);
  }

}
