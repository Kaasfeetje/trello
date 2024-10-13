"use client";
import React from "react";
import CreateListForm from "../list/forms/CreateListForm";
import { Board as BoardType } from "~/server/db/schema";
import { api } from "~/trpc/react";
import List from "../list/List";
import BoardTitle from "./forms/BoardTitle";

type Props = {
  boardId: string;
};

const Board = ({ boardId }: Props) => {
  const { data: board } = api.board.get.useQuery(boardId);
  const { data: lists } = api.list.getAll.useQuery({
    boardId,
  });

  if (!board || !lists) {
    return <div>Wrong place</div>;
  }

  return (
    <div>
      <header className="absolute left-0 top-0 mb-3 flex h-[48px] w-full items-center bg-black bg-opacity-20 px-4">
        <BoardTitle board={board} />
      </header>

      <div className="flex h-full gap-2 overflow-x-auto px-2">
        <>
          {lists.map((list) => (
            <List key={list.id} list={list} boardId={board.id} />
          ))}
        </>
        <CreateListForm board={board} />
      </div>
    </div>
  );
};

export default Board;
