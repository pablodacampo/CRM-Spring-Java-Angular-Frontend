import { catchError, first } from 'rxjs/operators';
import { Address } from './../models/address.model';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Company } from './../models/company.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpService) { }

  public getCompanies(): Observable<Company[]> {
    return this.http.get('companies').pipe(
      first());
  }

  public getCompanyById(companyId: number): Observable<Company> {
    return this.http.get(`companies/${companyId}`).pipe(
      first());
  }

  public createCompany(userId: number, company: Company): Observable<Company> {
    return this.http.post(`companies/${userId}`, company).pipe(
      first());
  }

  public updateCompany(company: Company): Observable<Company> {
    return this.http.patch('companies', company).pipe(
      first());
  }

  public deleteCompany(companyId: number): Observable<void> {
    return this.http.delete(`companies/${companyId}`).pipe(
      first());
  }

  public getUsersByCompanyId(companyId: number): Observable<User[]> {
    return this.http.get(`companies/${companyId}/users`).pipe(
      first());
  }

  public createCompanyAddress(companyId: number, address: Address): Observable<User> {
    return this.http.post(`companies/${companyId}`, address).pipe(
      first());
  }

  public updateCompanyAddress(companyId: number, address: Address): Observable<User> {
    return this.http.patch(`companies/${companyId}`, address).pipe(
      first());
  }

}
