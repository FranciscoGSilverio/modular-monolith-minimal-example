import { FindAllProductsUsecase } from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogOutputDto,
  FindStoreCatalogInputDto,
  FindStoreCatalogOutputDto,
} from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findAllUseCase: FindAllProductsUsecase;
  private _findOneUseCase: FindProductUsecase;

  constructor(
    findAllUseCase: FindAllProductsUsecase,
    findOneUseCase: FindProductUsecase,
  ) {
    this._findAllUseCase = findAllUseCase;
    this._findOneUseCase = findOneUseCase;
  }
  async find(id: FindStoreCatalogInputDto): Promise<FindStoreCatalogOutputDto> {
    return await this._findOneUseCase.execute(id);

  }
  async findAll(): Promise<FindAllStoreCatalogOutputDto> {
    return await this._findAllUseCase.execute();
  }
}
