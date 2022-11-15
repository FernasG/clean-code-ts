import ItemRepository from "./ItemRepository";
import Order from "./Order";

export default class PreviewOrder {
    // Secondary Port (Driven)
    constructor(readonly itemRepository: ItemRepository) { }

    // Primary Port (Driver)
    async execute(input: Input): Promise<Output> {
        const { cpf, orderItems } = input;
        const order = new Order(cpf);

        for (const orderItem of orderItems) {
            const item = await this.itemRepository.getItem(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }

        return { total: order.getTotal() };
    }
}

type Input = {
    cpf: string,
    orderItems: { idItem: number, quantity: number }[]
}

type Output = {
    total: number
}