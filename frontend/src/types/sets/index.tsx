export type SetDto = {
  userId: number;
  setId: number;
  name: string;
  description: string;
  numCards: number;
  createdAt: Date
};

export type CreateSetDto = {
  userId: number;
  name: string;
  description?: string;
};

export type UpdateSetDto = {
  setId: number,
  name?: string;
  description?: string;
  numCards?: number;
};
