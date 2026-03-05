import { UseCaseInterface } from "../../../@shared/use-case/use-case.interface";
import ProductGateway from "../../gateway/product.gatewya";
import { Product } from "../../domain/product.entity";
import { FindAllProductsDto } from "./find-all-products.fto";

export class FindAllProductsUsecase implements UseCaseInterface<
  void,
  FindAllProductsDto
> {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(): Promise<FindAllProductsDto> {
    const products = await this._productRepository.findAll();
    return this.toDTO(products);
  }
  toDTO(entity: Product[]): FindAllProductsDto {
    return {
      products: entity.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
