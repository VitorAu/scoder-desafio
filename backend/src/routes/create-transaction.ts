import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/transactions",
    {
      schema: {
        body: z.object({
          title: z.string().min(3),
          value: z.string().min(1),
          due_date: z.coerce.date(),
          description: z.string().optional(),
          is_debit: z.boolean().optional(),
          is_deposit: z.boolean().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { title, value, due_date, description, is_debit, is_deposit } =
        request.body;

      try {
        const transaction = await prisma.transaction.create({
          data: {
            title,
            value,
            due_date,
            description: description || "",
            is_debit: is_debit !== undefined ? is_debit : true,
            is_deposit: is_deposit !== undefined ? is_deposit : true,
          },
        });

        return { transactionId: transaction.id };
      } catch (error) {
        console.error("Erro ao criar transação:", error);
        return reply.status(500).send({ error: "Erro interno do servidor." });
      }
    }
  );
}
