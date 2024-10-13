import { api } from "~/trpc/react";

const useCreateList = (board: { boardId: string }) => {
  const utils = api.useUtils();
  return api.list.create.useMutation({
    onMutate: async (list) => {
      // Optimistic update
      await utils.list.getAll.cancel(board);
      const previousLists = utils.list.getAll.getData(board);

      utils.list.getAll.setData(board, (oldQueryData) => [
        ...(oldQueryData ?? []),
        {
          id: "asdfadsf",
          title: list.title,
          boardId: board.boardId,
        },
      ]);
      return { previousLists };
    },
    onError: (err, _newList, context) => {
      utils.list.getAll.setData(board, context?.previousLists);
    },
    onSettled: () => {
      void utils.list.getAll.invalidate(board);
    },
  });
};

export default useCreateList;
