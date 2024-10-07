import { cards } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const cardRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ listId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.cards.findMany({
        where: (card, { eq }) => eq(card.listId, input.listId),
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        boardId: z.string().min(1),
        listId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(cards).values(input);
    }),
  // Update
  delete: publicProcedure
    .input(z.object({ cardId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(cards).where(eq(cards.id, input.cardId));
    }),
});
