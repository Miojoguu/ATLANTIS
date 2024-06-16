import Processo from "../abstracoes/processo";
import ImpressorDependenteTitular from "../impressores/impressorDependenteTitular";
import Impressor from "../interfaces/impressor";
import BuscarDependente from "./buscarDependente";

export default class ListagemDependenteTitular extends Processo{
    private impressor!:Impressor

    constructor(){
        super()
    }

    processar(): void {
        
        let buscar= new BuscarDependente()
        let dependente = buscar.buscar()
        
        if(dependente === undefined){
            console.log("Titular não encontrado...");
        }else{
            this.impressor = new ImpressorDependenteTitular(dependente)
            console.log(this.impressor.imprimir())
        }
    }
}