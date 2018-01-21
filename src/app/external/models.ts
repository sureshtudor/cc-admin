
export interface IChangePassword {
  token: string;
  username: string;
  password: string;
  newpassword1: string;
  newpassword2: string;
  recaptcha: string;
}

export interface ISecurityProfile {
  token: string;
  recaptcha: string;
  username: string;
  password: string;
  // userid: number;
  question1: number;
  answer1: string;
  question2: number;
  answer2: string;
  question3: number;
  answer3: string;
}

export interface IKeyValuePair {
  key: number;
  value: string;
}
