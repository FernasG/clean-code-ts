import ItemRepository from "./ItemRepository";
import Dimension from "./Dimension";
import pgPromise from "pg-promise";
import Item from "./Item";

export default class ItemRepositoryDatabase implements ItemRepository {
    async getItem(idItem: number): Promise<Item> {
        const connection = pgPromise()({ port: 5432, user: 'postgres', host: 'localhost', database: 'app', password: '123456' });

        const [itemData] = await connection.query('SELECT * FROM "ccca".item WHERE "idItem" = $1', [idItem]).catch(err => console.log(err));

        const { description, price, width, height, length, weight } = itemData;

        const item = new Item(idItem, description, price, new Dimension(width, height, length, weight));

        await connection.$pool.end();

        return item;
    }
}