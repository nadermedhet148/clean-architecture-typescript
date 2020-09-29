import { IProductRepository , IGetProductsParams } from "domain/interfaces/Repositories/IProductRepository";

export class GetProductList {

    constructor(private ProductRepository : IProductRepository){

    }

    async execute(params : IGetProductsParams){
        
        const data = await this.ProductRepository.getProducts(params)
        return data ;
        
    }


}