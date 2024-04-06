Códificação
----------------------------
Index.js
----------------------------

//BIBLIOTECAS/MODULOS
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const database = require("./db/db");
const Funcionario = require("./model/funcionarioModel");
const funcionarioController = require("./controller/funcionarioController");
const Cliente = require("./model/clienteModel");
const clienteController = require("./controller/clienteController");

//SINCRONISMO COM O BANCO DE DADOS
try {
database.sync().then(() => {
})
}
catch(erro) {
console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
};


app.get("/",(req, res) =>{
return res.json({message: "Seja Bem vindo a nossa API."});
});
////////////////Requisições HTTP Funcionário /////////////////////
//POST - CADASTRAR
app.post("/Cadastrar", funcionarioController.FuncionarioCreate);

//GET - LISTAR
app.get("/Funcionarios/:id?", funcionarioController.FuncionarioListar);

//PUT - UPDATE
app.put("/Funcionarios/:id", funcionarioController.FuncionarioUpdate);

// DELETE
app.delete("/Funcionarios/:id", funcionarioController.FuncionarioDelete);

////////////Requisições HTTP Cliente /////////////////////////
//POST - CADASTRAR Cliente
app.post("/CadastrarCliente", clienteController.ClienteCreate);

//GET - LISTAR
app.get("/Clientes/:id?", clienteController.ClienteListar);

//PUT - UPDATE
app.put("/Clientes/:id", clienteController.ClienteUpdate);

// DELETE
app.delete("/Clientes/:id", clienteController.ClienteDelete);

//Rodando servidor
app.listen(3000);

----------------------------
pasta db/db.js
----------------------------
// BIBLIOTECAS/MODULOS UTILIZADOS
const Sequelize = require('sequelize');
//CRIANDO A CONFIGURAÇÃO DO BANCO DE DADOS
const sequelize = new Sequelize({
dialect: 'sqlite',
storage: './mercado.sqlite'
})
//TRATANDO POSSÍVEIS ERROS E AUTENTICANDO NO BANCO
try {
sequelize.authenticate();
console.log("Banco de dados conectado com sucesso!");
}
catch (erro) {
console.log("Erro ao conectar ao banco",erro);
}
module.exports = sequelize;

----------------------------
pasta views/layouts/main.handlebars
----------------------------
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     {{! BOOSTRAP 5 }}
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
{{!-- ARQUIVOS LOCAL --}}
<div class="container">
      {{{body}}}
    </div>
     </body>
</html>
    
----------------------------
//pasta controller/clienteController.js
----------------------------

const Cliente = require("../model/clienteModel");

module.exports = class clienteController{

//CREATE
static async ClienteCreate(req,res){
let nome = req.body.nome;
let endereco = req.body.endereco;
let telefone = req.body.telefone;
let email = req.body.email;
const cliente = {
nome: nome,
endereco: endereco,
telefone: telefone,
email: email
}
await Cliente.create(cliente);
res.json({message: "Cadastro realizado com sucesso!"});
}
//READ - LISTAR
static async ClienteListar(req,res){
const id_cliente = req.params.id;
if(id_cliente){
const cliente = await Cliente.findOne({where: {id_cliente: id_cliente}});
res.json(cliente);
}else{
const cliente = await Cliente.findAll({raw:true});
res.json(cliente);
}


}

//UPDATE
static async ClienteUpdate(req, res){
const id_cliente = req.params.id;
let nome = req.body.nome;
let endereco = req.body.endereco;
let telefone = req.body.telefone;
let email = req.body.email;
const cliente = {
nome: nome,
endereco: endereco,
telefone: telefone,
email: email
};
await Cliente.update(cliente,{where: {id_cliente:id_cliente}});
res.json({message: "Cadastro atualizado com sucesso! Foram atualizados as sequintes informações: ", dados: cliente});
}

static async ClienteDelete(req,res){
const id_cliente = req.params.id;
await Cliente.destroy({where:{id_cliente: id_cliente}});

res.json({message: "Cliente excluído com sucesso!"});
}
}

----------------------------
//pasta model/clienteModel.js
----------------------------
const Sequelize = require('sequelize');
const database = require('../db/db');

const Cliente = database.define('cliente', {
id_cliente:{
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
nome:{
type: Sequelize.STRING,
allowNull: false,
},
endereco: {
type: Sequelize.STRING,
allowNull: false
},
telefone: {
type: Sequelize.STRING,
allowNull: false
},
email:{
type: Sequelize.STRING
}
}, {database,modelname:'cliente',tableName: 'clientes'})

module.exports = Cliente;

----------------------------
CASO O ALUNO TENHA REALIZADO NA MESMA API DAS AULAS PODE TER TAMBÉM OS ARQUIVOS
//pasta model/funcionarioModel.js
----------------------------
const Sequelize = require('sequelize');
const database = require('../db/db');

const Funcionario = database.define('funcionario', {
matricula:{
type: Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
nome:{
type: Sequelize.STRING,
allowNull: false,
},
endereco: {
type: Sequelize.STRING,
allowNull: false
},
telefone: {
type: Sequelize.STRING,
allowNull: false
},
email:{
type: Sequelize.STRING
},
nascimento:{
type: Sequelize.DATE,
allowNull:false
}
}, {database,modelname:'funcionario',tableName: 'funcionarios'})

module.exports = Funcionario;

----------------------------
//pasta controller/clienteController.js
----------------------------
//pasta controller/funcionarioController.js

const Funcionario = require("../model/funcionarioModel");

module.exports = class funcionarioController{

//CREATE
static async FuncionarioCreate(req,res){
let nome = req.body.nome;
let endereco = req.body.endereco;
let telefone = req.body.telefone;
let email = req.body.email;
let nascimento = req.body.nascimento;
const funcionario = {
nome: nome,
endereco: endereco,
telefone: telefone,
email: email,
nascimento: nascimento
}
await Funcionario.create(funcionario);
res.json({message: "Cadastro realizado com sucesso!"});
}
//READ - LISTAR
static async FuncionarioListar(req,res){
const matricula = req.params.id;
if(matricula){
const funcionario = await Funcionario.findOne({where: {matricula: matricula}});
res.json(funcionario);
}else{
const funcionario = await Funcionario.findAll({raw:true});
res.json(funcionario);
}


}

//UPDATE
static async FuncionarioUpdate(req, res){
const matricula = req.params.id;
let nome = req.body.nome;
let endereco = req.body.endereco;
let telefone = req.body.telefone;
let email = req.body.email;
let nascimento = req.body.nascimento;
const funcionario = {
nome: nome,
endereco: endereco,
telefone: telefone,
email: email,
nascimento: nascimento
};
await Funcionario.update(funcionario,{where: {matricula:matricula}});
res.json({message: "Cadastro atualizado com sucesso! Foram atualizados as sequintes informações: ", dados: funcionario});
}

static async FuncionarioDelete(req,res){
const matricula = req.params.id;
await Funcionario.destroy({where:{matricula: matricula}});

res.json({message: "Funcionário excluído com sucesso!"});
}
}
