import livroModel from "../models/livroModel.js";

/**
 * Busca todos os livros e renderiza a tela principal (estante),
 * incluindo um resumo com total de livros, quantos foram lidos
 * e a soma total de páginas lidas (Desafio Extra 1).
 */
function listar(req, res) {
  const livros = livroModel.carregaLivros();

  const totalLivros = livros.length;
  const totalLidos = livros.filter((livro) => livro.status === "Lido").length;
  const totalPaginasLidas = livros
    .filter((livro) => livro.status === "Lido")
    .reduce((soma, livro) => soma + Number(livro.paginas || 0), 0);

  res.render("principal", {
    livros,
    resumo: { totalLivros, totalLidos, totalPaginasLidas },
  });
}

/**
 * Renderiza o formulário de cadastro de um novo livro.
 */
function formNovo(req, res) {
  res.render("novoLivro");
}

/**
 * Recebe os dados do formulário, monta o objeto do novo livro
 * com status inicial "Lendo" e persiste via Model.
 */
function criar(req, res) {
  const { titulo, autor, paginas } = req.body;

  const novoLivro = {
    titulo,
    autor,
    paginas: Number(paginas),
    status: "Lendo",
    nota: 0,
  };

  livroModel.adicionarLivro(novoLivro);
  res.redirect("/livros");
}

/**
 * Alterna o status ("Lendo" <-> "Lido") do livro indicado pelo índice na URL.
 */
function alterarStatus(req, res) {
  const { indice } = req.params;
  livroModel.alterarStatus(Number(indice));
  res.redirect("/livros");
}

/**
 * Atualiza a nota (1 a 5 estrelas) de um livro "Lido".
 */
function avaliar(req, res) {
  const { indice } = req.params;
  const { nota } = req.body;
  livroModel.atualizarNota(Number(indice), nota);
  res.redirect("/livros");
}

/**
 * Remove o livro indicado pelo índice na URL.
 */
function remover(req, res) {
  const { indice } = req.params;
  livroModel.removerLivro(Number(indice));
  res.redirect("/livros");
}

export default {
  listar,
  formNovo,
  criar,
  alterarStatus,
  avaliar,
  remover,
};
