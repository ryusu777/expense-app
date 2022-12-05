// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ExpenseHeader, GetExpenseHeaders } from '../../models/ExpenseHeader'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExpenseHeader[]>
) {
  res.status(200).json((await GetExpenseHeaders(10)))
}