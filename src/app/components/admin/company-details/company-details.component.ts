import { User } from './../../../models/user.model';
import { Company } from './../../../models/company.model';
import { ActivatedRoute } from '@angular/router';
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
  users: User[];
  newCompany: boolean;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getCompanyById();
  }

    private getCompanyById(): void {
      const companyId: number = +this.route.snapshot.paramMap.get('companyId');
      if (companyId > 0) {
        this.companyService.getCompanyById(companyId).subscribe((company: Company) => {
          this.company = company;
          this.newCompany = false;
          this.getUsersByCompanyId();
      });
      } else {
        this.company = new Company();
        this.newCompany = true;
      }
  }

  public createCompany(): void {
    this.companyService.createCompany(1, this.company).subscribe(() => {
      this.goBack();
    });
  }

  public updateCompany(): void {
    this.companyService.updateCompany(this.company).subscribe(() => {
      this.goBack();
    });
  }

    private getUsersByCompanyId(): void {
      const companyId: number = +this.route.snapshot.paramMap.get('companyId');
      this.companyService.getUsersByCompanyId(companyId).subscribe((users: User[]) => {
        this.users = users;
        console.log(this.users);
      });
    }


  // private createCompanyAddress(): User {
  //   return this.companyService.createCompanyAddress();
  // }

  // private updateCompanyAddress(): User {
  //   return this.companyService.updateCompanyAddress();
  // }


  public goBack(): void {
    this.location.back();
  }

}
