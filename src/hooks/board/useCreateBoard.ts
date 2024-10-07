import { api } from "~/trpc/react";

const useCreateBoard = () => {
  const utils = api.useUtils();
  return api.board.create.useMutation({
    onMutate: async (board) => {
      // Optimistic update
      await utils.board.getAll.cancel();
      const previousBoards = utils.board.getAll.getData();

      utils.board.getAll.setData(undefined, (oldQueryData) => [
        ...(oldQueryData ?? []),
        {
          id: "asdfadsf",
          title: board.title,
        },
      ]);
      return { previousBoards };
    },
    onError: (err, _newBoard, context) => {
      utils.board.getAll.setData(undefined, context?.previousBoards);
    },
    onSettled: () => {
      void utils.board.getAll.invalidate();
    },
  });
};

export default useCreateBoard;
