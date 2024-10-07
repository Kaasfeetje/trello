import { api } from "~/trpc/react";

const useDeleteBoard = () => {
  const utils = api.useUtils();
  return api.board.delete.useMutation({
    onMutate: async (boardId: string) => {
      // Optimistic update
      await utils.board.getAll.cancel();
      const previousBoards = utils.board.getAll.getData();

      utils.board.getAll.setData(undefined, (oldQueryData) =>
        oldQueryData ? oldQueryData.filter((b) => b.id !== boardId) : [],
      );
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

export default useDeleteBoard;
