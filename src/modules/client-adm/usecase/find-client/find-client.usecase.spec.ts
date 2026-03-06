import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";
import { FindClientInputDto } from "./find-client.usecase.dto";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "client1@example.com",
  address: "123 Main St, Anytown, USA",
});

const MockClientRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe("Find client usecase unit test", () => {
  it("should find a client", async () => {
    const clientRepository = MockClientRepository();
    const usecase = new FindClientUsecase(clientRepository);
    const input: FindClientInputDto = {
      id: "1",
    };
    const result = await usecase.execute(input);
    expect(clientRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(client.id.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
  });
});
