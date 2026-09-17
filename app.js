import express from "express";
import livroRoutes from "./routes/livroRoutes.js";

const app = express();
const PORTA = 8080;

// Configuração do motor de templates
app.set("view engine", "ejs");

// Middleware para interpretar dados de formulários (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Rota raiz de apresentação da aplicação
app.get("/", (req, res) => {
  res.render("index");
});

// Conecta o roteador modular de livros
app.use("/livros", livroRoutes);

// Inicia o servidor
app.listen(PORTA, () => {
  console.log(`📚 Minha Estante rodando em http://localhost:${PORTA}`);
});
