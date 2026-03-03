import AddProductUsecase from "../domain/usecase/add-product/add.product.usecase";
import { CheckStockUsecase } from "../domain/usecase/check-stock/check.stock.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addUseCase = new AddProductUsecase(productRepository);
    const checkStockUseCase = new CheckStockUsecase(productRepository);

    return new ProductAdmFacade({
      addUsecase: addUseCase,
      checkStockUsecase: checkStockUseCase,
    });
  }
}   
