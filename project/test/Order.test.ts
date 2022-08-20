import Coupon from "../src/Coupon";
import Order from "../src/Order";
import Item from "../src/Item";

test("Deve criar um pedido vazio", () => {
	const order = new Order("886.634.854-68");
	const total = order.getTotal();
	expect(total).toBe(0);
});

test("Não deve criar um pedido com CPF inválido", () => {
	expect(() => new Order("111.111.111-11")).toThrow(new Error("CPF Inválido"));
});

test("Deve criar um pedido com 3 itens", () => {
	const order = new Order("886.634.854-68");
	order.addItem(new Item(1, "Guitarra", 1000), 1);
	order.addItem(new Item(2, "Amplificador", 5000), 1);
	order.addItem(new Item(3, "Cabo", 30), 3);
	const total = order.getTotal();
	expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", () => {
	const order = new Order("886.634.854-68");
	order.addItem(new Item(1, "Guitarra", 1000), 1);
	order.addItem(new Item(2, "Amplificador", 5000), 1);
	order.addItem(new Item(3, "Cabo", 30), 3);
	order.addCoupon(new Coupon("VALE20", 20));
	const total = order.getTotal();
	expect(total).toBe(4872);
});