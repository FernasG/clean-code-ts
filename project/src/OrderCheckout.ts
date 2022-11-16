import OrderRepository from "./OrderRepository";
import ItemRepository from "./ItemRepository";
import Order from "./Order";

export default class OrderCheckout {
    constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) { }

    async checkout(input: Input): Promise<void> {
        const { cpf, orderItems } = input;
        const order = new Order(cpf);

        for (const orderItem of orderItems) {
            const item = await this.itemRepository.getItem(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }

        this.orderRepository.save(order);
    }
}

type Input = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[]
}