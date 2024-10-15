import { api } from "~/trpc/react";

const useUpdateList = (boardId: string) => {
  const utils = api.useUtils();
  return api.list.update.useMutation({
    onMutate: async (list) => {
      //   Get all
      await utils.list.getAll.cancel({ boardId });
      const previousLists = utils.list.getAll.getData({ boardId });
      utils.list.getAll.setData({ boardId }, (oldQueryData) =>
        oldQueryData
          ? oldQueryData.map((l) => {
              if (l.id == list.id) {
                return { ...l, ...list };
              }
              return l;
            })
          : [],
      );

      return { previousLists };
    },
    onError: (err, _newList, context) => {
      utils.list.getAll.setData({ boardId }, context?.previousLists);
    },
    onSettled: () => {
      void utils.list.getAll.invalidate({ boardId });
    },
  });
};

export default useUpdateList;
