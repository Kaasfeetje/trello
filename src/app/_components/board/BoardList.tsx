"use client";
import React from "react";
import { api } from "~/trpc/react";
import BoardCard from "./BoardCard";

type Props = {};

const BoardList = (props: Props) => {
  const [boards, boardsQuery] = api.board.getAll.useSuspenseQuery();

  return (
    <div>
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardList;
