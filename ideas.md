# Direção criativa — Scape Room IA

## Três abordagens iniciais

### Abordagem 1 — Laboratório de Sinal
Uma jornada de ficção científica editorial: painéis de observação, mapas de luz e pistas que aparecem como sinais decodificados. A sensação é de descoberta controlada, com a interface funcionando como uma cabine de missão e não como uma página de curso.

**Probability:** 0.07

### Abordagem 2 — Oficina Solar
Uma experiência clara e tátil, com papel, etiquetas e objetos de oficina criativa. A intenção é tornar a IA acolhedora e concreta, como uma bancada onde o aluno aprende fazendo.

**Probability:** 0.03

### Abordagem 3 — Arquivo Subterrâneo
Uma linguagem mais silenciosa e cinematográfica, construída com preto quente, cobre, azul-petróleo e tipografia de arquivo. O aluno atravessa uma sequência de salas como se estivesse abrindo um dossiê criativo.

**Probability:** 0.09

## Abordagem escolhida — Laboratório de Sinal

### Design Movement
**Neo-editorial de ficção científica**, combinando a precisão de interfaces de missão com o ritmo de uma publicação digital premium. A inspiração é uma sala de controle discreta, sem estética cyberpunk genérica: a tecnologia aparece como ferramenta de foco, não como decoração.

### Core Principles
1. **Uma cena por vez:** toda ação acontece dentro da janela útil, sem scroll vertical como mecanismo de progressão.
2. **Orientação visível:** cada tela deve responder “onde estou?”, “o que aprendo agora?” e “qual é a próxima ação?”.
3. **Descoberta com calma:** pistas, vídeo e exercícios entram em camadas, evitando excesso de elementos simultâneos.
4. **Precisão humana:** contraste, tipografia e feedback serão claros, acessíveis e acolhedores.

### Color Philosophy
O fundo será um carvão azulado quase preto, pensado para criar a sensação de uma sala de observação e manter o vídeo em destaque. O **verde sinal** será a cor proprietária da marca: indica descoberta, liberação e avanço. Marfim quente sustenta textos longos sem a dureza do branco puro, enquanto âmbar, coral, ciano e violeta identificam os quatro módulos com moderação. Cada cor de módulo é um marcador de navegação, não um gradiente decorativo.

### Layout Paradigm
Um **viewport de missão**: barra de status fina no topo, conteúdo em dois campos assimétricos e um rodapé de comando fixo. Na home, quatro estações orbitam um núcleo central em vez de quatro cards uniformes. Dentro de cada módulo, o vídeo ocupa o campo dominante e o painel lateral concentra objetivo, progresso e CTA. Em telas estreitas, os campos se reorganizam em camadas dentro da mesma altura, com painéis que se expandem como drawers internos — nunca como uma coluna infinita.

### Signature Elements
- **Linha de telemetria:** microtexto monoespaçado com módulo, etapa e status, usado para orientar sem poluir.
- **Porta de sinal:** um aro geométrico com pulso lento que se abre quando a aula é concluída.
- **Pistas em fragmentos:** pequenas etiquetas numeradas e conexões finas que dão ao escape room a sensação de decodificação.

### Interaction Philosophy
O aluno nunca será punido por experimentar. Cada clique produz um retorno curto — um brilho, uma mudança de estado, uma frase de confirmação ou uma dica opcional. A interface sempre oferece uma saída segura e uma próxima ação explícita. O escape room deve parecer uma sequência de pequenas descobertas, não um teste.

### Animation
As trocas de cena usarão opacidade e deslocamento curto, entre 180 e 280 ms, com uma curva de saída firme. O aro da porta terá uma pulsação muito sutil apenas em estado bloqueado/desbloqueado. Itens do puzzle aparecem em cascata de 40 a 60 ms, nunca todos simultaneamente. Botões respondem ao toque com pequena compressão. A animação não será essencial para compreender o conteúdo e será reduzida quando `prefers-reduced-motion` estiver ativo.

### Typography System
**Space Grotesk** para títulos, números e chamadas; **DM Sans** para explicações e instruções; **IBM Plex Mono** para telemetria, códigos e rótulos de estado. Títulos serão compactos e assimétricos, com peso 600–700. O corpo usará 15–17 px com altura de linha confortável. A monoespaciada ficará reservada a metadados para que permaneça distintiva.

### Brand Essence
Um laboratório guiado para pessoas que querem transformar curiosidade sobre IA em prática real, com uma experiência de aprendizagem curta, visual e jogável.

**Personalidade:** curiosa, precisa, encorajadora.

### Brand Voice
Headlines são diretas e evocativas; CTAs usam verbos de ação; microcopy reduz ansiedade e mostra a consequência do próximo clique. Evitar “bem-vindo” genérico, promessas absolutas e jargão sem explicação.

**Exemplos:**
- “A próxima pista está no jeito como você pergunta.”
- “Assista. Abra a sala. Teste uma ideia hoje.”

### Wordmark & Logo
O símbolo será um **olho de fechadura formado por três sinais orbitais**, sem texto, com um pequeno corte diagonal sugerindo uma porta se abrindo. O wordmark “Scape Room IA” usará Space Grotesk com o “IA” tratado como um bloco de telemetria em IBM Plex Mono. O símbolo aparecerá no cabeçalho, na porta do módulo e no favicon em tamanho legível.

### Signature Brand Color
**Sinal Verde — `#B8F36B`**. É um verde ácido, mas não neon, escolhido para representar o instante em que uma hipótese vira tentativa. Ele aparecerá em CTAs, estados de avanço e linhas de conexão; não será usado como preenchimento de grandes áreas.

## Regras de execução

Cada arquivo CSS, componente e página criado ou editado deverá começar com um comentário curto lembrando a parte relevante desta direção. A experiência precisa funcionar com vídeo real, estados de carregamento e falha, teclado, toque, `prefers-reduced-motion` e viewport reduzido. As páginas não devem depender de imagens externas para comunicar o conteúdo; ativos gerados funcionarão como atmosfera e identidade.

## Decisões de conteúdo provisórias

Os quatro arquivos enviados serão associados assim: `vídeoaula-PROMPTS.zip` → Prompts; `vídeoaula-artes.zip` → Artes; `vídeoaula-sites.zip` → Sites; `vídeoaula-promptdiaadia.zip` → Prompts para o dia a dia. Os textos exatos e URLs dos vídeos serão ajustados após a inspeção dos pacotes.

## Style Decisions

- O seletor da home será tratado como um **mapa orbital de missão**, com um núcleo central e linhas de conexão visíveis entre as quatro estações; a organização em 2×2 permanece apenas como base responsiva.
- O símbolo de chave-orbital terá uma moldura de sinal própria no cabeçalho, e “IA” ficará em um bloco de telemetria monoespaciado no wordmark.
- Cada sala terá uma assinatura recorrente além da cor: uma frase de sinal e um fingerprint curto, usados no briefing e na estação da home.
- A tela de briefing manterá o momento cinematográfico da porta, mas terá uma linha de “próximo sinal” explicitando que o vídeo é o primeiro objetivo funcional.
