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
    <div className="h-fit flex-shrink-0 bg-black px-2 text-gray-100">
      <div className="flex w-[272px] justify-between">
        <span>{list.title}</span>
        <button onClick={deleteList}>X</button>
      </div>
      <div>
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
