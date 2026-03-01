import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product, { ProductProps } from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
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
    const productProps: ProductProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({ where: { id: product.id.id } });
    expect(productDb).toBeDefined();
    expect(productDb.id).toBe(product.id.id);
    expect(productDb.name).toBe(product.name);
    expect(productDb.description).toBe(product.description);
    expect(productDb.purchasePrice).toBe(product.purchasePrice);
    expect(productDb.stock).toBe(product.stock);
    expect(productDb.createdAt.getTime()).toBe(product.createdAt.getTime());
    expect(productDb.updatedAt.getTime()).toBe(product.updatedAt.getTime());
  });
});
