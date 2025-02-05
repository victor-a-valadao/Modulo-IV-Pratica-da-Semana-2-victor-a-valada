const Cliente = require("../model/clienteModel");

module.exports = class clienteController {
  //CREATE
  static async ClienteCreate(req, res) {
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
    await Cliente.create(cliente);
    res.json({ message: "Cadastrado realizado com sucesso!" });
  }

  // READ - LISTAR
  static async ClienteListar(req, res) {
    const id_cliente = req.params.id;
    if (id_cliente){
      const cliente = await Cliente.findOne({where: {id_cliente: id_cliente}});
      res.json(cliente);
    }else{
    const cliente = await Cliente.findAll({ raw: true });
    res.json(cliente);   
    }
  }

  //UPDATE
  static async ClienteUpdate(req, res) {
    const id_cliente = req.params.id;
    let nome = req.body.nome;
    let endereco = req.body.endereco;
    let telefone = req.body.telefone;
    let email = req.body.email;

    const cliente = {
      nome: nome,
      endereco: endereco,
      telefone: telefone,
      email: email,
    };
    await Cliente.update(cliente, { where: { id_cliente: id_cliente } });
    res.json({ message: "Cadastro atualizado com sucesso! Foram atualizadas as seguintes informações: ", dados: cliente});
  }

   //DELETE
   static async ClienteDelete(req,res) {
   const id_cliente = req.params.id;
   await Cliente.destroy({ where: { id_cliente: id_cliente }});
   res.json({message: "Cliente excluído com sucesso!"});
   }
};
