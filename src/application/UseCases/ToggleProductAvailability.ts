import { IProductRepository , IGetProductsParams } from "domain/interfaces/Repositories/IProductRepository";

export class ToggleProductAvailability {

    constructor(private ProductRepository : IProductRepository){

    }

    async execute(productId : number , providerId){
        
        const product = await this.ProductRepository.getProductByProvider(productId,providerId)
        if(!product){
            throw Error(`this product doesn't existed`)
        }        
        return await  this.ProductRepository.toggleProductAvailabilityByProvider(product);
        
    }


}