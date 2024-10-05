"use client";
import React from "react";
import BoardForm from "./BoardForm";
import { api } from "~/trpc/react";
import useCreateBoard from "~/hooks/board/useCreateBoard";

type Props = {};

const CreateBoardForm = (props: Props) => {
  const createBoardMutation = useCreateBoard();
  const createBoard = async (title: string) => {
    await createBoardMutation.mutateAsync({ title });
  };
  return <BoardForm onSubmit={createBoard} />;
};

export default CreateBoardForm;
