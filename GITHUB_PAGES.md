# GitHub Pages — Scape Room IA

## Publicação configurada

O repositório usa um workflow em `.github/workflows/deploy-pages.yml`. A cada push na branch `main`, o GitHub instala as dependências com pnpm, gera o bundle estático com Vite e publica o diretório `dist-pages` no GitHub Pages.

O build foi configurado para o caminho do repositório (`/scape-room-ia/`). Depois que o workflow terminar com sucesso e o Pages estiver habilitado em **Settings → Pages → Source: GitHub Actions**, a entrada pública esperada será:

| Módulo | URL pública esperada |
|---|---|
| Hub | `https://ramonsantoss.github.io/scape-room-ia/` |
| Prompts | `https://ramonsantoss.github.io/scape-room-ia/modulo/prompts` |
| Artes | `https://ramonsantoss.github.io/scape-room-ia/modulo/artes` |
| Sites | `https://ramonsantoss.github.io/scape-room-ia/modulo/sites` |
| Prompts para o dia a dia | `https://ramonsantoss.github.io/scape-room-ia/modulo/dia-a-dia` |

O arquivo `404.html` preserva as rotas do SPA quando o aluno abre diretamente uma URL de módulo ou recarrega a página.

## Domínio personalizado

Nenhum domínio foi fornecido nesta configuração, portanto não foi criado um arquivo `CNAME`. Um único repositório Pages pode servir os quatro módulos por caminhos públicos, como na tabela acima. Para quatro subdomínios diferentes — por exemplo, `prompts.exemplo.com`, `artes.exemplo.com`, `sites.exemplo.com` e `diaadia.exemplo.com` — o GitHub Pages exige que cada site seja configurado como um Pages site próprio; isso normalmente significa quatro repositórios ou quatro builds separados.

Quando o domínio estiver disponível, ele deve ser adicionado primeiro em **Settings → Pages → Custom domain** e somente depois configurado no provedor DNS. Para um subdomínio, crie um registro `CNAME` apontando para `RamonSantoss.github.io`. Não use wildcard DNS. O domínio também precisa ser verificado para reduzir risco de takeover.

## Mídia pública

As videoaulas e a capa suspense não são copiadas para o histórico do código. Elas devem ser distribuídas como ativos públicos do release `v1.0.0`, e o catálogo da aplicação usa as URLs dos assets desse release. Isso mantém o repositório leve e permite que o elemento `<video>` carregue os arquivos em um site estático.

## Observação de manutenção

Se o site passar a usar um domínio personalizado como raiz, gere novamente o bundle com `PAGES_BASE_PATH=/` e atualize o workflow. Para manter somente a URL padrão do projeto, não altere o valor atual `/scape-room-ia/`.
