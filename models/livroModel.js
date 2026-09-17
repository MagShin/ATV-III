import fs from "fs";

const CAMINHO_ARQUIVO = new URL("../livros.json", import.meta.url);

/**
 * Lê o arquivo livros.json e devolve o array de livros.
 * Caso ocorra algum erro (arquivo inexistente, JSON inválido, etc.),
 * devolve um array vazio para não quebrar a aplicação.
 */
function carregaLivros() {
  try {
    const dados = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
    return JSON.parse(dados);
  } catch (erro) {
    console.error("Erro ao carregar livros.json:", erro.message);
    return [];
  }
}

/**
 * Escreve o array de livros no arquivo livros.json,
 * formatado com indentação de 2 espaços.
 */
function salvarLivros(livros) {
  fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(livros, null, 2));
}

/**
 * Adiciona um novo livro ao array e persiste no arquivo.
 */
function adicionarLivro(novoLivro) {
  const livros = carregaLivros();
  livros.push(novoLivro);
  salvarLivros(livros);
}

/**
 * Alterna o status do livro no índice indicado
 * ("Lendo" <-> "Lido") e persiste no arquivo.
 */
function alterarStatus(indice) {
  const livros = carregaLivros();

  if (livros[indice]) {
    livros[indice].status = livros[indice].status === "Lido" ? "Lendo" : "Lido";
    salvarLivros(livros);
  }
}

/**
 * Atualiza a nota (1 a 5 estrelas) de um livro "Lido".
 */
function atualizarNota(indice, nota) {
  const livros = carregaLivros();

  if (livros[indice]) {
    livros[indice].nota = Number(nota);
    salvarLivros(livros);
  }
}

/**
 * Remove o livro do array pelo índice e persiste no arquivo.
 */
function removerLivro(indice) {
  const livros = carregaLivros();

  if (livros[indice]) {
    livros.splice(indice, 1);
    salvarLivros(livros);
  }
}

export default {
  carregaLivros,
  salvarLivros,
  adicionarLivro,
  alterarStatus,
  atualizarNota,
  removerLivro,
};
