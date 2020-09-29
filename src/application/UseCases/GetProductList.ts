import { IProductRepository } from "domain/interfaces/Repositories/IProductRepository";

export class GetProductList {

    constructor(private ProductRepository : IProductRepository){

    }

    execute(params : {
        pagination : {
            limit : number;
            skip : number;
        },
        categoryId : number
    }){

        return [];
        
    }


}