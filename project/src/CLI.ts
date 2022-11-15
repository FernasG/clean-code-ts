// Adapter
import ItemRepositoryDatabase from "./ItemRepositoryDatabase";
import PreviewOrder from "./PreviewOrder";

let cpf: string = '';
let orderItems: { idItem: number, quantity: number }[] = [];

process.stdin.on("data", async (chunk) => {
    const command = chunk.toString();

    if (command.startsWith('cpf')) {
        cpf = command.replace('cpf ', '');
    }

    if (command.startsWith('add-item')) {
        const [idItem, quantity] = command.replace('add-item ', '').split(' ');
        orderItems.push({ idItem: parseInt(idItem), quantity: parseInt(quantity) });
    }

    if (command.startsWith('preview')) {
        const itemRepository = new ItemRepositoryDatabase();
        const result = await new PreviewOrder(itemRepository).execute({ cpf, orderItems });
        console.log(`total: ${result.total}`);
    }
});