import { LearningStatus, type FlashcardDto, type UserCardInfoDto } from ".";

export const exampleFlashCard: FlashcardDto = {
  cardId: 1,
  setId: 1,
  term: "Who is the greatest basketball player ever?",
  definition: "Lebron Raymone James",
  contentDefinition: "./Lebron.svg",
};

export const ExampleUserCardInfo: UserCardInfoDto = {
  cardId: 1,
  userId: 1,
  favorite: false,
  learningStatus: LearningStatus.NOT_LEARNED,
  lastReviewed: new Date(),
};

export const exampleFlashCards: FlashcardDto[] = [
  {
    cardId: 1,
    setId: 2,
    term: "Who is the greatest basketball player ever?",
    definition: "Lebron Raymone James",
    contentDefinition: "./Lebron.svg",
  },
  {
    cardId: 2,
    setId: 2,
    term: "Who is the greatest basketball player ever?",
    definition: "Lebron Raymone James",
    contentDefinition: "./Lebron.svg",
  },
  {
    cardId: 3,
    setId: 2,
    term: "Who is the greatest basketball player ever?",
    definition: "Lebron Raymone James",
    contentDefinition: "./Lebron.svg",
  },
  {
    cardId: 4,
    setId: 2,
    term: "Who is the greatest basketball player ever?",
    definition: "Lebron Raymone James",
    contentDefinition: "./Lebron.svg",
  },
  {
    cardId: 5,
    setId: 2,
    term: "Who is the greatest basketball player ever?",
    definition: "Lebron Raymone James",
    contentDefinition: "./Lebron.svg",
  },
  {
    cardId: 6,
    setId: 2,
    term: "Who is the greatest basketball player ever?",
    definition: "Lebron Raymone James",
    contentDefinition: "./Lebron.svg",
  },
];

export const ExampleUserCardInfos: UserCardInfoDto[] = [
  {
    cardId: 1,
    userId: 1,
    favorite: false,
    learningStatus: LearningStatus.MASTERED,
    lastReviewed: new Date(),
  },
  {
    cardId: 2,
    userId: 1,
    favorite: false,
    learningStatus: LearningStatus.LEARNING,
    lastReviewed: new Date(),
  },
  {
    cardId: 3,
    userId: 1,
    favorite: false,
    learningStatus: LearningStatus.NOT_LEARNED,
    lastReviewed: new Date(),
  },
  {
    cardId: 4,
    userId: 1,
    favorite: false,
    learningStatus: LearningStatus.NOT_LEARNED,
    lastReviewed: new Date(),
  },
  {
    cardId: 5,
    userId: 1,
    favorite: false,
    learningStatus: LearningStatus.NOT_LEARNED,
    lastReviewed: new Date(),
  },
  {
    cardId: 6,
    userId: 1,
    favorite: false,
    learningStatus: LearningStatus.NOT_LEARNED,
    lastReviewed: new Date(),
  },
];
