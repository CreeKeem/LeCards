import { exampleFlashCards, FlashcardInfo} from '@/components/flashcard'

export const fetchFlashcards = async (): Promise<FlashcardInfo[]> => {
    return exampleFlashCards
};
