import { first } from 'rxjs/operators';
import { Address } from './../models/address.model';
import { User } from './../models/user.model';
import { Observable, of } from 'rxjs';
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

  public searchCompanies(searchTerm: string): Observable<Company[]> {
    if (!searchTerm?.trim()) {
      return of([]);
    }
    return this.http.get(`companies/search?term=${searchTerm}`).pipe(first());
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

  public addUserToCompany(companyId: number, userId: number): Observable<User> {
    console.log(`companies/${companyId}/users/${userId}`);
    return this.http.post(`companies/${companyId}/users/${userId}`, null).pipe(
      first());
  }

  public removeUserfromCompany(companyId: number, userId: number): Observable<User> {
    return this.http.delete(`companies/${companyId}/users/${userId}`).pipe(
      first());
  }

  public createCompanyAddress(companyId: number, address: Address): Observable<Company> {
    return this.http.post(`companies/${companyId}/createaddress`, address).pipe(
      first());
  }

  public updateCompanyAddress(companyId: number, address: Address): Observable<Company> {
    return this.http.patch(`companies/${companyId}/updateaddress`, address).pipe(
      first());
  }

}
