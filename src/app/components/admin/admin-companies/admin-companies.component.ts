import { Company } from './../../../models/company.model';
import { CompanyService } from './../../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.css']
})
export class AdminCompaniesComponent implements OnInit {

  companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies(): void {
    this.companyService.getCompanies().subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }

  public deleteCompany(company: Company): void {
    this.companyService.deleteCompany(company.companyId).subscribe(() => {
      const index = this.companies.indexOf(company);
      this.companies.splice(index, 1);
    });
  }

}
