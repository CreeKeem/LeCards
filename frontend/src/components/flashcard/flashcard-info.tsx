export type FlashcardInfo = {
  card_id: number;
  set_id: number;
  term: string;
  definition: string;
  imageDef?: string;
  videoDef?: string;
  audioDef?: string;
  imageTerm?: string;
  videoTerm?: string;
  audioTerm?: string;
}

enum LearningStatus {"NOT_LEARNED", "LEARNING", "MASTERED"}

export type UserCardInfo = {
  cardId: number;
  userId: number;
  favorite: boolean;
  learningStatus: LearningStatus
}