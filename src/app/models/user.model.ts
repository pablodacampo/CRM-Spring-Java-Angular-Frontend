import { Address } from './address.model';
import { Company } from './company.model';

export class User {

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
