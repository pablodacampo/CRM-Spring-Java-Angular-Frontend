import { first } from 'rxjs/operators';
import { Address } from './../models/address.model';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { Company } from './../models/company.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  public getUsers(): Observable<User[]> {
    return this.http.get('users').pipe(
      first());
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get(`users/${userId}`).pipe(
      first());
  }

  public searchUsers(searchTerm: string): Observable<User[]> {
    if (!searchTerm?.trim()) {
      return of([]);
    }
    return this.http.get(`users/search?term=${searchTerm}`).pipe(first());
  }

  public createUser(user: User): Observable<User> {
    return this.http.post('users', user).pipe(
      first());
  }

  public updateUser(user: User): Observable<User> {
    return this.http.patch('users', user).pipe(
      first());
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete(`users/${userId}`).pipe(
      first());
  }

  public getCompaniesByUserId(userId: number): Observable<Company[]> {
    return this.http.get(`users/${userId}/companies`).pipe(
      first());
  }

  public addCompanyToUser(userId: number, companyId: number): Observable<Company> {
    return this.http.post(`users/${userId}/companies/${companyId}`, null).pipe(
      first());
  }

  public removeCompanyFromUser(userId: number, companyId: number): Observable<Company> {
    return this.http.delete(`users/${userId}/companies/${companyId}`).pipe(
      first());
  }

  public createUserAddress(userId: number, address: Address): Observable<User> {
    return this.http.post(`users/${userId}/createaddress`, address).pipe(
      first());
  }

  public updateUserAddress(userId: number, address: Address): Observable<User> {
    return this.http.patch(`users/${userId}/updateaddress`, address).pipe(
      first());
  }

}

