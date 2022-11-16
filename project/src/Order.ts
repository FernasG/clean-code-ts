import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import Item from "./Item";
import CPF from "./CPF";
import FreightCalculator from "./FreightCalculator";

export default class Order {
    private orderItems: OrderItem[];
    private freight: number = 0;
    private coupon?: Coupon;
    private cpf: CPF;

    constructor(cpf: string, readonly date: Date = new Date()) {
        this.cpf = new CPF(cpf);
        this.orderItems = [];
    }

    genOrderCode() {
        const yyyy = this.date.getFullYear();

        let itemsSeq = this.orderItems.reduce((previous, current) => {
            return previous += current.idItem.toString().padStart(2, "0");
        }, '');

        const pppp = itemsSeq.length < 8 ? itemsSeq.padStart(8, "0") : itemsSeq.substring(0, 8);
        return `${yyyy}${pppp}`;
    }

    addItem(item: Item, quantity: number) {
        if (this.orderItems.some(orderItem => orderItem.idItem === item.idItem)) throw new Error("Duplicated item");
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
        this.freight += FreightCalculator.calculate(item) * quantity;
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isExpired(this.date)) return;
        this.coupon = coupon;
    }

    getTotal() {
        let total = this.orderItems.reduce((total, orderItem) => { return total += orderItem.getTotal(); }, 0);

        if (this.coupon) total -= this.coupon.getDiscount(total);

        if (this.freight) total += this.freight;

        return total;
    }
}