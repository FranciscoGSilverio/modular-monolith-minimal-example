import { UseCaseInterface } from "../../../@shared/use-case/use-case.interface";
import { Product } from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gatewya";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUsecase implements UseCaseInterface<
  FindProductInputDto,
  FindProductOutputDto
> {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id);
    return this.toDTO(product);
  }

  toDTO(entity: Product): FindProductOutputDto {
    return {
      id: entity.id.id,
      name: entity.name,
      description: entity.description,
      salesPrice: entity.salesPrice,
    };
  }
}
