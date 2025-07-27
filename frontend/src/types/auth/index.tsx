export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  email: string;
  fName: string;
  lName: string;
  password: string;
};

export type UserInfo = {
    userId: number,
    email: string,
    fName: string,
    lName: string
}