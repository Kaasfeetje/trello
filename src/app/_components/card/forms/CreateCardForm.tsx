import React, { useState } from "react";
import useCreateCard from "~/hooks/card/useCreateCard";
import { api } from "~/trpc/react";

type Props = {
  boardId: string;
  listId: string;
};

const CreateCardForm = ({ boardId, listId }: Props) => {
  const createCardMutation = useCreateCard();
  const [title, setTitle] = useState("");

  const createCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCardMutation.mutateAsync({ title, boardId, listId });
  };

  return (
    <form onSubmit={createCard}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-800"
        type="text"
        placeholder="Enter a title for this card..."
      />
      <button type="submit">Add card</button>
    </form>
  );
};

export default CreateCardForm;
