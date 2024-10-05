import { api } from "~/trpc/react";

const useDeleteList = (boardId: string) => {
  const utils = api.useUtils();
  return api.list.delete.useMutation({
    onMutate: async (listId: string) => {
      // Optimistic update
      await utils.list.getAll.cancel();
      const previousLists = utils.list.getAll.getData();

      utils.list.getAll.setData(boardId, (oldQueryData) =>
        oldQueryData ? oldQueryData.filter((l) => l.id !== listId) : [],
      );
      return { previousLists };
    },
    onError: (err, _newTodo, context) => {
      utils.list.getAll.setData(boardId, context?.previousLists);
    },
    onSettled: () => {
      void utils.list.getAll.invalidate();
    },
  });
};

export default useDeleteList;
