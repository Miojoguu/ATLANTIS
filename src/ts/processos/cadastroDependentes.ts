import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroDependente extends Processo {
  private clientes: Cliente[];
  constructor() {
    super();
    this.clientes = Armazem.InstanciaUnica.Clientes;
  }
  processar(): void {
    console.log("Iniciando o cadastro de um novo cliente dependente...");
    let rgTitular = this.entrada.receberNumero("Qual o RG do seu titular?");
    let nome = this.entrada.receberTexto("Qual o nome do novo cliente?");
    let nomeSocial = this.entrada.receberTexto(
      "Qual o nome social do novo cliente?",
    );
    let dataNascimento = this.entrada.receberData("Qual a data de nascimento?");
    let cliente = new Cliente(nome, nomeSocial, dataNascimento);

    this.processo = new CadastroEnderecoTitular(cliente);
    this.processo.processar();

    this.processo = new CadastrarDocumentosCliente(cliente);
    this.processo.processar();

    let armazem = Armazem.InstanciaUnica;
    armazem.Clientes.push(cliente);

    console.log("Finalizando o cadastro do cliente...");
  }
}
