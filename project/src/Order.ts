import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import Item from "./Item";
import CPF from "./CPF";

export default class Order {
    private orderItems: OrderItem[];
    private coupon?: Coupon;
    private cpf: CPF;

    constructor(cpf: string) {
        this.cpf = new CPF(cpf);
        this.orderItems = [];
    }

    addItem(item: Item, quantity: number) {
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

    getTotal() {
        let total = this.orderItems.reduce((total, orderItem) => { return total += orderItem.getTotal(); }, 0);

        if (this.coupon) total -= this.coupon.getDiscount(total);

        return total;
    }
}