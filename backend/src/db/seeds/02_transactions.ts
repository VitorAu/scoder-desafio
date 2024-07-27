import { Knex } from 'knex';

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex('transactions').del();

  // Inserts seed entries
  await knex('transactions').insert([
    {
      transaction_title: 'Netflix',
      transaction_due_date: new Date('2024-07-25T12:00:00Z'),
      transaction_description: 'conta a pagar',
      transaction_value: 123.23,
      transaction_debit: true,
      transaction_deposit: true,
    },
    {
      transaction_title: 'Spotify',
      transaction_due_date: new Date('2024-07-25T12:00:00Z'),
      transaction_description: 'conta a pagar',
      transaction_value: 123.23,
      transaction_debit: true,
      transaction_deposit: true,
    },
    {
      transaction_title: 'Cantina',
      transaction_due_date: new Date('2024-07-25T12:00:00Z'),
      transaction_description: 'conta a pagar',
      transaction_value: 123.23,
      transaction_debit: true,
      transaction_deposit: true,
    },
  ]);
};
