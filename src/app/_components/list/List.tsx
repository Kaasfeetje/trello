import React from "react";
import useDeleteList from "~/hooks/list/useDeleteList";
import { List as ListType } from "~/server/db/schema";
import { api } from "~/trpc/react";

type Props = {
  list: ListType;
  boardId: string;
};

const List = ({ list, boardId }: Props) => {
  const deleteListMutation = useDeleteList(boardId);
  const deleteList = async () => {
    await deleteListMutation.mutateAsync(list.id);
  };

  return (
    <div className="h-fit flex-shrink-0 bg-black px-2 text-gray-100">
      <div className="flex w-[272px] justify-between">
        <span>{list.title}</span>
        <button onClick={deleteList}>X</button>
      </div>
    </div>
  );
};

export default List;
