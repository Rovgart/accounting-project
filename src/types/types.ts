export type LoginResponseT = {
  access_token: string;
  refresh_token: string;
};
export type LoginDataT = {
  email: string;
  password: string;
};
export type RegisterDataT = {
  email: string;
  password: string;
  nip: string;
  companyAddress: string;
  privacyPolicy: boolean;
};
export type UserT = {
  email: string;
  fullName: string;
  imageUrl: string;
};
