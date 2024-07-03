// Obtendo a lista das Faturas via GET
const getList = async () => {
  // URL da API que retorna a lista de faturas
  let url = 'http://127.0.0.1:5000/listfaturas';

  // Realiza uma requisição GET para a URL especificada
  fetch(url, {
    method: 'get',
  })
    // Converte a resposta para JSON
    .then((response) => response.json())
    .then((data) => {

      // Adiciona cada item na lista de faturas
      data.faturas.forEach(item => {
        // Formata a data de vencimento usando a função formatDate
        let formattedDate = formatDate(item.vencimento);

        // Insere os detalhes da fatura na lista usando a função insertList
        insertList(item.beneficiario, item.pagador, item.valor, formattedDate);
      });
    })
    // Captura de erros
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Função para formatar a data de vencimento no formato desejado
const formatDate = (dateString) => {
  // Cria um objeto Date a partir da string fornecida
  let date = new Date(dateString);

  // Obtém os componentes de data em UTC diretamente do objeto Date original
  let day = String(date.getUTCDate()).padStart(2, '0'); // Dia do mês (0-31)
  let month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês (0-11, janeiro é 0)
  let year = date.getUTCFullYear(); // Ano em UTC

  // Retorna a data formatada no formato YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

// Carregamento inicial dos dados
getList()

// Adicionando uma Fatura no banco via POST
const postItem = async (inputBeneficiario, inputPagador, inputValor, inputVencimento) => {
  // Cria um novo objeto FormData para armazenar os dados do formulário
  const formData = new FormData();
  
  // Adiciona os dados fornecidos aos campos correspondentes no FormData
  formData.append('beneficiario', inputBeneficiario);
  formData.append('pagador', inputPagador);
  formData.append('valor', inputValor);
  formData.append('vencimento', inputVencimento);

   // URL da API para onde os dados do formulário serão enviados 
  let url = 'http://127.0.0.1:5000/addfatura';
  
  // Realiza uma requisição POST para a URL especificada
  fetch(url, {
    method: 'post',
    body: formData
  })
    // Converte a resposta para JSON
    .then((response) => response.json())
    
    // Captura de erros
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Adicionando o icone de deletar uma Fatura na Tela Apresentada
const insertButton = (parent) => {
  // Cria um novo elemento <span>
  let span = document.createElement("span");
  // Cria um nó de texto com o símbolo '✖' (Unicode: U+274C)
  let txt = document.createTextNode("\u274C");
  // Define a classe do <span> como 'close'
  span.className = "close";
  // Adiciona o nó de texto ao <span>
  span.appendChild(txt);
  // Adiciona o <span> ao elemento pai fornecido
  parent.appendChild(span);
}

// Deletar uma Fatura na lista de acordo com o click no icone e avisar atraves do alert
const removeElement = () => {
  // Obtém todos os elementos com a classe "close"
  let close = document.getElementsByClassName("close");
  // Declara uma variável para usar no loop
  let i;
  // Loop através de todos os elementos "close"
  for (i = 0; i < close.length; i++) {
    // Adiciona um evento de clique a cada elemento "close"
    close[i].onclick = function () {
      // Obtém o elemento div do item a ser removido, subindo dois níveis no DOM
      let div = this.parentElement.parentElement;
      // Obtém o conteúdo do primeiro <td> dentro do div, que representa o nome do item
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      // Exibe uma confirmação para o usuário
      if (confirm("Você tem certeza?")) {
        // Remove o elemento div do DOM
        div.remove()
        // Chama a função deleteItem para realizar a exclusão do item pelo nome
        deleteItem(nomeItem)
        // Alerta o usuário de que o item foi removido
        alert("Removido!")
      }
    }
  }
}

// Deletar uma Fatura no banco via Delete
const deleteItem = (item) => {
  // Loga o nome do item a ser deletado no console
  console.log(item)
  // Define a URL para a requisição, incluindo o nome do beneficiário como parâmetro de consulta
  let url = 'http://127.0.0.1:5000/delfatura?beneficiario=' + item;
  // Realiza uma requisição DELETE para a URL
  fetch(url, {
    // Define o método HTTP como DELETE
    method: 'delete' 
  })
    // Converte a resposta para JSON
    .then((response) => response.json())
    .catch((error) => {
      // Captura de erros
      console.error('Error:', error);
    });
}

// Adicionar uma nova Fatura conform preenchimento do FORM.
const newItem = () => {
  // Obtém o valor do campo de entrada "Beneficiário" e armazena na variável inputBeneficiario
  let inputBeneficiario = document.getElementById("newBeneficiario").value;
  // Obtém o valor do campo de entrada "Pagador" e armazena na variável inputPagador
  let inputPagador = document.getElementById("newPagador").value;
  // Obtém o valor do campo de entrada "Valor" e armazena na variável inputValor
  let inputValor = document.getElementById("newValor").value;
  // Obtém o valor do campo de entrada "Vencimento" e armazena na variável inputVencimento
  let inputVencimento = document.getElementById("newVencimento").value;

  // Verifica se o campo "Beneficiário" está vazio
  if (inputBeneficiario === '') {
    // Exibe um alerta se o campo "Beneficiário" estiver vazio
    alert("Escreva o Beneficiario da Fatura!");

   // Verifica se o valor do campo "Valor" não é um número
  } else if (isNaN(inputValor)) {
    // Exibe um alerta se o campo "Valor" não for um número
    alert("Valor precisa ser números!");

    // Se todos os campos estiverem válidos
  } else {
    // Insere a nova fatura na lista usando a função insertList
    insertList(inputBeneficiario, inputPagador, inputValor, inputVencimento )
    // Envia a nova fatura para o servidor usando a função postItem
    postItem(inputBeneficiario, inputPagador, inputValor, inputVencimento)
    // Exibe um alerta indicando que a fatura foi adicionada
    alert("Fatura Adicionada!")
  }
}

// Iserir items na lista
const insertList = (beneficiario, pagador, valor,vencimento) => {
  // Cria um array contendo os dados do beneficiário, pagador, valor e vencimento
  var item = [beneficiario, pagador, valor, vencimento]
  // Obtém a referência para a tabela no documento com o ID 'myTable'// Obtém a referência para a tabela no documento com o ID 'myTable'
  var table = document.getElementById('myTable');
  // Insere uma nova linha na tabela
  var row = table.insertRow();

  // Loop através do array 'item' e insere cada elemento como uma célula na nova linha
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i); // Insere uma nova célula na posição 'i'
    cel.textContent = item[i]; // Define o conteúdo da célula como o valor do item[i]
  }
  // Insere um botão de fechamento na última célula da linha
  insertButton(row.insertCell(-1))

  // Limpa os campos de entrada no formulário
  document.getElementById("newBeneficiario").value = "";
  document.getElementById("newPagador").value = "";
  document.getElementById("newValor").value = "";
  document.getElementById("newVencimento").value = "";

  // Chama a função removeElement para adicionar funcionalidade de remoção aos botões de fechamento
  removeElement()
}