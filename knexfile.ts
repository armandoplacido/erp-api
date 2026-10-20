import type { Knex } from 'knex'

export default {
  client: 'oracledb',
  connection: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectionString: process.env.DATABASE_PORT,
  },
  migrations: {
    directory: './src/infra/database/migrations',
    extension: 'ts',
  },
} satisfies Knex.Config
