// Adapter

// import express, { Request, Response } from "express";
// import ItemRepositoryDatabase from "./ItemRepositoryDatabase";
// import PreviewOrder from "./PreviewOrder";

// const app = express();
// app.use(express.json());

// app.post('/orderPreview', async (req: Request, res: Response) => {
//     const { cpf, orderItems } = req.body;
//     const itemRepository = new ItemRepositoryDatabase();
//     const output = await new PreviewOrder(itemRepository).execute({ cpf, orderItems });
//     return res.json(output);
// });

// app.listen(3000);

import ExpressAdapter from "./ExpressAdapter";
import OrderController from "./OrderController";


// Framework and Driver (Clean Architecture)
const http = new ExpressAdapter();
// Interface Adapter (Clean Architecture)
new OrderController(http);
http.listen(3000);