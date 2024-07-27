import knex, { Knex } from "knex";
import config from "../knexfile";

const environment: string = process.env.NODE_ENV || "development";
const knexConfig: Knex.Config = config[environment];

export default knex(knexConfig);
