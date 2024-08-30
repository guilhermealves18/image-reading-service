# Image Reading Service

Este documento fornece um resumo das rotas implementadas, as tecnologias utilizadas, os princípios SOLID seguidos, a configuração de ambiente e as instruções para subir o container Docker do serviço de gestão de leituras de consumo de água e gás.

### Imagens de Exemplo

As imagens utilizadas para exemplos estão localizadas na pasta `images_examples` dentro do projeto. Estas imagens podem ser usadas para testar as rotas de upload e medição.

### Insomnia
- O Insomnia foi utilizado para testar as rotas do serviço.
- O arquivo JSON de configuração do ambiente está localizado na pasta `insomnia` dentro do projeto.

## Rotas de Medição

### 1. `POST /customer-measures/upload`
**Veja o mini tutorial de como utilizar esta rota no final deste README**

Esta rota faz o upload de uma imagem de medidor de água ou gás e retorna o valor da medição extraído da imagem.

- **Função**:
  - Recebe a imagem do medidor em formato base64.
  - Processa a imagem para obter a medição de consumo.
  - Retorna o valor da medição e informações relacionadas.

### 2. `PATCH /measures/confirm`
Esta rota confirma a medição realizada.

- **Função**:
  - Confirma ou corrige o valor lido pelo sistema.
  - Atualiza a medição no banco de dados com o valor confirmado.

### 3. `GET /measures/0001/list?measure_type`
Esta rota retorna todas as medições realizadas para o cliente com o código `0001`.

- **Função**:
  - Para retornar todas as medições de um cliente específico, o parâmetro `measure_type` deve ser passado vazio.
  - Se `measure_type` estiver preenchido, a rota filtrará as medições pelo tipo especificado (água ou gás).

### 4. `GET /measures/0003/list?measure_type=WATER ou GAS`
Esta rota retorna as medições realizadas para o cliente com o código `0003`, filtrando por tipo de medição (água ou gás).

- **Função**:
  - Filtra as medições retornadas com base no tipo de medição especificado.

## Rotas de Cliente

### 5. `POST /customers`
Esta rota cria um novo cliente.

- ### Corpo da requisição para criar um cliente
```json
{
	"code": "0001",
	"email": "guilherme@example.com",
	"name": "Guilherme Alves"
}
```

- **Função**:
  - Registra um novo cliente no sistema com os dados fornecidos.

### 6. `GET /customers`
Esta rota lista todos os clientes.

- **Função**:
  - Retorna uma lista de todos os clientes cadastrados no sistema.

## Ferramentas Utilizadas

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

### Backend
- **Express**: Framework para construção do servidor web.
- **Prisma**: ORM para interação com o banco de dados.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Sharp**: Biblioteca para manipulação e otimização de imagens.
- **Multer**: Middleware para manipulação de uploads de arquivos.
- **Google Gemini API**: Utilizada para extração de dados das imagens de medidores.

### Segurança
- **Helmet**: Middleware para proteger o aplicativo de várias vulnerabilidades de segurança da web.
- **HPP**: Middleware para prevenção de poluição de parâmetros HTTP.
- **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.

### Logging
- **Winston**: Biblioteca para registro e gerenciamento de logs.

### Utilitários
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.
- **reflect-metadata**: Adiciona suporte a decorators e metadados no TypeScript.
- **tmp**: Utilizado para criar arquivos e diretórios temporários.

### Desenvolvimento
- **ESLint**: Ferramenta para análise de código estático, ajudando a manter a qualidade do código.
- **Prettier**: Ferramenta de formatação de código.
- **SWC**: Compilador super rápido para JavaScript e TypeScript.
- **Nodemon**: Ferramenta que reinicia automaticamente o servidor ao detectar mudanças no código.
- **ts-node**: Utilitário para rodar TypeScript diretamente no Node.js.
- **@typescript-eslint**: Plugin ESLint para trabalhar com TypeScript.

## Princípios SOLID
O desenvolvimento seguiu os princípios SOLID, garantindo que o código seja:
- **S**ingle Responsibility: Cada classe tem uma única responsabilidade.
- **O**pen/Closed: O código é aberto para extensão, mas fechado para modificação.
- **L**iskov Substitution: As subclasses podem substituir suas classes base sem alterar o comportamento esperado.
- **I**nterface Segregation: Interfaces são específicas e evitam a implementação de métodos desnecessários.
- **D**ependency Inversion: O código depende de abstrações e não de implementações concretas.

## Configuração de Exemplo para Variáveis de Ambiente

Abaixo está um exemplo de configuração de variáveis de ambiente para o projeto:

```env
NODE_ENV=development
APP_PORT=4000

GEMINI_API_KEY=

DATABASE_URL="postgresql://user:password@host:port/table_name?schema=public"
```

## Configuração de Docker
### Subindo os Containers
Para construir e subir os containers, execute o comando:

```bash
docker-compose up --build
```

Para parar e remover os containers, execute o comando:
```bash
docker-compose down
```

**Certifique-se de que o Docker e o Docker Compose estejam instalados e em execução na sua máquina antes de usar esses comandos.**

# Guia para Fazer Upload de Imagem no Insomnia

Este guia explica como fazer o upload de uma imagem para o endpoint de upload de medidores usando o Insomnia.

## Passos para Configurar a Requisição no Insomnia

1. **Abrir o Insomnia**

   Certifique-se de que você tenha o Insomnia instalado e aberto em seu computador.

2. **Criar uma Nova Requisição**

   - Clique no botão **"New Request"**.
   - Dê um nome à sua requisição, por exemplo, **"Upload"**.
   - Selecione o método HTTP como **"POST"**.
   - Clique em **"Create"**.

3. **Configurar a URL da Requisição**

   - No campo **"URL"**, insira a URL do endpoint de upload. Exemplo:
     ```
     {{ _.url_base }}/customer-measures/upload
     ```

4. **Adicionar Cabeçalhos**

   - Clique na aba **"Headers"**.
   - Adicione os seguintes cabeçalhos:
     - **Key**: `Content-Type` | **Value**: `multipart/form-data`
     - **Key**: `User-Agent` | **Value**: `insomnia/9.3.3`

5. **Adicionar o Corpo da Requisição**

   - Clique na aba **"Body"**.
   - Selecione a opção **"Form Data"**.
   - Adicione os seguintes campos:
     - **Key**: `customer_code` | **Value**: `0001`
     - **Key**: `measure_datetime` | **Value**: `2024-03-28T13:19:54.197Z`
     - **Key**: `measure_type` | **Value**: `GAS`
     - **Key**: `image` | **Type**: `File` | **File**: Selecione o arquivo de imagem do seu computador (exemplo: `gas.png`).

6. **Enviar a Requisição**

   - Clique no botão **"Send"** para enviar a requisição.
   - O Insomnia irá enviar a imagem e os dados adicionais para o servidor.

7. **Verificar a Resposta**

   - Após o envio, verifique a resposta na aba **"Response"** para confirmar se o upload foi bem-sucedido.

## Exemplo de Configuração da Requisição

Aqui está um exemplo visual de como a configuração deve parecer no Insomnia:

![Configuração no Insomnia](https://i.imgur.com/7OMUjUD.png)

## Conclusão

Seguindo esses passos, você conseguirá enviar uma imagem para o endpoint de upload e verificar a resposta para garantir que o upload foi realizado corretamente.
