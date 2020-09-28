import { Product } from "domain/Entities/Product";
import { IProductRepository } from "domain/interfaces/Repositories/IProductRepository";
import { TypeOrmRepository } from "./TypeOrmRepository";

export class ProductRepository  extends TypeOrmRepository implements IProductRepository {
    
    getProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

}