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
  userId: number;
  email: string;
  fName: string;
  lName: string;
  createdAt?: Date;
  cardStudied?: number;
  correct?: number;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
