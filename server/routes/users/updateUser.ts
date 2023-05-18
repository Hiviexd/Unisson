import { Request, Response} from "express";
import { users } from "../../../database";

export default async (req: Request, res: Response) => {
    const 