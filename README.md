# LadDev

Site portfólio single-page com backend em **Node.js (Express)**.
As seções Sobre mim, Experiências, Formação e Projetos ficam na mesma página, acessíveis por âncoras.

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
  - index.html           Página única (Hero, Sobre, Objetivos, Experiências, Formação, Projetos)
  - experiencias.html    Redireciona para #experiencias
  - formacao.html        Redireciona para #formacao
  - projetos.html        Redireciona para #projetos
  - css/style.css        Tokens e layout responsivo
  - js/main.js           Player de áudio e navegação com scroll-spy
  - favicon.svg          Ícone do site
  - assets/              Foto, currículo (PDF) e trilha sonora (MP3)
- data/projetos.js       Dados dos projetos
- api/projetos.js        Função serverless para a API
- templates/             Design de referência (.pen)
```

## API

Endpoint disponível com os dados dos projetos (os cards da página são estáticos):

- `GET /api/projetos` — retorna a lista de projetos em JSON.

## Créditos de Mídia

A trilha sonora utilizada neste portfólio é de uso livre sob os termos das respectivas licenças dos autores:

*   **Música:** "Make It Happen" por [1000 Handz](https://1000handz.com)
*   **Fonte:** [Free Music Archive](https://freemusicarchive.org)
*   **Licença:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org)