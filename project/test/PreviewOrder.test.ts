import ItemRepositoryMemory from "../src/ItemRepositoryMemory";
import PreviewOrder from "../src/PreviewOrder";

test("Deve simular um pedido", async () => {
    const itemRepository = new ItemRepositoryMemory();
    const previewOrder = new PreviewOrder(itemRepository);
    const output = await previewOrder.execute({
        cpf: '886.634.854-68',
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 }
        ]
    });
    expect(output.total).toBe(6350);
});