import OrderCheckout from "../src/OrderCheckout";
import ItemRepositoryMemory from "../src/ItemRepositoryMemory";
import OrderRepositoryMemory from "../src/OrderRepostoryMemory";

test("Deve fazer um pedido", () => {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const orderCheckout = new OrderCheckout(itemRepository, orderRepository);
    const output = orderCheckout.checkout({
        cpf: '886.634.854-68',
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 }
        ]
    });
    expect(output).toBe({});
});