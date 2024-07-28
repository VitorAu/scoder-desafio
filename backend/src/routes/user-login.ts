import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const userLogin: FastifyPluginAsync = async (fastify) => {
  fastify.post('/users/login', {
    schema: {
      body: z.object({
        user_email: z.string().email(),
        user_password: z.string(),
      }),
    },
  }, async (request, reply) => {
    const { user_email, user_password } = request.body as { user_email: string; user_password: string };

    try {
      const user = await prisma.user.findUnique({
        where: { email: user_email },
      });

      if (!user) {
        reply.status(401).send({ message: 'Invalid email or password.' });
        return;
      }

      if (user.password !== user_password) {
        reply.status(401).send({ message: 'Invalid email or password.' });
        return;
      }

      reply.status(200).send({ message: 'Login successful!' });
    } catch (error) {
      reply.status(500).send({ message: 'Internal server error.' });
    }
  });
};
