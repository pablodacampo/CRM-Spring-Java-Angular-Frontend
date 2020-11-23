import { Role } from './../../../enums/role.enum';
import { LoginService } from 'src/app/services/login.service';
import { User } from './../../../models/user.model';
import { Company } from './../../../models/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  company: Company;
  companyUsers: User[];
  newCompany: boolean;
  currentUser: User;
  showAddress: boolean;
  showUsers: boolean;
  isCurrentUserManager: boolean;

  constructor(
    private companyService: CompanyService,
    public loginService: LoginService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.showAddress = false;
    this.showUsers = false;
    this.loginService.getCurrentUser().subscribe((user: User) => {
      if (user) {
        this.currentUser = user;
        this.isCurrentUserManager = this.currentUser.role === Role.MANAGER;
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.getCompanyById();
  }

    private getCompanyById(): void {
      const companyId: number = +this.route.snapshot.paramMap.get('companyId');
      if (companyId > 0) {
        this.companyService.getCompanyById(companyId).subscribe((company: Company) => {
          this.company = company;
          this.newCompany = false;
      });
      } else {
        this.company = new Company();
        this.newCompany = true;
      }
  }

  public createCompany(): void {
    this.companyService.createCompany(this.currentUser.id, this.company).subscribe(() => {
      this.goBack();
    });
  }

  public updateCompany(): void {
    this.companyService.updateCompany(this.company).subscribe(() => {
      this.goBack();
    });
  }

  public receiveAddressMessage(visible: boolean): void {
    this.showAddress = visible;
  }

  public receiveUserMessage(visible: boolean): void {
    this.showUsers = visible;
  }

  public goBack(): void {
    this.location.back();
  }

}
