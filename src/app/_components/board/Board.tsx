"use client";
import React from "react";
import CreateListForm from "../list/forms/CreateListForm";
import { Board as BoardType } from "~/server/db/schema";
import { api } from "~/trpc/react";
import List from "../list/List";

type Props = {
  board: BoardType;
};

const Board = ({ board }: Props) => {
  const [lists, listsQuery] = api.list.getAll.useSuspenseQuery({
    boardId: board.id,
  });

  return (
    <div className="flex h-full gap-2 overflow-x-auto px-2">
      <>
        {lists.map((list) => (
          <List key={list.id} list={list} boardId={board.id} />
        ))}
      </>
      <CreateListForm board={board} />
    </div>
  );
};

export default Board;
