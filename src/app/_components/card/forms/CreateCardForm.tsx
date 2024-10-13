import React, { useState } from "react";
import useCreateCard from "~/hooks/card/useCreateCard";
import { api } from "~/trpc/react";
import ClickableForm from "../../common/forms/ClickableForm";

type Props = {
  boardId: string;
  listId: string;
};

const CreateCardForm = ({ boardId, listId }: Props) => {
  const createCardMutation = useCreateCard();

  const createCard = async (title: string) => {
    await createCardMutation.mutateAsync({ title, boardId, listId });
  };

  return (
    <ClickableForm
      title="card"
      className="px-[3px] pt-[3px]"
      openElement={
        <div className="flex w-full justify-between pt-2">
          <button className="w-full rounded-lg py-1.5 pl-2 pr-3 text-left transition-all duration-200 hover:bg-white hover:bg-opacity-20">
            Add a card
          </button>
          <button
            type="button"
            className="ml-1.5 flex h-4 w-4 items-center justify-center p-4"
          >
            T
          </button>
        </div>
      }
      onSubmit={createCard}
    />
  );
};

export default CreateCardForm;
