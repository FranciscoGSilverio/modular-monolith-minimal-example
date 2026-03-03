import Id from "../../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../../@shared/use-case/use-case.interface";
import ProductGateway from "../../../gateway/product.gateway";
import Product from "../../entity/product.entity";
import { CheckStockInputDto, CheckStockOutputDto } from "./check.stock.dto";

export class CheckStockUsecase implements UseCaseInterface<
  CheckStockInputDto,
  CheckStockOutputDto
> {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }
  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(new Id(input.productId));
    return this.toDTO(product);
  }

  toDTO(entity: Product): CheckStockOutputDto {
    return {
      productId: entity.id.id,
      stock: entity.stock,
    };
  }
}
