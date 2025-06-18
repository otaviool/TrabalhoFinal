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
 addTarefa(novaTarefa) {
        const novoNo = new No(novaTarefa);
        
      
        if (this.#head === null) {
            this.#head = novoNo;
            this.#tail = novoNo;
            return;
        }

       
        if (novaTarefa.prioridade < this.#head.dado.prioridade) {
            novoNo.proximo = this.#head;
            this.#head.anterior = novoNo;
            this.#head = novoNo;
            return;
        }

        let atual = this.#head;
        while (atual.proximo !== null && atual.proximo.dado.prioridade <= novaTarefa.prioridade) {
            atual = atual.proximo;
        }

        novoNo.proximo = atual.proximo;
        if (atual.proximo !== null) {
            atual.proximo.anterior = novoNo;
        } else {
            this.#tail = novoNo; 
        }
        atual.proximo = novoNo;
        novoNo.anterior = atual;
    }

removeFirst(){
    const dadoremovido = this.#head.dado;
    this.#head = this.#head.proximo;
    if(this.#head!==null)
        this.#head.anterior =null;
    else
        this.#tail = null;
    this.#qtd--;
    return dadoremovido;
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

        // Calcular a diferença em dias
        const dias = calcularDiferencaDias(tarefaRealizada.data, dataAtual);

        // Calcular a diferença em horas e minutos
        const diferencaHorasMinutos = calcularDiferencaHoras(tarefaRealizada.hora, horaAtual);
        const [horas, minutos] = diferencaHorasMinutos.split(':').map(Number);

        // Montar a mensagem
        const mensagem = `Tarefa concluída: ${tarefaRealizada.descricao}<br>` +
                         `Tempo necessário: ${dias} dias, ${horas} horas e ${minutos} minutos.`;

        // Exibir a mensagem em um elemento HTML ou alert
        const mensagemEl = document.getElementById("mensagem-remocao");
        if (mensagemEl) {
            mensagemEl.innerHTML = mensagem;
            mensagemEl.style.display = "block"; // Exibe a mensagem
        } else {
            alert(mensagem); // Fallback para alert
        }

        // Atualiza a lista na interface
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