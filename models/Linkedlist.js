class LinkedList{
    #head;
    #tail;
    #qtd;

    constructor(){
        this.#head = null;
        this.#tail = null;
        this.#qtd = 0;
    }

    addFirst(novoDado){
        const novoNo = new No(novoDado);
        if(this.#head==null)
            this.#tail = novoNo;
        else{
            novoNo.proximo = this.#head;
            this.#head.anterior = novoNo;
        }
        this.#head = novoNo;
        this.#qtd++;
        return true;
    }

    addLast(novoDado){
        const novoNo = new No(novoDado);
        if(this.#head===null)// vazia
            this.#head = novoNo;
        else{
           novoNo.anterior = this.#tail;
           this.#tail.proximo = novoNo;

        }
        this.#tail = novoNo;
        this.#qtd++;
        return true;
    }

   addTarefa(index, novaTarefa) {
    if (!novaTarefa || typeof novaTarefa.prioridade !== 'number') {
        throw new Error("Tarefa inválida ou prioridade não definida.");
    }

    const novoNo = new No(novaTarefa);

    if (index < 0 || index > this.#qtd) {
        throw new Error("Índice inválido.");
    }

    
    if (this.isEmpty() || novaTarefa.prioridade < this.#head.dado.prioridade) {
        return this.addFirst(novaTarefa);
    }

    
    if (index === this.#qtd) {
        return this.addLast(novaTarefa);
    }

    let noAtual = this.#head;
    let posAtual = 0;

    
    while (posAtual < index && noAtual.proximo !== null && novaTarefa.prioridade >= noAtual.proximo.dado.prioridade) {
        noAtual = noAtual.proximo;
        posAtual++;
    }

    // Insere o novo nó na posição correta
    novoNo.proximo = noAtual.proximo;
    novoNo.anterior = noAtual;
    noAtual.proximo = novoNo;

    if (novoNo.proximo !== null) {
        novoNo.proximo.anterior = novoNo;
    } else {
        this.#tail = novoNo; // Atualiza o último elemento se necessário
    }

    this.#qtd++;
    return true;
}



   
  removerAtIndex(index) {
    if (index < 0 || index >= this.#qtd || this.isEmpty()) {
        return null;
    }
    
    let noAtual = this.#head;
    let posAtual = 0;

    if (index === 0) {
        return this.removeFirst();
    }

    while (posAtual < index) {
        noAtual = noAtual.proximo; // Corrigido para 'proximo'
        posAtual++;
    }

    if (noAtual.anterior !== null) {
        noAtual.anterior.proximo = noAtual.proximo;
    }
    if (noAtual.proximo !== null) {
        noAtual.proximo.anterior = noAtual.anterior;
    } else {
        this.#tail = noAtual.anterior; // Atualiza o último elemento se necessário
    }

    this.#qtd--;
    return noAtual.dado; // Retorna o dado do nó removido
}
 

   removerTarefaEspecifica() {
    const listaTarefas = document.getElementById("list_listadeTarefas");
    if (!listaTarefas) return;

    const itensLista = listaTarefas.getElementsByTagName("li");

    for(let i = 0; i < itensLista.length; i++) {
        itensLista[i].addEventListener("click", function() {
            // Remove o item clicado
            this.remove();
            alert("Tarefa removida com sucesso!");

            // Chame atualizarLista() aqui caso queira sincronizar com dados persistentes
            // atualizarLista();
        });
    }
}

mostrarPrimeiraTarefa() {
    if (!minhaLista.isEmpty()) {
        const primeiraTarefa = minhaLista.getFirst();
        alert(`Primeira Tarefa: ${primeiraTarefa.descricao} - Prioridade: ${primeiraTarefa.prioridade}`);
    } else {
        alert("A lista está vazia.");
    }
}

  
    mostrarTarefaAntiga() {
    if (this.isEmpty()) {
        return null; 
    }
    
    let noAtual = this.#head;
    while (noAtual.proximo !== null) {
        noAtual = noAtual.proximo; 
    }
    
    return noAtual.dado; 
}


    removeFirst(){
        const dadoRemovido = this.#head.dado;
        this.#head = this.#head.proximo;
        if(this.#head!==null)
            this.#head.anterior = null;
        else
            this.#tail = null;
        this.#qtd--;
        return dadoRemovido;
    }

    removeLast(){
        const dadoRemovido = this.#tail.dado;
        this.#tail = this.#tail.anterior;
        if(this.#tail!=null)
            this.#tail.proximo = null;
        else
          this.#head = null;
        this.#qtd--;
        return dadoRemovido;
    }
    
    getLast(){
      return this.#tail.dado;
    }
     getFirst(){
        return this.#head.dado;
     }
    isEmpty(){
        return this.#head === null;
    }

    get length(){
        return this.#qtd;
    }

    removerElementoInicio() {
    if (!this.minhaLista.isEmpty()) {
        const tarefaRealizada = this.minhaLista.removeFirst();
        const dataAtual = obterDataAtual();
        const horaAtual = obterHoraAtual();
        // Verifique se as funções de cálculo estão retornando valores válidos
        const dias = calcularDiferencaDias(tarefaRealizada.data, dataAtual);
        const horas = calcularDiferencaHoras(tarefaRealizada.hora, horaAtual);
        const mensagem = `Tarefa concluída: ${tarefaRealizada.descricao}\nTempo necessário: ${dias} dias e ${horas} horas.`;
        alert(mensagem);
        atualizarLista();
    } else {
        alert("Lista de Tarefas Vazia.");
    }
}

    //-------------------------------------
//Quando um objeto tem um iterator, ele pode ser iterado com construções como [ for(const item of minhaLista)*/

[Symbol.iterator]() {         
    let noAtual = this.#head;
          return {
            next: function() {
              if (noAtual!==null) {
                let valor = noAtual.dado;
                noAtual = noAtual.proximo;
                return { value: valor, done: false };
              } else {
                return { done: true };
              }
            }
          };
        }
  //—----------------
    toString() {
          let result = "";
          let noAtual = this.#head;
          while (noAtual !== null) {
              result += noAtual.toString();
              noAtual = noAtual.proximo;
          }
          return result;
      }
   //----------------  

   
    }