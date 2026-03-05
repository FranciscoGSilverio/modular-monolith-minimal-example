import Id from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindAllProductsUsecase } from "./find-all-products.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product 2 description",
  salesPrice: 100,
});

const MockProductRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue([product, product2]),
    find: jest.fn().mockResolvedValue(product),
  };
};

describe("Find all products usecase unit test", () => {
  it("should find all products", async () => {
    const productRepository = MockProductRepository();
    const usecase = new FindAllProductsUsecase(productRepository);

    const result = await usecase.execute();
    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
  });
});
