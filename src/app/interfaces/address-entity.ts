import { Address } from './../models/address.model';

export interface AddressEntity {
  id: number;
  entityType: any;
  address: Address;
  telephone: string;
}
