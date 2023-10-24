import { Request, Response } from "express";

export class DiplomaController {
    all(_:Request, res:Response): void {
        res.json([]);
    }
}

export default new DiplomaController();