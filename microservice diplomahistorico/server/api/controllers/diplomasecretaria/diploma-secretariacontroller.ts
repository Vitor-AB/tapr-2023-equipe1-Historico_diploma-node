import { Request, Response } from "express";
import DiplomaSecretariaService from "../../services/diplomasecretaria.service";

class DiplomaSecretariaController {
    updateEvent(req:Request, res:Response): void{
        DiplomaSecretariaService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
}

export default new DiplomaSecretariaController();