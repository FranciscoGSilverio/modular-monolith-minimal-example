import Id from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/use-case/use-case.interface";
import Client, { ClientProps } from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import {
  AddClientInputDto,
  AddClientOutputDto,
} from "./add-client.usecase.dto";

export class AddClientUsecase implements UseCaseInterface<
  AddClientInputDto,
  AddClientOutputDto
> {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props: ClientProps = {
      id: input.id ? new Id(input.id) : undefined,
      name: input.name,
      email: input.email,
      address: input.address,
    };
    const client = new Client(props);
    await this._clientRepository.add(client);
    return this.toDTO(client);
  }

  toDTO(entity: Client): AddClientOutputDto {
    return {
      id: entity.id.id,
      name: entity.name,
      email: entity.email,
      address: entity.address,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
