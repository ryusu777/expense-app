import { NextApiRequest, NextApiResponse } from "next";
import { ExpenseDetail, GetExpenseDetails, SaveExpenseDetail } from "../../models/ExpenseDetail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExpenseDetail[] | string>
) {
    if (req.method === 'GET') {
        if (req.query.id)
            return res.status(200).json(await get(req.query.id as string));
        else
            return res.status(400).send('');
    }

    if (req.method === 'POST') {
        const result = await save(JSON.parse(req.body) as ExpenseDetail);
        if (result)
            return res.status(200).json('');
    }

    return res.status(404).send('');
}

async function get(expenseHeaderId: number | string) {
    return await GetExpenseDetails(expenseHeaderId);
}

async function save(expenseDetail: ExpenseDetail) {
    return await SaveExpenseDetail(expenseDetail);
}