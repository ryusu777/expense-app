import { OkPacket, RowDataPacket } from "mysql2";
import { connection } from "./DbConnection";

export interface User extends RowDataPacket {
    Id: number;
    Name: string;
}

export function GetUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        connection.query<User[]>(`SELECT * FROM User;`, (err, res) => {
            if (err) reject(err);
            else return resolve(res);
        });
    });
}

export function SaveUser(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
        connection.query<OkPacket>(`INSERT INTO User (Name) VALUES (${user.Name})`, (err, res) => {
            if (err) reject(err);
            else return resolve(true);
        });
    });
}