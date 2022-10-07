import express from "express";
import * as clientes from "../controllers/clientes.js";
import bodyParser from "body-parser";
var jsonParser = bodyParser.json();

import healthController from "../controllers/healthController.js";

const router = express.Router();

router.get(
  "/",
  healthController
  // #swagger.tags = ['Health']
  // #swagger.description = 'Endpoint to check if the API is running.'
);

router.get(
  "/health",
  healthController
  // #swagger.tags = ['Health']
  // #swagger.description = 'Endpoint to check if the API is running.'
);

//Can use queries = default: page = 0, order = "asc", limit = 10
router.get("/clientes", clientes.buscarTodosOsClientes);

//Can use queries = default: page = 0, order = "desc", limit = 10
router.get("/clientes/search", jsonParser, clientes.buscarCliente);

/**
 * Passar JSON completo pra criar um cliente
 * name: String, cpf: String, telefone: String, cidade: String,
 * estado: String, logradouro: String, nascimento: String,
 * ativo: Boolean, passwords: String
 */
router.post("/clientes/create", jsonParser, clientes.criarCliente);

//Pass as JSON: id: String
router.delete("/clientes/delete", jsonParser, clientes.deletarCliente);

/**
 * Passar o ID dum JSON para modificar os dados
 * id: String
 *
 * Passar junto com o JSON o valor novo já modificado (pode ter
 * múltiplos valores)
 * name: String, cpf: String, telefone: String, cidade: String,
 * estado: String, logradouro: String, nascimento: String,
 * ativo: Boolean, passwords: String
 */
router.put("/clientes/update", jsonParser, clientes.updateCliente);

export default router;
