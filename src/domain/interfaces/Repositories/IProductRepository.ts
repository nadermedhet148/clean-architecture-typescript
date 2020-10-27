import { Product } from "../../Entities/Product";

export interface IProductRepository {
    getProducts(params:IGetProductsParams) : Promise<Product[]>;
    getProductByProvider(productId : number , providerId) : Promise<Product>;
    toggleProductAvailabilityByProvider(product: Product) : Promise<Product>;


}

export interface IGetProductsParams   {
    pagination : {
        limit : number;
        skip : number;
    },
    categoryId : number
}