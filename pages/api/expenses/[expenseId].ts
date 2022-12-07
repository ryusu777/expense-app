import { NextApiRequest, NextApiResponse } from "next";
import { DeleteExpenseHeader, ExpenseHeader, GetExpenseHeaders, SaveExpenseHeader } from "../../../models/ExpenseHeader";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const { expenseId } = req.query;
        return res.status(await deletion(expenseId as string || 0) ? 204 : 400).send('');
    }

    return res.status(404).send('');
}

async function deletion(expenseId: number | string) {
    return await DeleteExpenseHeader(expenseId);
}