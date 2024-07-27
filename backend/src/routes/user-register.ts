import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const userRegister: FastifyPluginAsync = async (fastify) => {
  fastify.post('/users', {
    schema: {
      body: z.object({
        user_name: z.string(),
        user_email: z.string().email(),
        user_password: z.string(),
      }),
    },
  }, async (request, reply) => {
    const { user_name, user_email, user_password } = request.body as { user_name: string; user_email: string; user_password: string };

    try {
      // Verifica se o e-mail já está em uso
      const existingUser = await prisma.user.findUnique({
        where: { email: user_email },
      });

      if (existingUser) {
        reply.status(400).send({ message: 'Email already in use.' });
        return;
      }

      // Cria um novo usuário
      const newUser = await prisma.user.create({
        data: {
          name: user_name,
          email: user_email,
          password: user_password,
        },
      });

      reply.status(201).send(newUser);
    } catch (error) {
      reply.status(500).send({ message: 'Internal server error.' });
    }
  });
};
