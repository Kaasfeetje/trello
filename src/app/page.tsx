import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import CreateBoardForm from "./_components/board/forms/CreateBoardForm";
import BoardCard from "./_components/board/BoardCard";
import BoardList from "./_components/board/BoardList";
import { Suspense } from "react";

export default async function Home() {
  // const session = await getServerAuthSession();
  void (await api.board.getAll.prefetch());

  return (
    <HydrateClient>
      <main>
        <CreateBoardForm />
        <Suspense fallback={<div>Loading...</div>}>
          <BoardList />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
