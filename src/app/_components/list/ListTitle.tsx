"use client";
import React from "react";
import { Board, List } from "~/server/db/schema";
import useUpdateBoard from "~/hooks/board/useUpdateBoard";
import UpdatableTitle from "../common/forms/UpdatableTitle";
import useUpdateList from "~/hooks/list/useUpdateList";

type Props = {
  list: List;
};

const ListTitle = ({ list }: Props) => {
  const updateListMutation = useUpdateList(list.boardId);

  const onUpdate = (title: string) => {
    updateListMutation.mutateAsync({ ...list, id: list.id, title });
  };

  return (
    <UpdatableTitle title={list.title} onSubmit={onUpdate}>
      <h1 className="font-bold text-white">{list.title}</h1>
    </UpdatableTitle>
  );
};

export default ListTitle;
