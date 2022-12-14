import { OkPacket, RowDataPacket } from "mysql2";
import { connection } from "./DbConnection";

export interface ExpenseHeader extends RowDataPacket {
    Id: number;
    Title: string;
    ExpenseBy: string | number;
    ExpenseAt: Date;
    ExpenseTotal: number;
}

export function SaveExpenseHeader(expense: ExpenseHeader): Promise<boolean> {
    return new Promise((resolve, reject) => {
        connection.query<OkPacket>(`INSERT INTO ExpenseHeader (Title, ExpenseAt, ExpenseBy) VALUES ('${expense.Title}', '${expense.ExpenseAt}', ${expense.ExpenseBy});`, (err, res) => {
            if (err) reject(err);
            else return resolve(true);
        });
    });
}

export function DeleteExpenseHeader(expenseId: number | string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        connection.query<OkPacket>(`DELETE FROM ExpenseHeader WHERE id=${expenseId};`, (err, res) => {
            if (err) reject(err);
            else return resolve(true);
        });
    });
}

export function GetExpenseHeaders(rowsPerPage?: number): Promise<ExpenseHeader[]> {
    return new Promise((resolve, reject) => {
        connection.query<ExpenseHeader[]>(`SELECT 
                eh.Id,
                eh.Title,
                eh.ExpenseAt,
                u.Name AS ExpenseBy,
                SUM(IFNULL(ed.Price, 0)) AS ExpenseTotal
            FROM ExpenseHeader eh
            LEFT JOIN ExpenseDetail ed ON ed.ExpenseHeaderId=eh.ID
            JOIN User u ON eh.ExpenseBy=u.Id
            GROUP BY eh.Id
            ORDER BY ExpenseAt DESC LIMIT ${rowsPerPage || 12}`, (err, res) => {
            if (err) reject(err);
            else return resolve(res);
        });
    });
}

export function GetNextExpenseHeaders(lastExpenseHeader: ExpenseHeader, rowsPerPage: number) {
    return new Promise((resolve, reject) => {
        connection.query<ExpenseHeader[]>(`SELECT 
                eh.Id,
                eh.Title,
                eh.ExpenseAt,
                u.Name AS ExpenseBy,
                SUM(ed.Price) AS ExpenseTotal
            FROM ExpenseHeader eh
            JOIN User u ON eh.ExpenseBy=u.Id
            JOIN ExpenseDetail ed ON ed.ExpenseHeaderId=eh.ID
            WHERE eh.Id > ${lastExpenseHeader.Id} AND eh.ExpenseAt <= ${lastExpenseHeader.ExpenseAt.toISOString().split('T')[0]}
            GROUP BY ed.ExpenseHeaderId
            ORDER BY ExpenseAt DESC LIMIT ${rowsPerPage || 10}`, (err, res) => {
            if (err) reject(err);
            else return resolve(res);
        });
    });
}

export function GetPreviousExpenseHeaders(firstExpenseHeader: ExpenseHeader, rowsPerPage: number) {
    return new Promise((resolve, reject) => {
        connection.query<ExpenseHeader[]>(`SELECT 
                eh.Id,
                eh.Title,
                eh.ExpenseAt,
                u.Name AS ExpenseBy,
                SUM(ed.Price) AS ExpenseTotal
            FROM ExpenseHeader eh
            JOIN User u ON eh.ExpenseBy=u.Id
            JOIN ExpenseDetail ed ON ed.ExpenseHeaderId=eh.ID
            WHERE eh.Id < ${firstExpenseHeader.Id} AND eh.ExpenseAt >= ${firstExpenseHeader.ExpenseAt.toISOString().split('T')[0]}
            GROUP BY ed.ExpenseHeaderId
            ORDER BY ExpenseAt DESC LIMIT ${rowsPerPage || 10}`, (err, res) => {
            if (err) reject(err);
            else return resolve(res);
        });
    });
}