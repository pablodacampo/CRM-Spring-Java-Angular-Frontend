import { NavbarComponent } from './components/core/navbar/navbar.component';
import { LoginComponent } from './components/core/login/login.component';
import { CompanyDetailsComponent } from './components/admin/company-details/company-details.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminCompaniesComponent } from './components/admin/admin-companies/admin-companies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'companies', component: AdminCompaniesComponent},
  {path: 'users', component: AdminUsersComponent},
  {path: 'userdetails', component: UserDetailsComponent},
  {path: 'userdetails/:userId', component: UserDetailsComponent},
  {path: 'companydetails', component: CompanyDetailsComponent},
  {path: 'companydetails/:companyId', component: CompanyDetailsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
