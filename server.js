const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const projetos = require('./data/projetos');

// Serve arquivos estáticos (HTML, CSS, JS, imagens) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/projetos', (req, res) => {
  res.json(projetos);
});

// Fallback: qualquer rota não encontrada direciona para a página inicial
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Executa apenas quando rodado diretamente (node server.js / npm start)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// Exporta o app para a Vercel (serverless)
module.exports = app;
