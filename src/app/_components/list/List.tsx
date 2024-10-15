"use client";
import React from "react";
import useDeleteList from "~/hooks/list/useDeleteList";
import { List as ListType } from "~/server/db/schema";
import CreateCardForm from "../card/forms/CreateCardForm";
import { api } from "~/trpc/react";
import Card from "../card/Card";
import ListContainer from "./ListContainer";
import ListTitle from "./ListTitle";

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
    <ListContainer padding>
      <div className="flex justify-between px-3 py-1.5">
        {/* <span className="font-bold">{list.title}</span> */}
        <ListTitle list={list} />
        <button onClick={deleteList}>X</button>
      </div>
      <div className="flex w-full flex-col gap-2">
        <>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </>
        <CreateCardForm boardId={boardId} listId={list.id} />
      </div>
    </ListContainer>
  );
};

export default List;
