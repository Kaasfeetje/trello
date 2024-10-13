"use client";
import React from "react";
import { Board } from "~/server/db/schema";
import UpdatableTitle from "../../common/forms/UpdatableTitle";
import useUpdateBoard from "~/hooks/board/useUpdateBoard";

type Props = {
  board: Board;
};

const BoardTitle = ({ board }: Props) => {
  const updateBoardMutation = useUpdateBoard(board.id);

  const onUpdate = (title: string) => {
    updateBoardMutation.mutateAsync({ ...board, id: board.id, title });
  };

  return (
    <UpdatableTitle title={board.title} onSubmit={onUpdate}>
      <h1 className="px-3 font-bold text-white">{board.title}</h1>
    </UpdatableTitle>
  );
};

export default BoardTitle;
