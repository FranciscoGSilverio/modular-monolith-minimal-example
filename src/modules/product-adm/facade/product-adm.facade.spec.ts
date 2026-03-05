import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
} from "./product-adm.facade.interface";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const facade = ProductAdmFacadeFactory.create();

    const input: AddProductFacadeInputDto = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    await facade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: "1" } });
    expect(product).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Product 1 description");
    expect(product.purchasePrice).toBe(100);
    expect(product.stock).toBe(10);
  });

  it("should check stock of a product", async () => {
    const facade = ProductAdmFacadeFactory.create();

    const productInput: AddProductFacadeInputDto = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    await facade.addProduct(productInput);

    const input: CheckStockFacadeInputDto = {
      productId: "1",
    };

    const result = await facade.checkStock(input);
  });
});
