"use client";

import { useState, useRef } from "react";
import { FlashcardInfo, UserCardInfo } from "./flashcard-info";
import { Ellipsis } from "./ellipis";

export const Flashcard = ({
  flashcard,
  userCardInfo,
  isEdit,
}: {
  flashcard: FlashcardInfo;
  userCardInfo?: UserCardInfo;
  isEdit?: boolean;
}) => {
  const [favorite, setFavorite] = useState<boolean>(
    userCardInfo?.favorite || false
  );
  const [edit, setEdit] = useState<boolean>(isEdit || false);
  const [term, setTerm] = useState<string>(flashcard.term);
  const [definition, setDefinition] = useState<string>(flashcard.definition);

  const termRef = useRef<HTMLTextAreaElement>(null);
  const defRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const clickFavorite = () => {
    setFavorite(!favorite);
  };

  const handleCancel = () => {
    setEdit(false);
    setTerm(flashcard.term)
    setDefinition(flashcard.definition)
  };

  const handleSave = () => {
    
  }

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

  return (
    <div className="flex max-w-[1216px] w-full bg-white min-h-[200px] shadow-sm rounded-2xl">
      {/* Term */}
      <div className="basis-[30%] p-4 flex items-center justify-center">
        {edit ? (
          <textarea
            ref={termRef}
            value={term}
            onChange={handleTermChange}
            placeholder="Enter term"
            rows={1}
            className="w-full resize-none overflow-hidden rounded-md border border-gray-300 focus:outline-none p-2"
          />
        ) : (
          <p className="text-center">{term}</p>
        )}
      </div>

      {/* Separator */}
      <div className="w-px bg-[#37415124] self-stretch" />

      {/* Definition */}
      <div className="basis-[60%] p-4 flex items-center justify-center">
        {edit ? (
          <textarea
            ref={defRef}
            value={definition}
            onChange={handleDefinitionChange}
            placeholder="Enter definition"
            rows={1}
            className="w-full resize-none overflow-hidden rounded-md border border-gray-300 focus:outline-none p-2"
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
          src={favorite ? "/favoriteIcon.svg" : "/nonFavoriteIcon.svg"}
          alt="Favorite Icon"
          className="cursor-pointer"
          onClick={clickFavorite}
        />
        <img
          src="/audioIcon.svg"
          alt="Audio Icon"
          className="cursor-pointer -mb-2"
        />
        {edit ? (
          <div className="flex flex-col text-sm gap-2 mt-1">
            <button onClick={handleCancel} className="cursor-pointer  rounded-2xl p-1 px-2 bg-laker-purple text-white">Cancel</button>
            <button className="cursor-pointer  rounded-2xl p-1 px-2 bg-laker-gold text-laker-purple">Save</button>
          </div>
        ) : (
          <Ellipsis handleDelete={() => {}} handleEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};
