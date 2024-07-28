import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function getTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions",
    async () => {
      const transactions = await prisma.transaction.findMany();
      return transactions;
    }
  );
}
