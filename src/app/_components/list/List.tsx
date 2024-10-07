"use client";
import React from "react";
import useDeleteList from "~/hooks/list/useDeleteList";
import { List as ListType } from "~/server/db/schema";
import CreateCardForm from "../card/forms/CreateCardForm";
import { api } from "~/trpc/react";
import Card from "../card/Card";

type Props = {
  list: ListType;
  boardId: string;
};

const List = ({ list, boardId }: Props) => {
  const deleteListMutation = useDeleteList({ boardId });
  const [cards, cardsQuery] = api.card.getAll.useSuspenseQuery({
    listId: list.id,
  });

  const deleteList = async () => {
    await deleteListMutation.mutateAsync({ listId: list.id });
  };

  return (
    <div className="h-fit w-[272px] flex-shrink-0 rounded-xl bg-black px-2 py-2 text-gray-300">
      <div className="flex justify-between px-3 py-1.5">
        <span className="font-bold">{list.title}</span>
        <button onClick={deleteList}>X</button>
      </div>
      <div className="flex flex-col gap-2">
        <>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </>
        <CreateCardForm boardId={boardId} listId={list.id} />
      </div>
    </div>
  );
};

export default List;
