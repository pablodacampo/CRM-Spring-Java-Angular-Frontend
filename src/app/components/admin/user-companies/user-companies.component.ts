import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CompanyService } from './../../../services/company.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { User } from './../../../models/user.model';
import { Company } from './../../../models/company.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-user-companies',
  templateUrl: './user-companies.component.html',
  styleUrls: ['./user-companies.component.css']
})
export class UserCompaniesComponent implements OnInit {

  @Input() user: User;
  @Output() showCompanies = new EventEmitter<boolean>();
  searchTerm: Subject<string> = new Subject<string>();
  userCompanies: Company[];
  currentUser: User;
  companiesFoundInSearch: Company[];

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    public loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.getCompaniesByUserId(this.user.id);
    this.listenForSearchTerms();
  }

  private getCompaniesByUserId(id: number): void {
    this.userService.getCompaniesByUserId(id).subscribe((companies: Company[]) => {
      this.userCompanies = companies;
    });
  }

  private listenForSearchTerms(): void {
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((searchTerm: string) => {
      this.companyService.searchCompanies(searchTerm).subscribe((companies: Company[]) => {
        const existingCompanyIds = this.userCompanies.map((company: Company) => company.id);
        this.companiesFoundInSearch = companies
          .filter((searchedCompany) => !existingCompanyIds.includes(searchedCompany.id));
      });
    });
  }

  public searchCompanies(searchTerm: string): void {
    this.searchTerm.next(searchTerm);
  }

  public addCompanyToUser(userId: number, companyId: number): void {
    if (!this.userCompanies.map((company: Company) => company.id).includes(companyId)) {
      this.userService.addCompanyToUser(userId, companyId).subscribe((addedCompany: Company) => {
        this.userCompanies.push(addedCompany);
        const index = this.companiesFoundInSearch.map((company: Company) => company.id).indexOf(addedCompany.id);
        this.companiesFoundInSearch.splice(index, 1);
      });
    }
  }

  public removeCompanyFromUser(userId: number, companyId: number): void {
    this.userService.removeCompanyFromUser(userId, companyId).subscribe(() => {
      const index = this.userCompanies.map((company: Company) => company.id).indexOf(companyId);
      this.userCompanies.splice(index, 1);
    });
  }

  public cancel(): void {
    this.showCompanies.emit(false);
  }

}
