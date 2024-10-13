import React, { Suspense } from "react";
import Board from "~/app/_components/board/Board";
import { api, HydrateClient } from "~/trpc/server";

type Props = {
  params: { id: string };
};

const BoardPage = async ({ params }: Props) => {
  void (await api.board.get.prefetch(params.id));
  void (await api.list.getAll.prefetch({ boardId: params.id }));

  return (
    <HydrateClient>
      <main className="h-screen max-h-screen bg-purple-700 pt-[60px]">
        <Board boardId={params.id} />
      </main>
    </HydrateClient>
  );
};

export default BoardPage;
