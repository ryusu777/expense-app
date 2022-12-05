import { RowDataPacket } from "mysql2";
import { connection } from "./DbConnection";

export interface ExpenseDetail extends RowDataPacket {
    Id: number;
    Name: string;
    Price: number;
    ExpenseHeaderId: number;
}

export async function GetExpenseDetails(expenseHeaderId: number | string): Promise<ExpenseDetail[]> {
    return new Promise((resolve, reject) => {
        connection.query<ExpenseDetail[]>(`SELECT * FROM ExpenseDetail WHERE ExpenseHeaderId=${expenseHeaderId}`, (err, res) => {
            if (err) reject(err);
            else return resolve(res);
        });
    });
}