import { ToggleProductAvailability } from "../../../../application/UseCases/ToggleProductAvailability";
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

  toggleProductAvailability = async (request: Request) => {
    const getProductsUseCase = new ToggleProductAvailability(
      new ProductRepository()
    );
    try {
      const data = await getProductsUseCase.execute(
        request.params.product_id,
        request.params.provider_id
      );

      return { data };
    } catch (e) {
      return {
        statusCode: 400,
        
        message: e.message,
      };
    }
  };
}
