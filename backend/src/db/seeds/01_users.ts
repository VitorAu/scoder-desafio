import { Knex } from 'knex';

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      user_name: 'Vitor Augusto',
      user_email: 'vitoraugusto@teste.com',
      user_password: 'teste',
    },
    {
      user_name: 'Keli Cristina',
      user_email: 'kali@teste.com',
      user_password: 'teste',
    },
    {
      user_name: 'Teste Teste',
      user_email: 'teste@teste.com',
      user_password: 'teste',
    },
  ]);
};
