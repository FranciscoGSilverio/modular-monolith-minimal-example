import { AddClientUsecase } from "../usecase/add-client/add-client.usecase";
import { AddClientOutputDto } from "../usecase/add-client/add-client.usecase.dto";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addClientUsecase: AddClientUsecase;
  private _findClientUsecase: FindClientUsecase;

  constructor(addClientUsecase: AddClientUsecase, findClientUsecase: FindClientUsecase) {
    this._addClientUsecase = addClientUsecase;
    this._findClientUsecase = findClientUsecase;
  }

  async addClient(
    client: AddClientFacadeInputDto,
  ): Promise<AddClientOutputDto> {
    return await this._addClientUsecase.execute(client);
  }
  async findClient(
    client: FindClientFacadeInputDto,
  ): Promise<FindClientFacadeOutputDto> {
    return this._findClientUsecase.execute(client);
  }
}
