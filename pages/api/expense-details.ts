import { NextApiRequest, NextApiResponse } from "next";
import { ExpenseDetail, GetExpenseDetails } from "../../models/ExpenseDetail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExpenseDetail[]>
) {
    if (req.method === 'GET') {
        if (req.query.id)
            return res.status(200).json(await get(req.query.id as string));
        else
            return res.status(400);
    }

    return res.status(404);
}

async function get(expenseHeaderId: number | string) {
    return await GetExpenseDetails(expenseHeaderId);
}