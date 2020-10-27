import { establishConnection } from "./../../../drivers/db/connection";
import { Connection, getConnection, Repository } from "typeorm";

export class TypeOrmRepository {

    connection = getConnection('default');

async  getRepository(entity) : Promise<Repository<any>>{
     return this.connection.getRepository(entity)
 }

}