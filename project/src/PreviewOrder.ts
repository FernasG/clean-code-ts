import pgPromise from "pg-promise";
import Dimension from "./Dimension";
import Item from "./Item";
import Order from "./Order";

export default class PreviewOrder {
    private readonly connection;

    constructor() {
        this.connection = pgPromise()({
            port: 5432, user: 'postgres', host: 'localhost', database: 'app', password: '123456'
        });
    }

    async execute(input: Input): Promise<Output> {
        const { cpf, orderItems } = input;
        const order = new Order(cpf);

        for (const orderItem of orderItems) {
            const { idItem, quantity } = orderItem;
            const [itemData] = await this.connection.query('SELECT * FROM "ccca".item WHERE "idItem" = $1', [idItem]).catch(err => console.log(err));

            if (!itemData) continue;

            const { description, price, width, height, length, weight } = itemData;

            const item = new Item(idItem, description, parseFloat(price), new Dimension(width, height, length, weight));

            order.addItem(item, quantity);
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