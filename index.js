// BIBLIOTECAS/MODULOS
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const database = require("./db/db");
const Cliente = require("./model/clienteModel");
const clienteController = require("./controller/clienteController");

//SINCRONISMO COM O BANCO DE DADOS
try {
  database.sync().then(() => {});
} catch (erro) {
  console.log("Houve uma falha ao sincronizar com o banco de dados. ", erro);
}

app.get("/", (req, res) => {
  return res.json({ message: "Seja Bem vindo a API para clientes!" });
});

//POST - CADASTRAR
app.post("/Cadastrar", clienteController.ClienteCreate);

//GET - LISTAR
app.get("/Clientes/:id?", clienteController.ClienteListar);

//PUT - UPDATE
app.put("/Clientes/:id",clienteController.ClienteUpdate);

//DELETE - Excluir
app.delete("/Clientes/:id",clienteController.ClienteDelete);

app.listen(3000);
