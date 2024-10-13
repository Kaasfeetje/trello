import { api } from "~/trpc/react";

const useUpdateBoard = (boardId: string) => {
  const utils = api.useUtils();
  return api.board.update.useMutation({
    onMutate: async (board) => {
      //   Get all
      await utils.board.getAll.cancel();
      const previousBoards = utils.board.getAll.getData();
      utils.board.getAll.setData(undefined, (oldQueryData) =>
        oldQueryData
          ? oldQueryData.map((b) => {
              if (b.id == boardId) {
                return { ...b, ...board };
              }
              return b;
            })
          : [],
      );
      //   Get
      await utils.board.get.cancel(boardId);
      const previousBoard = utils.board.get.getData(boardId);
      utils.board.get.setData(boardId, (oldQueryData) => {
        return {
          ...oldQueryData,
          id: oldQueryData?.id || "temporary-id",
          title: board.title,
        };
      });

      return { previousBoards, previousBoard };
    },
    onError: (err, _newBoard, context) => {
      utils.board.getAll.setData(undefined, context?.previousBoards);
      utils.board.get.setData(boardId, context?.previousBoard);
    },
    onSettled: () => {
      void utils.board.getAll.invalidate();
      void utils.board.get.invalidate(boardId);
    },
  });
};

export default useUpdateBoard;
