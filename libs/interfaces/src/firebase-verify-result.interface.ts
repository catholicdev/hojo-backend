export interface IFirebaseVerifyResult {
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  phone_number: string;
  uid: string;
  hojoToken?: string;
  email?: string;
}
