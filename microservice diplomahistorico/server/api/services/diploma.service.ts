import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosdb from "../../common/cosmosdb";
import { DiplomaHistorico } from "../entites/diploma-historico";

class DiplomaService {
    private container:Container =
        cosmosdb.container("diplomahistorico");

    async all(): Promise<DiplomaHistorico[]>{
        const {resources: listaHistorico}
            = await this.container.items.readAll<DiplomaHistorico>().fetchAll();

        return Promise.resolve(listaHistorico);
    }
    async getById(id:string):Promise<DiplomaHistorico>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM DiplomaHistorico dh WHERE dh.id = @id",
            parameters:[
                {name:"@id",value:id}
            ]
        };
        const {resources: listaHistorico}
            = await this.container.items.query(querySpec).fetchAll();
        
        return Promise.resolve(listaHistorico[0]);
    }
}


export default new DiplomaService();