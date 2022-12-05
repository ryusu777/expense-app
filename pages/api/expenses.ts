import { NextApiRequest, NextApiResponse } from "next";
import { ExpenseHeader, GetExpenseHeaders } from "../../models/ExpenseHeader";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExpenseHeader[]>
) {
    if (req.method === 'GET') {
        return res.status(200).json(await get());
    }
}

async function get() {
    return await GetExpenseHeaders();
}