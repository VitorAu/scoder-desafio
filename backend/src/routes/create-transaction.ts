import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient, Transaction } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateTransactionBody {
  title: string;
  value: string;
  due_date: string;
  description: string;
  is_debit: boolean;
  is_deposit: boolean;
}

export async function createTransaction(fastify: FastifyInstance) {
  fastify.post(
    "/transactions",
    async (
      request: FastifyRequest<{
        Body: CreateTransactionBody | CreateTransactionBody[];
      }>,
      reply: FastifyReply
    ) => {
      const body = request.body;

      const validateData = (data: CreateTransactionBody) => {
        return data.title && data.value && data.due_date;
      };

      const createNewTransaction = async (data: CreateTransactionBody) => {
        return await prisma.transaction.create({
          data: {
            title: data.title,
            value: data.value,
            due_date: new Date(data.due_date).toISOString(),
            description: data.description,
            is_debit: data.is_debit,
            is_deposit: data.is_deposit,
          },
        });
      };

      if (Array.isArray(body)) {
        const invalidTransactions = body.filter(
          (transaction) => !validateData(transaction)
        );
        if (invalidTransactions.length > 0) {
          return reply
            .status(400)
            .send({
              message:
                "Campos obrigatórios estão faltando em algumas transações",
            });
        }

        try {
          const newTransactions: Transaction[] = await Promise.all(
            body.map(createNewTransaction)
          );
          return reply.status(201).send(newTransactions);
        } catch (error) {
          console.error("Erro ao criar transações:", error);
          return reply
            .status(500)
            .send({ message: "Erro ao criar transações" });
        }
      } else {
        if (!validateData(body)) {
          return reply
            .status(400)
            .send({ message: "Campos obrigatórios estão faltando" });
        }

        try {
          const newTransaction: Transaction = await createNewTransaction(body);
          return reply.status(201).send(newTransaction);
        } catch (error) {
          console.error("Erro ao criar transação:", error);
          return reply.status(500).send({ message: "Erro ao criar transação" });
        }
      }
    }
  );
}
