import { api } from "~/trpc/react";

const useCreateCard = () => {
  const utils = api.useUtils();
  return api.card.create.useMutation({
    onMutate: async (card) => {
      // Optimistic update
      await utils.card.getAll.cancel();
      const previousCards = utils.card.getAll.getData();

      utils.card.getAll.setData({ listId: card.listId }, (oldQueryData) => [
        ...(oldQueryData ?? []),
        {
          id: "asdfadsf",
          title: card.title,
          boardId: card.boardId,
          listId: card.listId,
        },
      ]);
      return { previousCards };
    },
    onError: (err, _newCard, context) => {
      utils.card.getAll.setData(
        { listId: _newCard.listId },
        context?.previousCards,
      );
    },
    onSettled: () => {
      void utils.card.getAll.invalidate();
    },
  });
};

export default useCreateCard;
