import { Product } from "../../Entities/Product";

export interface IProductRepository {
    getProducts(params:IGetProductsParams) : Promise<Product[]>;
}

export interface IGetProductsParams   {
    pagination : {
        limit : number;
        skip : number;
    },
    categoryId : number
}