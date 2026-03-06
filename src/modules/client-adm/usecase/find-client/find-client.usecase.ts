import { UseCaseInterface } from "../../../@shared/use-case/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import {
  FindClientInputDto,
  FindClientOutputDto,
} from "./find-client.usecase.dto";

export default class FindClientUsecase implements UseCaseInterface<
  FindClientInputDto,
  FindClientOutputDto
> {
  private _clientRepository: ClientGateway;
  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this._clientRepository.find(input.id);
    return this.toDTO(client);
  }
  toDTO(entity: Client): FindClientOutputDto {
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
