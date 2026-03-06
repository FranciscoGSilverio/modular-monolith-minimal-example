import { AddClientUsecase } from "./add-client.usecase";
import { AddClientInputDto } from "./add-client.usecase.dto";

const MockClientRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add client usecase unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockClientRepository();
    const usecase = new AddClientUsecase(clientRepository);

    const input: AddClientInputDto = {
      name: "Client 1",
      email: "client1@example.com",
      address: "123 Main St, Anytown, USA",
    };

    const result = await usecase.execute(input);
    
    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address).toBe(input.address);
  });
});