import { Product as productDb } from "../../../drivers/db/Entities/Product";
import { Product } from "../../../domain/Entities/Product";
import {
  IGetProductsParams,
  IProductRepository,
} from "../../../domain/interfaces/Repositories/IProductRepository";
import { TypeOrmRepository } from "./TypeOrmRepository";
import { ProductProvider } from "../../../drivers/db/Entities/ProudctProvider";

export class ProductRepository
  extends TypeOrmRepository
  implements IProductRepository {
  
  async getProductByProvider(productId: number, providerId: any): Promise<Product> {
    const data =  await (await this.getRepository(productDb)).createQueryBuilder('product')
    .innerJoinAndSelect('product.providers' , 'providers')
    .where('providers.provider_id=:provider_id and product.id =:product_id', {
      product_id : productId,
      provider_id : providerId 
    }).getOne();    

    if(!data) return null;
    
    const product = new Product();
    product.isAvailable = data.providers[0].available;
    product.productName = data.name;
    product.productPrice = data.providers[0].price;
    product.providerId = providerId;
    product.id = data.id;

    return product;
  }

  async toggleProductAvailabilityByProvider(product : Product): Promise<Product> {
    await this.connection.createQueryBuilder().update(ProductProvider).set({
      available : !product.isAvailable
    })
    .where("provider_id=:provider_id and product_id =:product_id", { product_id  : product.id , provider_id : product.providerId  })
    .execute();
    product.isAvailable = !product.isAvailable;
    return product;
  }

  async getProducts(params: IGetProductsParams): Promise<Product[]> {
    const data = await this.connection.query(`
        SELECT * , pr.name as provider_name , c.name as category_name
        FROM magneto_dev_local.product p
        LEFT JOIN (
            SELECT MIN(price) AS minPrice, product_id , provider_id ,available
            FROM product_provider pp 
            GROUP BY product_id 
        ) as pp
        on pp.product_id = p.id
        left JOIN provider pr  on pp.provider_id = pr.id
        left JOIN category c  on c.id = p.category_id
   WHERE  c.id = ${params.categoryId}
   LIMIT ${params.pagination.limit} OFFSET ${params.pagination.skip}
    
        
        `);

    return data.map((ele) => {
      const product = new Product();
      product.categoryId = ele.category_id;
      product.categoryName = ele.category_name;
      product.isAvailable = ele.available;
      product.productName = ele.name;
      product.productPrice = ele.minPrice;
      product.providerId = ele.provider_id;
      product.providerName = ele.provider_name;
      return product;
    });
  }
}
