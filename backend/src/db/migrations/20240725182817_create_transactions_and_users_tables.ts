import { Knex } from "knex";

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex: Knex): Promise<void> => {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("user_name").notNullable();
      table.string("user_email").notNullable().unique();
      table.string("user_password").notNullable();
    })
    .createTable("transactions", (table) => {
      table.increments("transaction_id");
      table.string("transaction_title").notNullable();
      table.timestamp("transaction_due_date").notNullable();
      table.string("transaction_description").notNullable();
      table.decimal("transaction_value", 14, 2).notNullable();
      table.boolean("transaction_debit").notNullable().defaultTo(true);
      table.boolean("transaction_deposit").notNullable().defaultTo(true);
    });
};

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex: Knex): Promise<void> => {
  await knex.schema
    .dropTableIfExists("transactions")
    .dropTableIfExists("users");
};
