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
| `.htaccess` | Configuração para o cPanel (página inicial e redirecionamento dos endereços antigos) |

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

## Publicação

### Opção principal: na hospedagem atual (cPanel)
O domínio abraf.org.br e o e-mail já estão no cPanel, então o site é publicado lá mesmo, sem mexer em DNS.

1. Baixe este repositório como ZIP (botão **Code → Download ZIP** no GitHub).
2. No cPanel, abra o **Gerenciador de Arquivos** e entre em `public_html`.
3. **Teste primeiro:** crie a pasta `public_html/novo`, envie o ZIP para dentro dela e use **Extrair**. Confira o site em `https://abraf.org.br/novo/`.
4. **Troca definitiva:**
   - crie `public_html/antigo` e mova para lá **todos** os arquivos do site antigo (`*.php`, `img`, `css`, `.htaccess` antigo etc.) — exceto pastas do sistema como `cgi-bin` e `.well-known`;
   - mova o conteúdo de `public_html/novo` para `public_html` (inclusive o arquivo oculto `.htaccess`; ative "Mostrar arquivos ocultos" nas configurações do Gerenciador).
5. Abra `https://abraf.org.br` e teste também um endereço antigo, como `https://abraf.org.br/historia.php` (deve redirecionar para a página nova).
6. Depois de alguns dias sem problemas, a pasta `antigo` pode ser apagada (ou mantida como backup).

O e-mail não é afetado: nada muda no DNS.

Para atualizar o site no futuro: edite os arquivos (no GitHub ou no seu computador) e envie os arquivos alterados para `public_html` pelo Gerenciador de Arquivos.

O `.htaccess` deste repositório faz o servidor abrir `index.html` em vez de `index.php` e redireciona os endereços do site antigo (`historia.php`, `eventos.php`, `manual_compliance.pdf`…) para as páginas novas, preservando links já compartilhados e o Google.

### Alternativa: GitHub Pages
Também funciona no GitHub Pages (Settings → Pages → branch `main`, pasta raiz), mas usar o domínio abraf.org.br exige mudar o DNS. Como hoje o e-mail (MX) aponta para o próprio domínio, antes seria preciso criar `mail.abraf.org.br` como registro A do servidor do cPanel e apontar o MX para ele. Prefira a opção do cPanel enquanto o e-mail estiver lá.

## Pendências de conteúdo

- [ ] Data, programação e link de inscrição do próximo evento (hoje mostra o evento de 21/11/2024).
- [ ] Chave do Web3Forms no formulário de contato.
- [ ] Confirmar a diretoria atual: a imagem do site antigo lista Adroaldo R. C. Carvalho (GPC Química) como presidente, mas a "Palavra do Presidente" é assinada por Leonardo A. G. Donoso.
- [ ] Texto do card "Mercado petrolífero" em `formol.html` (no site antigo ele repetia o texto de Fundição).
- [ ] Unidade e ano mais recente da capacidade instalada (gráfico em `formol.html`).

## Créditos

- Foto industrial (`img/industria.jpg`): Christian Harb, [Unsplash](https://unsplash.com/pt-br/fotografias/uma-fabrica-com-muitos-tubos-vermelhos-e-brancos-76yzygeNLT0) (Licença Unsplash).
- Demais imagens, logos e textos: acervo do site anterior da ABRAF.
- Fontes: Bricolage Grotesque, IBM Plex Sans e IBM Plex Mono (Google Fonts, licença OFL).
