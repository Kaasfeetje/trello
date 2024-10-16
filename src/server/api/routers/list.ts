import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { lists } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const listRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ boardId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.lists.findMany({
        where: (list, { eq }) => eq(list.boardId, input.boardId),
      });
    }),
  create: publicProcedure
    .input(z.object({ title: z.string().min(1), boardId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(lists)
        .values({ title: input.title, boardId: input.boardId });
    }),
  update: publicProcedure
    .input(z.object({ id: z.string().min(1), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(lists)
        .set({ title: input.title })
        .where(eq(lists.id, input.id));
    }),
  delete: publicProcedure
    .input(z.object({ listId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(lists).where(eq(lists.id, input.listId));
    }),
});
