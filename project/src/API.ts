import express, { Request, Response } from "express";
import PreviewOrder from "./PreviewOrder";

const app = express();
app.use(express.json());

app.post('/orderPreview', async (req: Request, res: Response) => {
    const { cpf, orderItems } = req.body;
    const output = await new PreviewOrder().execute({ cpf, orderItems });
    return res.json(output);
});

app.listen(3000);