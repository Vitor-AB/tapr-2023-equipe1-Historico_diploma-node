import { Request, Response } from "express";
import DiplomaService from "../../services/diploma.service";

class DiplomaController {
    all(_:Request, res:Response): void{
        DiplomaService.all().then((r) => res.json(r));
    }
    getById(req:Request, res:Response): void{
        DiplomaService.getById(req.params['id']).then((r) => res.json(r));
    }
}

export default new DiplomaController();