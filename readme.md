## Resolução do backend do desafio Desenvolvedor Fullstack Junior 3 da empresa Softmakers

<br>

Observações: nessa resolução, foi feito apenas o backend do desafio, o frontend não foi feito. Além disso, eu devo informar que não estou partipando da seleção do qual esse desafio foi destinado, o objetivo desse repositório é apenas para fins de estudo e demonstrações de habilidades.

Também é importante que o Node.js e o Docker estejam instalados na máquina para rodar o projeto localmente. Caso não tenha o Docker instalado, você pode rodar o projeto sem o Docker, mas é necessário ter o Postgres instalado na máquina.

<br>

### link do github do desafio: [Clique aqui](https://github.com/BrSoftMakers/desafio-desenvolvedor-junior-3)

<br>

### Principais tecnologias utilizadas:
- Node.js
- Express
- Prisma
- Typescript
- Docker
- Postgres
- bcryptjs
- jsonwebtoken
- cors

<br>

### Como rodar o projeto localmente sem o uso do Docker:

- Faça o clone deste repositório
- Instale as dependências com o comando  `npm install`
- Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente (substitua os valores das variáveis acima pelos valores de sua preferência.):
```env
USER_DB=postgres
PASSWORD_DB=postgres
ADDRESS_DB=localhost
PORT_DB=6543
DATABASE_NAME=desafio_softmakers
DATABASE_URL=postgresql://${USER_DB}:${PASSWORD_DB}@${ADDRESS_DB}:${PORT_DB}/${DATABASE_NAME}
HASH_KEY=8
JWT_SECRET=7fb359bf6ca582a240a62d338c5a409bb91891658eaa3a0a15ab7c4c41a0cd5c
PORT_SERVER=3000
```
- Crie um banco de dados postgres com o nome `desafio_softmakers` seguindo as configurações do arquivo `.env`

- Execute o comando abaixo para configurar o prisma client e criar as tabelas no banco de dados:
    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

- Execute o comando para iniciar o servidor:
    ```bash
    npm run dev
    ```

- O servidor estará disponível em `http://localhost:3000`


- Você pode testar as rotas utilizando o Insomnia ou Postman.

É imporante ressaltar que nesse a partir do passo 4, a API será executado como ambiente de desenvolvimento. Caso queira executar com ambiente de produção, você poderá usar os seguintes comandos depois do passo 3:

```bash	
 npx prisma migrate deploy
 npx prisma generate
 npm run build
 npm run start
```

<br>

### Como rodar o projeto localmente com o uso do Docker:

Nessa resolução, eu utilizei o Docker para executar a API e o banco de dados localmente. Importante ressaltar que na descrição abaixo o ADDRESS_DB é o endereço IP da máquina que está rodando o Docker e tanto o backend quanto o banco de dados estão rodando na mesma rede e em containers diferentes.

Obs: O Docker precisa está instalado na máquina para concluir alguns passos abaixo.

Dito isso, vamos para a execução do projeto com o Docker:

- Faça o clone deste repositório
- Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente (substitua os valores das variáveis acima pelos valores de sua preferência.):
```env
USER_DB=postgres
PASSWORD_DB=postgres
ADDRESS_DB='endereço IP da máquina que está rodando o Docker'
PORT_DB='porta que está rodando o banco de dados no container'
DATABASE_NAME=desafio_softmakers
DATABASE_URL=postgresql://${USER_DB}:${PASSWORD_DB}@${ADDRESS_DB}:${PORT_DB}/${DATABASE_NAME}
HASH_KEY=8
JWT_SECRET=7fb359bf6ca582a240a62d338c5a409bb91891658eaa3a0a15ab7c4c41a0cd5c
PORT_SERVER=3000
```

- Após isso, será necessário criar uma imagem do banco de dados e, em seguida, iniciar um container a parir dessa imagem. Use o seguinte comando:

```bash
docker build -t db-desafio-softmakers --build-arg POSTGRES_DB=desafio_softmakers --build-arg POSTGRES_USER=postgres --build-arg POSTGRES_PASSWORD=postgres -f - <<EOF
FROM postgres:latest
ENV POSTGRES_DB=desafio_softmakers
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
EXPOSE 5432
EOF
```

- Após a criação da imagem, crie uma rede onde a API e o banco de dados serão executados. Use o seguinte comando:
    ```bash
    docker network create nome-da-rede
    ```

- Em seguida, inicie o container do banco de dados. Use o seguinte comando:
    ```bash
    docker run --name db-desafio-softmakers --network nome-da-rede -p 6543:5432 -d db-desafio-softmakers
    ```
Se tudo ocorrer bem, o banco de dados estará sendo executado em um container na porta 6543.

Agora vamos para a execução do container da API:

- Execute o comando abaixo para criar a imagem do docker (o Dockerfile já está disponível na raiz do projeto).

   ```bash
    docker build -t softmakers .
    ```
    
- Execute o comando abaixo para iniciar o container.
    
    ```bash
    docker run --name softmakers --network nome-da-rede -p 3001:3000 -d softmakers
    ```

Se tudo ocorrer bem, a API estará sendo executada em um container na porta 3001.

<br>

Pronto, agora você pode testar as rotas da API utilizando o [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/), ou qualquer outra ferramenta de sua preferência.

<br>

### Rotas da API:
- POST `/register`
- POST `/login`
- POST `/posts` (requer autenticação);
- PUT  `/posts/{id}` (requer autenticação);
- GET  `/posts{id}` (requer autenticação);
- GET  `/posts/{id}` (requer autenticação); 
- DELETE `/posts/{id}` (requer autenticação);

Obs: Originalmente, na rota DELETE `/posts/{id}`, não é pedido autenticação para acessasr a rota, porém, eu adicionei a autenticação para acessar essa rota pois para mim não havia sentido deletar um post sem estar autenticado.

Caso tenha algum problema na descrição ou na execução do projeto, por favor, me avise para que eu possa corrigir o mais rápido possível ou crie um pull request.
