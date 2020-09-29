import { createConnection, DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";

class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  foreignKeyName(
    tableOrName: any,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    // eslint-disable-next-line no-param-reassign
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

    const name = columnNames.reduce(
      // eslint-disable-next-line no-shadow
      (name, column) => `${name}_${column}`,
      `${tableOrName}_${referencedTablePath}`,
    );

    return `fk_${name.slice(0, 10)}${Math.random()}`;
  }
}

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
      synchronize: 1,
      logging: true,
      entities: [`${__dirname}/Entities/**/*{.ts,.js}`],
      cli: {
        migrationsDir: 'migrations',
        entitiesDir: 'models',
      },
      namingStrategy: new CustomNamingStrategy(),
    });
    return connection;
  };