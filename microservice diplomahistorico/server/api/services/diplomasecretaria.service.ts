import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosdb from "../../common/cosmosdb";
import { DiplomaSecretaria } from "../entites/diploma-secretaria";

class DiplomaSecretariaService {
    private container:Container =
        cosmosdb.container("diplomahistorico");
    async updateEvent(diplomasecretaria:DiplomaSecretaria): Promise<DiplomaSecretaria>{
        await this.container.items.upsert(diplomasecretaria);
        return Promise.resolve(diplomasecretaria);
    }
}


export default new DiplomaSecretariaService();