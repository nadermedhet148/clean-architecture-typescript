import { establishConnection } from "drivers/db/connection";
import { Connection } from "typeorm";

export class TypeOrmRepository {

async  getConnection() : Promise<Connection>{
     return establishConnection();
 }

}