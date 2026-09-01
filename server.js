const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos (HTML, CSS, JS, imagens) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Pequena API de exemplo servida pelo backend
const projetos = [
  {
    titulo: 'IkouEngine',
    descricao:
      'Engine de jogos pessoal, desenvolvida para estudo e prática de programação, ' +
      'arquitetura de software e Computer Graphics.',
    link: 'https://github.com/zLadz/IkouEngine',
    tipo: 'github',
  },
  {
    titulo: 'Ladcall',
    descricao:
      'Serviço de signaling para aplicação de chamadas (WebRTC), hospedado na nuvem via Render.',
    link: 'https://ladcall-signaling.onrender.com/',
    tipo: 'site',
  },
];

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
