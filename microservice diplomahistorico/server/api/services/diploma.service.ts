import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosdb from "../../common/cosmosdb";
import { DiplomaHistorico } from "../entites/diploma-historico";
import daprClient from "../../common/daprclient";

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
            query: "SELECT * FROM diplomahistorico dh WHERE dh.id = @id",
            parameters:[
                {name:"@id",value:id}
            ]
        };
        const {resources: listaHistorico}
            = await this.container.items.query(querySpec).fetchAll();
        
        return Promise.resolve(listaHistorico[0]);
    }

    async publishEvent(diploma:DiplomaHistorico): Promise<DiplomaHistorico>{
        daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string,
                                  process.env.APPCOMPONENTTOPICCARRO as string,
                                  diploma);
        return Promise.resolve(diploma);

    }


    async saveNew(diploma:DiplomaHistorico): Promise<DiplomaHistorico>{
        diploma.id = "";
        await this.container.items.create(diploma);
        //chamar o método para publicar o evento de atualização da entidade
        await this.publishEvent(diploma);
        return Promise.resolve(diploma);
    }

    async update(id:string, diploma:DiplomaHistorico): Promise<DiplomaHistorico>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM diplomahistorico dh WHERE dh.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
        };
        const {resources: listaHistorico}
            = await this.container.items.query(querySpec).fetchAll();
        const diplomaAntigo = listaHistorico[0];

        if(diplomaAntigo == undefined){
            return Promise.reject();
        }

        //Atualizar os campos
        diplomaAntigo.nomeAluno = diploma.nomeAluno;
        
        await this.container.items.upsert(diplomaAntigo);
        //chamar o método para publicar o evento de atualização da entidade
        await this.publishEvent(diplomaAntigo);
        
        return Promise.resolve(diplomaAntigo);
    }

    async delete(id:string): Promise<string>{
        
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM diplomahistorico dh WHERE dh.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaHistorico}
            = await this.container.items.query(querySpec).fetchAll();
        for (const diploma of listaHistorico) {
            await this.container.item(diploma.id).delete();
        }

        return Promise.resolve(id);
    }
}


export default new DiplomaService();