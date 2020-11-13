import { AddressEntity } from './../interfaces/address-entity';
import { Address } from './address.model';
import { Company } from './company.model';

export class User implements AddressEntity {

  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
  role: string;
  address: Address;
  companies: Company[];
}
