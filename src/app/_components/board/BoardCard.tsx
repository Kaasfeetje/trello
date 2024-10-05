import Link from "next/link";
import React from "react";
import useDeleteBoard from "~/hooks/board/useDeleteBoard";
import { Board } from "~/server/db/schema";
import { api } from "~/trpc/react";

type Props = {
  board: Board;
};

const BoardCard = ({ board }: Props) => {
  const utils = api.useUtils();
  const deleteBoardMutation = useDeleteBoard();

  const onDelete = async () => {
    await deleteBoardMutation.mutateAsync(board.id);
  };

  return (
    <div className="flex gap-2">
      <h3>
        <Link href={`/b/${board.id}`}>{board.title}</Link>
      </h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default BoardCard;
