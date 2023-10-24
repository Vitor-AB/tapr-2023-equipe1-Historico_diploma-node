import { Request, Response } from "express";

class DiplomaController {
    all(_:Request, res:Response): void{
        res.json([]);
    }
}

export default new DiplomaController();