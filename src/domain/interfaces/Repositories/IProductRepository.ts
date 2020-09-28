import { Product } from "../../Entities/Product";

export interface IProductRepository {
    getProducts() : Promise<Product[]>;
}