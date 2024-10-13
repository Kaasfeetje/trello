import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { boards } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const boardRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(boards);
  }),
  get: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.boards.findFirst({
        where: (board, { eq }) => eq(board.id, input),
      });
    }),
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(boards).values({
        title: input.title,
      });
    }),
  update: publicProcedure
    .input(z.object({ id: z.string().min(1), title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(boards)
        .set({ title: input.title })
        .where(eq(boards.id, input.id));
    }),
  delete: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(boards).where(eq(boards.id, input));
    }),
});
