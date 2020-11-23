import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { Company } from './../../../models/company.model';
import { User } from './../../../models/user.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css']
})
export class MyCompaniesComponent implements OnInit {

  @Output() showCompanies = new EventEmitter<boolean>();
  userCompanies: Company[];
  currentUser: User;

  constructor(
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
  }

}
