import { createConnection } from "typeorm";

export const establishConnection = async () => {
    // @ts-ignore
    const connection = await createConnection({
      name: 'default',
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      logging: true,
      entities: [`./Entities/**/*{.ts,.js}`],
      cli: {
        migrationsDir: 'migrations',
        entitiesDir: 'models',
      },
    });
    return connection;
  };