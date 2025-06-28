export interface FlashcardInfo {
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
