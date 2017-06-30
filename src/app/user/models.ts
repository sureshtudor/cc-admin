
export interface IUser {
  userid: number;
  username:string;
  firstname:string;
  lastname:string;
  email: string;
  active: boolean;
  lockedout: boolean;
}

export interface IUserDetails {
  losid: number;
  acctnum: number;
  comment: string;
  user: IUser;
}

export interface IAccountDetails {
  acctnum: number;
  acctname: string;
  custname: string;
  acctstatus: number;
}

export interface IPasswordDetails {
  pwdid: number;
  type: number;
  expiry: string;
}

export const AccountStatus = [
  {value: 0, name: 'Disabled'},
  {value: 1, name: 'Active'},
  {value: 2, name: 'Unknown'},
  {value: 3, name: 'Migrated'}
]

export const PasswordStatus = [
  {value: 0, name: 'Permanent'},
  {value: 1, name: 'Temporary'},
  {value: 2, name: 'Temporary'}
]
