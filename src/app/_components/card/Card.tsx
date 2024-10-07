import React from "react";
import useDeleteCard from "~/hooks/card/useDeleteCard";
import { Card as CardType } from "~/server/db/schema";

type Props = {
  card: CardType;
};

const Card = ({ card }: Props) => {
  const deleteCardMutation = useDeleteCard({ listId: card.listId });
  const deleteCard = async () => {
    await deleteCardMutation.mutateAsync({ cardId: card.id });
  };

  return (
    <div className="flex w-full cursor-pointer justify-between rounded-lg border-2 border-gray-800 bg-gray-800 px-3 py-2 hover:border-white">
      <span>{card.title}</span>
      <button onClick={deleteCard}>x</button>
    </div>
  );
};

export default Card;
