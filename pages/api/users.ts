import { NextApiRequest, NextApiResponse } from "next";
import { GetUsers, SaveUser, User } from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
    if (req.method === 'GET')
        return res.status(200).json(await get());
    if (req.method === 'POST') {
        return res.status(await save(JSON.parse(req.body)) ? 204 : 400);
    }
}

async function get() {
    return await GetUsers();
}

async function save(user: User) {
    return await SaveUser(user);
}