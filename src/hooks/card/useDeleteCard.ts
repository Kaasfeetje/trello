import { api } from "~/trpc/react";

const useDeleteCard = (list: { listId: string }) => {
  const utils = api.useUtils();
  return api.card.delete.useMutation({
    onMutate: async (card) => {
      //   // Optimistic update
      await utils.card.getAll.cancel(list);
      const previousCards = utils.card.getAll.getData(list);
      utils.card.getAll.setData(list, (oldQueryData) =>
        oldQueryData ? oldQueryData.filter((c) => c.id !== card.cardId) : [],
      );
      return { previousCards };
    },
    onError: (err, _newList, context) => {
      utils.card.getAll.setData(list, context?.previousCards);
    },
    onSettled: () => {
      void utils.card.getAll.invalidate(list);
    },
  });
};

export default useDeleteCard;
