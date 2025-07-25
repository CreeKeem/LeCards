export type UserSetInfoDto = {
  setId: number;
  userId: number;
  color: string;
  lastAccess: Date;
  cardsLearned: number
};

export type CreateUserSetInfoDto = {
  setId: number;
  userId: number;
  color?: string;
  lastAccess?: Date;
  cardsLearned?: number
};

export type UpdateUserSetInfoDto = {
  setId: number;
  userId: number;
  color?: string;
  lastAccess?: Date;
  cardsLearned?: number
};
