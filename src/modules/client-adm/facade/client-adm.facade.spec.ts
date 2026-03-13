import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/find.model";
import { AddClientFacadeInputDto, FindClientFacadeInputDto } from "./client-adm.facade.interface";
import ClientAdmFacadeFactory from "../factory/client-adm.factory";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input: AddClientFacadeInputDto = {
      id: "1",
      name: "Client 1",
      email: "client1@example.com",
      address: "Client 1 address",
    };

    await facade.addClient(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });
    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client1@example.com",
      address: "Client 1 address",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input: FindClientFacadeInputDto = {
      id: "1",
    };

    const result = await facade.findClient(input);
    expect(result).toBeDefined();
    expect(result.id).toBe(input.id);
    expect(result.name).toBe("Client 1");
    expect(result.email).toBe("client1@example.com");
    expect(result.address).toBe("Client 1 address");
  });
});
