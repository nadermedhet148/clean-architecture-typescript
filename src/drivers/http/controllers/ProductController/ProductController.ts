import { ProductRepository } from "../../../../adapters/db/Repositories/ProductRepository";
import { GetProductList } from "../../../../application/UseCases/GetProductList";
import { Request } from "../IRequest";

export class ProductsController {
  getProducts = async (request: Request) => {
    const getProductsUseCase = new GetProductList(new ProductRepository());

    const data = await getProductsUseCase.execute({
      categoryId: request.params.category_id,
      pagination: request.pagination,
    });

    return { data };
  };
}
