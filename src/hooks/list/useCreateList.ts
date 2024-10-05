import { api } from "~/trpc/react";

const useCreateList = (board: { boardId: string }) => {
  const utils = api.useUtils();
  return api.list.create.useMutation({
    onMutate: async (list) => {
      // Optimistic update
      await utils.list.getAll.cancel();
      const previousLists = utils.list.getAll.getData();

      utils.list.getAll.setData(board, (oldQueryData) => [
        ...(oldQueryData ?? []),
        {
          id: "asdfadsf",
          title: list.title,
          boardId: board.boardId,
        },
      ]);
      return { previousBoards: previousLists };
    },
    onError: (err, _newTodo, context) => {
      utils.list.getAll.setData(board, context?.previousBoards);
    },
    onSettled: () => {
      void utils.list.getAll.invalidate(board);
    },
  });
};

export default useCreateList;
