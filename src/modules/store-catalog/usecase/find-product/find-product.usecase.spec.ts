import Id from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindProductInputDto } from "./find-product.dto";
import FindProductUsecase from "./find-product.usecase";

const MockProductRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn(),
  };
};

describe("find a product usecase unit test", () => {
  it("should find a product", async () => {
    const productRepository = MockProductRepository();
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    });
    productRepository.find.mockResolvedValue(product);
    const usecase = new FindProductUsecase(productRepository);

    const input: FindProductInputDto = {
      id: "1",
    };

    const result = await usecase.execute(input);
    expect(productRepository.find).toHaveBeenCalledWith(input.id);
    expect(result).toEqual({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    });
  });
});
