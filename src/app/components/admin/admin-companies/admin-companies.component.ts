import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from './../../../models/user.model';
import { Company } from './../../../models/company.model';
import { CompanyService } from './../../../services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  companies: Company[];
  currentUser: User;

  constructor(
    private companyService: CompanyService,
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
    this.getCompanies();
  }

  private getCompanies(): void {
    this.companyService.getCompanies().subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }

  public deleteCompany(company: Company): void {
    this.companyService.deleteCompany(company.id).subscribe(() => {
      const index = this.companies.indexOf(company);
      this.companies.splice(index, 1);
    });
  }

}
