"use client";

import { useState, useRef, useEffect } from "react";
import { Ellipsis, FlashcardDto, LearningStatus, UserCardInfoDto } from ".";
import { updateUserCardInfo } from "@/api/user-card-info";
import { updateFlashcard } from "@/api/flashcard";

export const Flashcard = ({
  flashcard,
  userCardDto,
  isEdit,
  handleDelete,
}: {
  flashcard: FlashcardDto;
  userCardDto: UserCardInfoDto;
  isEdit?: boolean;
  handleDelete: (id: number) => void;
}) => {
  const [favorite, setFavorite] = useState<boolean>(
    userCardDto?.favorite || false
  );
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(isEdit || false);
  const [term, setTerm] = useState<string>(flashcard.term);
  const [definition, setDefinition] = useState<string>(flashcard.definition);
  const [learningStatusBorder, setLearningStatusBorder] =
    useState<string>("border-white");

  const termRef = useRef<HTMLTextAreaElement>(null);
  const defRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (userCardDto?.learningStatus == LearningStatus.MASTERED) {
      setLearningStatusBorder("border-green-600");
    } else if (userCardDto?.learningStatus == LearningStatus.LEARNING) {
      setLearningStatusBorder("border-yellow-400");
    }
  }, [userCardDto]);

  const clickFavorite = async () => {
    const update = await updateUserCardInfo({
      cardId: flashcard.cardId,
      favorite: !favorite,
    });
    if (!update) return;
    setFavorite(!favorite);
  };

  const handleCancel = () => {
    setEdit(false);
    setTerm(flashcard.term);
    setDefinition(flashcard.definition);
  };

  const handleSave = async () => {
    const save = await updateFlashcard({
      cardId: flashcard.cardId,
      term: term,
      definition: definition,
    });
    if (!save) return;
    setEdit(false);
    // Update the flashcard object
    flashcard.term = term;
    flashcard.definition = definition;
  };

  const deleteCard = async () => {
    handleDelete(flashcard.cardId);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (termRef.current) {
      termRef.current.style.height = "auto";
      termRef.current.style.height = termRef.current.scrollHeight + "px";
    }
    setTerm(e.target.value);
  };

  const handleDefinitionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (defRef.current) {
      defRef.current.style.height = "auto";
      defRef.current.style.height = defRef.current.scrollHeight + "px";
    }
    setDefinition(e.target.value);
  };

  // ADD LEBRON VOICE OVER
  const playAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div
      className={`flex max-w-[1216px] w-full bg-white min-h-[200px] shadow-sm rounded-2xl border-2 ${learningStatusBorder}`}
    >
      {/* Term */}
      <div className="basis-[30%] p-4 flex items-center justify-center">
        {edit || isEdit ? (
          <textarea
            ref={termRef}
            value={term}
            onChange={handleTermChange}
            placeholder="Enter term"
            rows={1}
            className="w-full resize-none overflow-hidden rounded-md border border-gray-300 focus:outline-none p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
            }}
          />
        ) : (
          <p className="text-center">{term}</p>
        )}
      </div>

      {/* Separator */}
      <div className="w-px bg-[#37415124] self-stretch" />

      {/* Definition */}
      <div className="basis-[60%] p-4 flex items-center justify-center">
        {edit || isEdit ? (
          <textarea
            ref={defRef}
            value={definition}
            onChange={handleDefinitionChange}
            placeholder="Enter definition"
            rows={1}
            className="w-full resize-none overflow-hidden rounded-md border border-gray-300 focus:outline-none p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
            }}
          />
        ) : (
          <p className="text-center">{definition}</p>
        )}
      </div>

      {/* Separator */}
      <div className="w-px bg-[#37415124] self-stretch" />

      {/* Options */}
      <div className="basis-[10%] p-4 flex items-center justify-center flex-col gap-5">
        <img
          src={
            favorite
              ? "/flashcard/favoriteIcon.svg"
              : "/flashcard/nonFavoriteIcon.svg"
          }
          alt="Favorite Icon"
          className="cursor-pointer"
          onClick={clickFavorite}
        />

        {isEdit ? (
          <></>
        ) : edit ? (
          <div className="flex flex-col text-sm gap-5 mt-1">
            <button
              onClick={handleCancel}
              className="cursor-pointer rounded-2xl p-1 px-2 bg-laker-purple text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="cursor-pointer rounded-2xl p-1 px-2 bg-laker-gold text-laker-purple"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <img
              src={
                audioPlaying
                  ? "/flashcard/audioIconClicked.svg"
                  : "/flashcard/audioIcon.svg"
              }
              alt="Audio Icon"
              className="cursor-pointer -mb-2"
              onClick={playAudio}
            />
            <Ellipsis
              handleDelete={deleteCard}
              handleEdit={() => setEdit(!edit)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
