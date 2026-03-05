import { UseCaseInterface } from "../../@shared/use-case/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  AddProductFacadeOutputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUsecase: UseCaseInterface<
    AddProductFacadeInputDto,
    AddProductFacadeOutputDto
  >;
  checkStockUsecase: UseCaseInterface<
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto
  >;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface<
    AddProductFacadeInputDto,
    AddProductFacadeOutputDto
  >;
  private _checkStockUsecase: UseCaseInterface<
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto
  >;

  constructor(useCaseProps: UseCaseProps) {
    this._addUsecase = useCaseProps.addUsecase;
    this._checkStockUsecase = useCaseProps.checkStockUsecase;
  }

  addProduct(product: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto> {
    return this._addUsecase.execute(product);
  }
  checkStock(
    id: CheckStockFacadeInputDto,
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(id);
  }
}
