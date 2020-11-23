import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Role } from './../enums/role.enum';
import { LoginRequest } from './../models/login-request.model';
import { first } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSource = new BehaviorSubject(null);
  public currentUser: Observable<User> = this.userSource.asObservable();

  constructor(
    private http: HttpService,
    private cookieService: CookieService,
    private router: Router) { }

  public findByEmailAndPassword(loginRequest: LoginRequest): Observable<User>{
    return this.http.post('login', loginRequest).pipe(first());
  }

  public getAllRoles(): Observable<string[]> {
    return of(Object.values(Role));
  }

  public setCurrentUser(user: User): void {
    const encryptedUser: string = btoa(JSON.stringify(user));
    this.cookieService.set('user', encryptedUser, 36000, '/');
  }

  public getCurrentUser(): Observable<User> {
    const cookie: string = this.cookieService.get('user');
    if (!cookie) {
      return of(null);
    }
    const decryptedUser: string = atob(cookie);
    const user: User = JSON.parse(decryptedUser);
    return of(user);
  }

  public sendUser(user: User): void {
    this.userSource.next(user);
  }

  public isLoggedIn(): boolean {
    const user: string = this.cookieService.get('user');
    const isLoggedIn =  user?.length > 0;
    return isLoggedIn;
  }

  public logOut(): void {
    this.userSource.next(null);
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
  }


}

