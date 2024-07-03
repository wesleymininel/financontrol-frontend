
# Controle Financeiro Mensal - FrontEnd

Este projeto é o FrontEnd do Controle Financeiro Mensal e faz parte do MVP do curso de Pós-Graduação em Engenharia de Software na disciplina de Desenvolvimento Full Stack Básico.

## Descrição do Projeto

Este projeto tem como objetivo fornecer uma interface de usuário intuitiva para gerenciar suas finanças mensais. Com este sistema, você pode adicionar, visualizar e remover faturas, proporcionando um controle eficiente sobre seus gastos e receitas.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **Fetch API**
- **Bootstrap (opcional)**

## Requisitos

Para executar este projeto, você precisará do backend correspondente, disponível no seguinte repositório:

- [financontrol-backend](https://github.com/wesleymininel/financontrol-backend.git)

O backend é construído com Flask e fornece as APIs necessárias para gerenciar os dados financeiros.

## Como Executar o Projeto

### 1. Configuração do Backend

1. Clone o repositório do backend:
   ```sh
   git clone https://github.com/wesleymininel/financontrol-backend.git
   ```

2. Navegue até o diretório do backend:
   ```sh
   cd financontrol-backend
   ```

3. Criando o Ambiente ENV via Terminal PowerShell no ambiente Windows:
   ```sh
   python.exe -m venv env
   ```

4. Iniciando o Ambiente ENV via Terminal PowerShell no ambiente Windows:
   ```sh
   .\env\Scripts\Activate.ps1
   ```

5. Instale as dependências necessárias:
   ```sh
   pip install -r requirements.txt
   ```

5. Inicie o servidor Flask:
   ```sh
   flask run --host 0.0.0.0 --port 5000
   ```

   O backend estará disponível em `http://127.0.0.1:5000`.

### 2. Configuração do Frontend

1. Clone este repositório do frontend:
   ```sh
   git clone https://github.com/wesleymininel/financontrol-frontend.git
   ```

2. Navegue até o diretório do frontend:
   ```sh
   cd financontrol-frontend
   ```

3. Abra o arquivo `index.html` no seu navegador preferido.

## Estrutura do Projeto

A estrutura do projeto frontend é a seguinte:

```
financontrol-frontend/
├── img/
│   └── calendar.png
│   └── cash.png
│   └── delete.png
│   └── financial.jpg
│   └── invoice.png
│   └── man.png
├── index.html
├── README.md
├── scripts.js
└── styles.css
```
- **index.html**: A página principal do projeto.
- **scripts.js**: Contém o código JavaScript para manipulação do DOM e integração com as APIs.
- **styles.css**: Contém os estilos CSS para o projeto.

## Funcionalidades

- **Adicionar Fatura**: Insira os detalhes da fatura, incluindo beneficiário, pagador, valor e data de vencimento.
- **Listar Faturas**: Visualize todas as faturas adicionadas em uma tabela.
- **Remover Fatura**: Remova faturas pagas da lista.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Você pode abrir issues ou enviar pull requests para melhorias e correções de bugs.

## Licença

Este projeto é licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
