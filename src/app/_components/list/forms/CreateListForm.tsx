"use client";
import React, { useState } from "react";
import useCreateList from "~/hooks/list/useCreateList";
import { Board } from "~/server/db/schema";
import { api } from "~/trpc/react";

type Props = {
  board: Board;
};

const CreateListForm = ({ board }: Props) => {
  const createListMutation = useCreateList({ boardId: board.id });

  const [title, setTitle] = useState("");

  const onCreateList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createListMutation.mutateAsync({ title, boardId: board.id });
  };

  return (
    <form onSubmit={onCreateList}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter list title..."
      />
      <button>Add list</button>
    </form>
  );
};

export default CreateListForm;
