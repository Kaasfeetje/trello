"use client";
import React, { useState } from "react";
import useCreateList from "~/hooks/list/useCreateList";
import { Board } from "~/server/db/schema";
import { api } from "~/trpc/react";
import ClickableForm from "../../common/forms/ClickableForm";
import ListContainer from "../ListContainer";

type Props = {
  board: Board;
};

const CreateListForm = ({ board }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const createListMutation = useCreateList({ boardId: board.id });

  const createList = async (title: string) => {
    await createListMutation.mutateAsync({ title, boardId: board.id });
  };

  return (
    <ListContainer background={false}>
      <ClickableForm
        controlledIsOpen={isOpen}
        setControlledIsOpen={setIsOpen}
        title="card"
        className={isOpen ? `bg-black px-2 py-2` : ""}
        openElement={
          <button className="flex w-full bg-white bg-opacity-25 p-3 font-bold text-white hover:bg-opacity-20">
            <span className="mr-2">+</span> Add a list
          </button>
        }
        onSubmit={createList}
      />
    </ListContainer>
  );
};

export default CreateListForm;
