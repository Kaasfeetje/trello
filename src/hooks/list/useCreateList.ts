import { api } from "~/trpc/react";

const useCreateList = (boardId: string) => {
  const utils = api.useUtils();
  return api.list.create.useMutation({
    onMutate: async (list) => {
      // Optimistic update
      await utils.list.getAll.cancel();
      const previousLists = utils.list.getAll.getData();

      utils.list.getAll.setData(boardId, (oldQueryData) => [
        ...(oldQueryData ?? []),
        {
          id: "asdfadsf",
          title: list.title,
          boardId: boardId,
        },
      ]);
      return { previousBoards: previousLists };
    },
    onError: (err, _newTodo, context) => {
      utils.list.getAll.setData(boardId, context?.previousBoards);
    },
    onSettled: () => {
      void utils.list.getAll.invalidate(boardId);
    },
  });
};

export default useCreateList;
