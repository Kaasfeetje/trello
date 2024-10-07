import React from "react";
import Board from "~/app/_components/board/Board";
import { api, HydrateClient } from "~/trpc/server";

type Props = {
  params: { id: string };
};

const BoardPage = async ({ params }: Props) => {
  const board = await api.board.get(params.id);
  if (!board) {
    return <div>Bro youre in the wrong place buddy</div>;
  }
  return (
    <HydrateClient>
      <main className="h-screen max-h-screen bg-purple-700 pt-[60px]">
        <header className="absolute left-0 top-0 mb-3 flex h-[48px] w-full items-center bg-black bg-opacity-20 px-4">
          <h1 className="px-3 font-bold text-white">{board.title}</h1>
        </header>
        <Board board={board} />
      </main>
    </HydrateClient>
  );
};

export default BoardPage;
