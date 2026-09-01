# LadDev

Site portfólio com backend em **Node.js (Express)**, inspirado no visual do site de referência.
Contém páginas de Sobre mim, Experiências, Formação e Projetos.

## Como rodar

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Ou em modo desenvolvimento (reinicia automático):

```bash
npm run dev
```

Acesse em: http://localhost:3000

## Estrutura

```
- server.js              Backend Node.js/Express
- public/
  - index.html           Sobre mim
  - experiencias.html    Experiências
  - formacao.html        Formação
  - projetos.html        Projetos
  - css/style.css        Estilos do tema
  - js/main.js           Interações (cursor e zoom de fotos)
  - assets/              Imagens (SVG) e currículo (PDF) de exemplo
```

## API

Endpoint de exemplo consumido pela página de Projetos:

- `GET /api/projetos` — retorna a lista de projetos em JSON.
