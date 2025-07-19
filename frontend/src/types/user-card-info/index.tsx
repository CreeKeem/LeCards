export enum LearningStatus {
  NOT_LEARNED = "NOT_LEARNED",
  LEARNING = "LEARNING",
  MASTERED = "MASTERED",
}

export type UserCardInfo = {
  cardId: number;
  userId: number;
  favorite?: boolean;
  learningStatus?: LearningStatus;
};
