import { SetDto, UserSetInfoDto } from ".";

export const ExampleSet: SetDto = {
  setId: 1,
  userId: 1,
  name: "Example Set",
  description: "This is an example set",
  numCards: 10,
  createdAt: new Date("12-30-1984"),
};

export const ExampleUserSetInfo: UserSetInfoDto = {
  setId: 1,
  userId: 1,
  color: "#FDB927",
  lastAccess: new Date(),
  cardsLearned: 10,
};

export const ExampleSets: SetDto[] = [
  {
    setId: 1,
    userId: 1,
    name: "Example Set",
    description: "This is an example set",
    numCards: 10,
    createdAt: new Date("12-30-1984"),
  },
  {
    setId: 2,
    userId: 1,
    name: "Example Set",
    description: "This is an example set",
    numCards: 10,
    createdAt: new Date("12-30-1984"),
  },
  {
    setId: 3,
    userId: 1,
    name: "Example Set",
    description: "This is an example set",
    numCards: 10,
    createdAt: new Date("12-30-1984"),
  },
  {
    setId: 4,
    userId: 1,
    name: "Example Set",
    description: "This is an example set",
    numCards: 10,
    createdAt: new Date("12-30-1984"),
  },
  {
    setId: 5,
    userId: 1,
    name: "Example Set",
    description: "This is an example set",
    numCards: 10,
    createdAt: new Date("12-30-1984"),
  },
];

export const ExampleUserSetInfos: UserSetInfoDto[] = [
  {
    setId: 1,
    userId: 1,
    color: "#FDB927",
    lastAccess: new Date(),
    cardsLearned: 10,
  },
  {
    setId: 2,
    userId: 1,
    color: "#FDB927",
    lastAccess: new Date(),
    cardsLearned: 10,
  },
  {
    setId: 3,
    userId: 1,
    color: "#FDB927",
    lastAccess: new Date(),
    cardsLearned: 10,
  },
  {
    setId: 4,
    userId: 1,
    color: "#FDB927",
    lastAccess: new Date(),
    cardsLearned: 10,
  },
  {
    setId: 5,
    userId: 1,
    color: "#FDB927",
    lastAccess: new Date(),
    cardsLearned: 10,
  },
];
