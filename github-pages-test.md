# Teste público do GitHub Pages

Data do teste: 2026-08-14.

## Resultado observado

- `https://ramonsantoss.github.io/scape-room-ia/` respondeu com a página 404 padrão do GitHub Pages.
- `https://ramonsantoss.github.io/scape-room-ia/modulo/prompts` também respondeu com a página 404 padrão do GitHub Pages.
- O `curl` anterior confirmou HTTP 200 para a capa suspense e para uma amostra de videoaulas do release `v1.0.0`.
- O navegador recebeu a página 404 tanto em `/scape-room-ia/` quanto em `/scape-room-ia/modulo/prompts`, inclusive após recarregar a home com `?fresh=1`.

## Diagnóstico provisório

O domínio público não está servindo de forma consistente o artifact do workflow esperado. A configuração observada na API aponta para `main` + `/`, enquanto o bundle do Vite é gerado em `dist-pages` pelo workflow. O workflow mais recente reportou sucesso, mas é necessário confirmar a origem efetiva e a propagação do Pages antes de considerar as rotas publicadas.
