import Id from "../../../../@shared/domain/value-object/id.value-object";
import Product, { ProductProps } from "../../entity/product.entity";
import ProductGateway from "../../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add.product.dto";
import { UseCaseInterface } from "../../../../@shared/use-case/use-case.interface";

export default class AddProductUsecase implements UseCaseInterface<
  AddProductInputDto,
  AddProductOutputDto
> {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }
  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props: ProductProps = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    const product = new Product(props);
    this._productRepository.add(product);

    return this.toDTO(product);
  }

  toDTO(entity: Product): AddProductOutputDto {
    return {
      id: entity.id.id,
      name: entity.name,
      description: entity.description,
      purchasePrice: entity.purchasePrice,
      stock: entity.stock,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
