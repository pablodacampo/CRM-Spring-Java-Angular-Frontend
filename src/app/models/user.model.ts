import { AddressEntity } from './../interfaces/address-entity';
import { Address } from './address.model';
import { Company } from './company.model';

export class User implements AddressEntity {

  id: number;
  entityType: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
  role: string;
  address: Address;
  companies: Company[];

  constructor() {
    this.entityType = User;
  }
}
