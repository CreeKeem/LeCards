import { FlashcardInfo } from "./flashcard-info"

export interface Flashcard {
    flashcardInfo: FlashcardInfo,
    height: number,
    width: number,
    termFont: number,
    defFont: number,
}

export const Flashcard: React.FC<Flashcard>  = ({flashcardInfo, height, width, termFont, defFont}) => {
    
    return (
        <div>
            <div>
                
            </div>
        </div>
    )
}