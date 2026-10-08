# Site da ABRAF

Site institucional da **ABRAF — Associação Brasileira dos Produtores de Formol e Derivados**.

É um site **estático**: só HTML, CSS e um pouco de JavaScript. Não tem banco de dados, servidor, painel administrativo, framework nem etapa de build. Para mudar qualquer coisa basta editar o arquivo `.html` correspondente num editor de texto (ou direto no GitHub) e salvar.

## Estrutura

| Arquivo | Página |
|---|---|
| `index.html` | Página inicial |
| `quem-somos.html` | História, Objetivos, Estrutura, Diretoria e Associados |
| `formol.html` | O que é formol, Processo de fabricação, Capacidade instalada, Utilização e Presença na vida |
| `eventos.html` | Evento atual, programação, inscrição e edições anteriores |
| `compliance.html` | Resumo e download do Manual de Compliance |
| `contato.html` | Formulário de contato |
| `css/style.css` | Estilos compartilhados (estados do menu, banner, animações) |
| `js/site.js` | Menu do celular, banner rotativo, seção com scroll da home e envio do formulário |
| `img/` | Imagens e logos |
| `docs/manual-compliance-abraf.pdf` | Manual de Compliance |

O cabeçalho e o rodapé se repetem em todas as páginas. Se mudar um link do menu, mude nos 6 arquivos.

## Tarefas comuns

### Atualizar o evento
1. Em `eventos.html`, troque o título, a data, o horário, o local, o valor e a programação.
2. Na página inicial (`index.html`), atualize a faixa azul "Próximo evento" (título, dia, mês, horário e local).
3. Troque o link de inscrição: procure por `href="#inscricao"` em `eventos.html` (aparece 2 vezes) e coloque o link do Google Forms.

### Configurar o formulário de contato (uma vez só)
O formulário usa o [Web3Forms](https://web3forms.com), gratuito e sem servidor.
1. Acesse https://web3forms.com, informe o e-mail **abraf@abraf.org.br** e copie a "Access Key" recebida.
2. Em `contato.html`, troque `COLE-AQUI-A-CHAVE-DO-WEB3FORMS` pela chave.

As mensagens passam a chegar nesse e-mail.

### Trocar a diretoria
Em `quem-somos.html`, procure a seção `id="diretoria"`. Cada pessoa é um bloco `<article>` com logo da empresa, cargo, nome e empresa.

### Trocar ou adicionar associados
Os logos ficam em `img/associados/` em duas versões: escura (`nome.png`, para fundo claro) e clara (`nome-branco.png`, para fundo escuro). Eles aparecem em `quem-somos.html` (seção `id="associados"`) e na página inicial (parte "04 / 04 · Associados").

### Trocar o Manual de Compliance
Substitua `docs/manual-compliance-abraf.pdf` mantendo o mesmo nome.

## Publicação (GitHub Pages, gratuito)

1. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`.
2. Em alguns minutos o site fica no ar em `https://<usuario>.github.io/<repositorio>/`.
3. Toda alteração enviada para a `main` é publicada automaticamente.

### Usar o domínio abraf.org.br
1. Em **Settings → Pages → Custom domain**, informe `abraf.org.br` (o GitHub cria o arquivo `CNAME`).
2. No painel do domínio (Registro.br), aponte o domínio para o GitHub Pages conforme a [documentação oficial](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. **Atenção ao e-mail:** se o abraf@abraf.org.br estiver hospedado no cPanel atual, mantenha os registros **MX** (e SPF/DKIM) existentes ao mexer no DNS. Altere apenas os registros do site (A/AAAA do domínio e CNAME do `www`). Do contrário o e-mail para de funcionar.
4. Depois de propagar, marque **Enforce HTTPS**.

## Pendências de conteúdo

- [ ] Data, programação e link de inscrição do próximo evento (hoje mostra o evento de 21/11/2024).
- [ ] Chave do Web3Forms no formulário de contato.
- [ ] Texto do card "Mercado petrolífero" em `formol.html` (no site antigo ele repetia o texto de Fundição).
- [ ] Unidade e ano mais recente da capacidade instalada (gráfico em `formol.html`).

## Créditos

- Foto industrial (`img/industria.jpg`): Christian Harb, [Unsplash](https://unsplash.com/pt-br/fotografias/uma-fabrica-com-muitos-tubos-vermelhos-e-brancos-76yzygeNLT0) (Licença Unsplash).
- Demais imagens, logos e textos: acervo do site anterior da ABRAF.
- Fontes: Bricolage Grotesque, IBM Plex Sans e IBM Plex Mono (Google Fonts, licença OFL).
