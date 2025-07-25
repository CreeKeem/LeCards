export enum LearningStatus {
  NOT_LEARNED = "NOT_LEARNED",
  LEARNING = "LEARNING",
  MASTERED = "MASTERED",
}

export type UserCardInfoDto = {
  cardId: number;
  userId: number;
  favorite: boolean;
  learningStatus: LearningStatus;
  lastReviewed: Date;
};

export type CreateUserCardInfoDto = {
  cardId: number;
  userId: number;
  favorite?: boolean;
  learningStatus?: LearningStatus;
  lastReviewed?: Date;
};

export type UpdateUserCardInfoDto = {
  cardId: number;
  userId: number;
  favorite?: boolean;
  learningStatus?: LearningStatus;
  lastReviewed?: Date;
};
