import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { CompanyService } from './services/company.service';
import { RoutingModule } from './routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminCompaniesComponent } from './components/admin/admin-companies/admin-companies.component';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { CompanyDetailsComponent } from './components/admin/company-details/company-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AdminUsersComponent,
    AdminCompaniesComponent,
    UserDetailsComponent,
    CompanyDetailsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  providers: [CompanyService, UserService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

