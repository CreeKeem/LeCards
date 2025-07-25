export type FlashcardDto = {
  cardId: number;
  setId: number;
  term: string;
  definition: string;
  contentDefinition?: string;
  audioDefinition?: string;
  contentTerm?: string;
  audioTerm?: string;
};

export type CreateFlashcardDto = {
  set_id: number;
  term: string;
  definition: string;
  contentDefinition?: string;
  audioDefinition?: string;
  contentTerm?: string;
  audioTerm?: string;
};

export type UpdateFlashcardDto = {
  cardId: number;
  term?: string;
  definition?: string;
  contentDefinition?: string;
  audioDefinition?: string;
  contentTerm?: string;
  audioTerm?: string;
};
