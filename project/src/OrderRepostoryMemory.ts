import Order from "./Order";
import OrderRepository from "./OrderRepository";

const orderMemory = new Set<{id: string, order: Order}>();

export default class OrderRepositoryMemory implements OrderRepository {
    save(order: Order): void {
        orderMemory.add({ id: order.genOrderCode(), order });
    }
}