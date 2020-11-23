import { Address } from './../../../models/address.model';
import { AddressEntity } from './../../../interfaces/address-entity';
import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {

  @Input() userOrCompany: AddressEntity;
  @Output() showAddress = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    if (!this.userOrCompany.address) {
      this.userOrCompany.address = new Address();
    }
  }

  public cancel(): void {
    if (this.userOrCompany.address.id === undefined) {
      this.userOrCompany.address = null;
    }
    this.showAddress.emit(false);
  }

  // public createAddress(address: Address): void {
  //   if (this.userOrCompany.entityType === Company) {
  //     this.companyService.createCompanyAddress(this.userOrCompany.id, address).subscribe();
  //   } else if (this.userOrCompany.entityType === User) {
  //     this.userService.createUserAddress(this.userOrCompany.id, address).subscribe();
  //   }
  // }

  // public updateAddress(address: Address): void {
  //   if (this.userOrCompany.entityType === Company) {
  //     this.companyService.updateCompanyAddress(this.userOrCompany.id, address).subscribe();
  //   } else if (this.userOrCompany.entityType === User) {
  //     this.userService.updateUserAddress(this.userOrCompany.id, address).subscribe();
  //   }
  // }

}
