import Http from "./Http";
import ItemRepositoryDatabase from "./ItemRepositoryDatabase";
import OrderCheckout from "./OrderCheckout";
import OrderRepositoryMemory from "./OrderRepostoryMemory";
import PreviewOrder from "./PreviewOrder";

export default class OrderController {
    constructor(readonly http: Http) {
        http.on('post', '/orderPreview', async (params: any, body: any) => {
            const { cpf, orderItems } = body;
            const itemRepository = new ItemRepositoryDatabase();
            const output = await new PreviewOrder(itemRepository).execute({ cpf, orderItems })
            return output;
        });

        http.on('post', '/checkout', async (params: any, body: any) => {
            const { cpf, orderItems } = body;
            const orderRepository = new OrderRepositoryMemory();
            const itemRepository = new ItemRepositoryDatabase();
            const output = await new OrderCheckout(itemRepository, orderRepository).checkout({ cpf, orderItems });
            return output;
        });
    }
}