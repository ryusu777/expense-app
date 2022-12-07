import { OkPacket, RowDataPacket } from "mysql2";
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
            else resolve(res);
        });
    });
}

export async function SaveExpenseDetail(expenseDetail: ExpenseDetail): Promise<boolean> {
    return new Promise((resolve, reject) => {
        connection.query<OkPacket>(`INSERT INTO ExpenseDetail (Name, Price, ExpenseHeaderId) VALUES ('${expenseDetail.Name}', '${expenseDetail.Price}', ${expenseDetail.ExpenseHeaderId})`, (err, res) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}