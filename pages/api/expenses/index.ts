import { NextApiRequest, NextApiResponse } from "next";
import { ExpenseHeader, GetExpenseHeaders, SaveExpenseHeader } from "../../../models/ExpenseHeader";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExpenseHeader[] | string>
) {
    if (req.method === 'GET') {
        return res.status(200).json(await get());
    }
    if (req.method === 'POST') {
        const result = await save(JSON.parse(req.body));
        if (result)
            return res.status(204).send('');
        return res.status(400).send('');
    }

    return res.status(404).send('');
}

async function get() {
    return await GetExpenseHeaders();
}

async function save(expense: ExpenseHeader) {
    return await SaveExpenseHeader(expense);
}