import Product from "../../entity/product.entity";
import { CheckStockInputDto } from "./check.stock.dto";
import { CheckStockUsecase } from "./check.stock.usecase";
import Id from "../../../../@shared/domain/value-object/id.value-object";

const MockProductRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add product usecase unit test", () => {
  it("should check stock of a product", async () => {
    const productRepository = MockProductRepository();
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });
    productRepository.find.mockResolvedValue(product);
    
    const usecase = new CheckStockUsecase(productRepository);

    const input: CheckStockInputDto = {
      productId: "1",
    };

    const result = await usecase.execute(input);
    expect(result.productId).toBe(input.productId);
    expect(result.stock).toBe(10);
  });
});
