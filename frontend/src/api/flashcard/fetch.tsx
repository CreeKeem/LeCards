import { exampleFlashCards, FlashcardInfo} from '@/components/flashcard'

export const fetchCards = async (): Promise<FlashcardInfo[]> => {
    return exampleFlashCards
};
