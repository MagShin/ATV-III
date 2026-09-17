import { Router } from "express";
import livroController from "../controllers/livroController.js";

const router = Router();

// Lista todos os livros da estante
router.get("/", livroController.listar);

// Exibe o formulário de cadastro de um novo livro
router.get("/novo", livroController.formNovo);

// Recebe os dados do formulário e cria um novo livro
router.post("/novo", livroController.criar);

// Alterna o status de leitura ("Lendo" <-> "Lido")
router.get("/status/:indice", livroController.alterarStatus);

// Salva a nota (estrelas) de um livro lido
router.post("/avaliar/:indice", livroController.avaliar);

// Remove um livro da estante
router.get("/remover/:indice", livroController.remover);

export default router;
