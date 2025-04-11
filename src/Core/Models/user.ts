export type Role = 'ADMIN' | 'BORROWER' | 'OWNER';

export interface User {
  id?: number;
  cin: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: Role;
}
