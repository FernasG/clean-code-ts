export default class OrderItem {
    constructor(readonly idItem: number, readonly price: number, readonly quantity: number) { 
        if (quantity < 1) throw new Error("Invalid quantity");
    }

    getTotal() {
        return this.price * this.quantity;
    }
}