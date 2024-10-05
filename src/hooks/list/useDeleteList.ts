import { api } from "~/trpc/react";

const useDeleteList = (board: { boardId: string }) => {
  const utils = api.useUtils();
  return api.list.delete.useMutation({
    onMutate: async (list: { listId: string }) => {
      // Optimistic update
      await utils.list.getAll.cancel();
      const previousLists = utils.list.getAll.getData();

      utils.list.getAll.setData(board, (oldQueryData) =>
        oldQueryData ? oldQueryData.filter((l) => l.id !== list.listId) : [],
      );
      return { previousLists };
    },
    onError: (err, _newTodo, context) => {
      utils.list.getAll.setData(board, context?.previousLists);
    },
    onSettled: () => {
      void utils.list.getAll.invalidate();
    },
  });
};

export default useDeleteList;
