import { AddressEntity } from './../interfaces/address-entity';
import { Address } from './address.model';
import { User } from './user.model';

export class Company implements AddressEntity {

  companyId: number;
  reference: string;
  name: string;
  owner: string;
  telephone: string;
  website: string;
  contactName: string;
  contactTelephone: string;
  contactEmail: string;
  callLast: Date;
  visitLast: Date;
  messages: string;
  discount: string;
  salesExp: number;
  sales3m: number;
  salesTotal: number;
  address: Address;
  users: User[];
}
