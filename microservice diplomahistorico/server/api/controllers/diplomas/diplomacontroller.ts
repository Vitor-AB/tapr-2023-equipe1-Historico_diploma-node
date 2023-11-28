import { Request, Response } from "express";
import DiplomaService from "../../services/diploma.service";

class DiplomaController {
    all(_:Request, res:Response): void{
        DiplomaService.all().then((r) => res.json(r));
    }
    getById(req:Request, res:Response): void{
        DiplomaService.getById(req.params['id']).then((r) => res.json(r));
    }
    post(req:Request, res:Response): void{
        DiplomaService.saveNew(req.body).then((r)=>res.json(r));
    }
    update(req:Request, res:Response): void {
        DiplomaService.update(req.params['id'],req.body).then((r) => res.json(r));
    }
    delete(req:Request,res:Response):void{
        DiplomaService.delete(req.params['id']).then((r) => res.json(r));
    }
    
}

export default new DiplomaController();