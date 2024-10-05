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
      <main className="h-screen max-h-[calc(100vh-48px)]">
        <header className="h-[48px]">
          <h1>{board.title}</h1>
        </header>
        <Board board={board} />
      </main>
    </HydrateClient>
  );
};

export default BoardPage;
