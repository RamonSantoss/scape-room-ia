/* Design reminder: neo-editorial mission lab, one scene at a time, signal green for progress. */

export type ModuleKey = "prompts" | "artes" | "sites" | "dia-a-dia";

const VIDEO_BASE_URL = "https://github.com/RamonSantoss/scape-room-ia/releases/download/v1.0.0";
const video = (filename: string) => `${VIDEO_BASE_URL}/${filename}`;
const PLAYER_COVER_URL = `${VIDEO_BASE_URL}/player-suspense-cover.jpg`;

export type Chapter = {
  title: string;
  storageUrl: string;
};

export type Puzzle = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
};

export type ModuleData = {
  key: ModuleKey;
  eyebrow: string;
  title: string;
  shortTitle: string;
  fingerprint: string;
  signalPhrase: string;
  description: string;
  outcome: string;
  color: string;
  softColor: string;
  sceneImage: string;
  coverImage: string;
  duration: string;
  aiLink: string;
  aiLabel: string;
  practice: string;
  practicePrompt: string;
  chapters: Chapter[];
  puzzles: Puzzle[];
};

export const modules: ModuleData[] = [
  {
    key: "prompts",
    eyebrow: "MÓDULO 01 / CLAREZA",
    title: "Prompts que abrem portas",
    shortTitle: "Prompts",
    fingerprint: "C.LAR / CONTEXTO",
    signalPhrase: "SINAL DE CLAREZA",
    description: "Aprenda a transformar uma intenção solta em uma instrução que a IA entende e consegue executar.",
    outcome: "Você sai sabendo pedir com contexto, papel, formato e critério.",
    color: "#B8F36B",
    softColor: "#293A22",
    sceneImage: "/manus-storage/room-prompts_085b772e.jpg",
    coverImage: PLAYER_COVER_URL,
    duration: "7 aulas · 42 min",
    aiLink: "https://chatgpt.com/",
    aiLabel: "Abrir uma IA de conversa",
    practice: "Peça à IA para transformar uma tarefa real sua em um plano de 5 passos.",
    practicePrompt: "Você é um especialista em organização. Transforme esta tarefa em um plano de 5 passos, com resultado esperado e uma pergunta de checagem ao final: [escreva sua tarefa].",
    chapters: [
      { title: "Prompt — aula 1", storageUrl: video("Prompt_-_aula_1.mp4") },
      { title: "Como estruturar pedidos para IA", storageUrl: video("Como_Estruturar_Pedidos_Para_IA.mp4") },
      { title: "A regra da clareza cirúrgica", storageUrl: video("A_Regra_da_Clareza_Cirurgica.mp4") },
      { title: "Aprendendo com exemplos", storageUrl: video("Aprendendo_com_Exemplos.mp4") },
      { title: "Assumindo personagens", storageUrl: video("Assumindo_Personagens.mp4") },
      { title: "Pensando passo a passo", storageUrl: video("Pensando_Passo_a_Passo.mp4") },
      { title: "Engenharia de prompt", storageUrl: video("Engenharia_de_Prompt.mp4") },
    ],
    puzzles: [
      { prompt: "Para uma IA responder melhor, qual peça vem antes da tarefa?", options: ["Contexto", "Pressa", "Um emoji"], answer: 0, hint: "Dê à IA a situação antes de dizer o que ela deve fazer." },
      { prompt: "Qual pedido é mais claro?", options: ["Faça algo bom", "Escreva 3 opções de título para uma aula de IA, em tom direto", "Surpreenda-me"], answer: 1, hint: "Objetivo, quantidade e tom deixam o caminho visível." },
      { prompt: "O que fecha um bom prompt?", options: ["Critério de revisão", "Mais palavras aleatórias", "Nada: envie e torça"], answer: 0, hint: "Diga como você quer avaliar ou melhorar a resposta." },
    ],
  },
  {
    key: "artes",
    eyebrow: "MÓDULO 02 / VISÃO",
    title: "Artes que começam na ideia",
    shortTitle: "Artes",
    fingerprint: "L.ENS / LUZ",
    signalPhrase: "SINAL DE VISÃO",
    description: "Aprenda a dirigir imagens com intenção: conceito, composição, luz, estilo e limites claros.",
    outcome: "Você sai sabendo conversar com uma IA visual como quem dirige uma cena.",
    color: "#FFC978",
    softColor: "#493A25",
    sceneImage: "/manus-storage/room-artes_e8edb56f.jpg",
    coverImage: PLAYER_COVER_URL,
    duration: "7 aulas · 45 min",
    aiLink: "https://chatgpt.com/",
    aiLabel: "Abrir uma IA de imagens",
    practice: "Crie uma imagem de capa para um projeto seu, descrevendo primeiro a cena e depois refinando o resultado.",
    practicePrompt: "Crie uma imagem de capa para [projeto]. Mostre [sujeito] em [ambiente], com [luz], [paleta], [estilo visual] e enquadramento [tipo de plano]. Evite [elementos indesejados].",
    chapters: [
      { title: "Prompt artes — aula 1", storageUrl: video("Prompt_Artes_-_1.mp4") },
      { title: "Os 4 pilares do prompt de imagem", storageUrl: video("Os_4_Pilares_do_Prompt_de_Imagem.mp4") },
      { title: "Dirigindo a IA para imagens", storageUrl: video("Dirigindo_a_IA_Para_Imagens.mp4") },
      { title: "Do conceito à imagem com IA", storageUrl: video("Do_Conceito_a_Imagem_com_IA.mp4") },
      { title: "O poder do não", storageUrl: video("O_Poder_do_Nao_.mp4") },
      { title: "Prompts: direção de arte com IA", storageUrl: video("Prompts_Direcao_de_Arte_com_IA.mp4") },
      { title: "Dominando a arte com IA", storageUrl: video("Dominando_a_Arte_com_IA.mp4") },
    ],
    puzzles: [
      { prompt: "Qual informação define o que deve aparecer na cena?", options: ["Sujeito", "Sorteio", "Silêncio"], answer: 0, hint: "Comece pelo que a câmera precisa encontrar." },
      { prompt: "O que muda a sensação de uma imagem?", options: ["Luz e paleta", "O nome do arquivo", "Deixar tudo em branco"], answer: 0, hint: "Direção visual é também clima." },
      { prompt: "Para corrigir uma imagem, o melhor caminho é…", options: ["Refinar com instruções específicas", "Apagar tudo sem observar", "Adicionar qualquer adjetivo"], answer: 0, hint: "Observe o que está errado e peça uma mudança por vez." },
    ],
  },
  {
    key: "sites",
    eyebrow: "MÓDULO 03 / CONSTRUÇÃO",
    title: "Sites que saem do papel",
    shortTitle: "Sites",
    fingerprint: "E.STR / ESTRUTURA",
    signalPhrase: "SINAL DE CONSTRUÇÃO",
    description: "Entenda como transformar uma ideia em estrutura, texto e interface — mesmo começando do zero.",
    outcome: "Você sai sabendo conversar com a IA sobre páginas, blocos e refinamentos.",
    color: "#7FE8E3",
    softColor: "#1D3F42",
    sceneImage: "/manus-storage/room-sites_fb00b045.jpg",
    coverImage: PLAYER_COVER_URL,
    duration: "7 aulas · 44 min",
    aiLink: "https://chatgpt.com/",
    aiLabel: "Abrir uma IA para criar sites",
    practice: "Descreva uma página que você gostaria de colocar no ar e peça à IA uma primeira estrutura.",
    practicePrompt: "Quero criar uma página para [público e objetivo]. Organize a estrutura em: hero, prova/explicação, benefícios, processo e CTA. Para cada bloco, sugira título, texto curto e ação.",
    chapters: [
      { title: "Prompts sites — aula 1", storageUrl: video("Prompts_Sites_-_aula_1.mp4") },
      { title: "Construindo o projeto do seu site", storageUrl: video("Construindo_o_Projeto_do_Seu_Site_com_IA.mp4") },
      { title: "Prompts de IA para websites", storageUrl: video("Prompts_de_IA_para_Websites.mp4") },
      { title: "IA e código: crie uma página", storageUrl: video("IA_e_Codigo_Crie_uma_Pagina.mp4") },
      { title: "Textos persuasivos com IA", storageUrl: video("Textos_Persuasivos_com_IA.mp4") },
      { title: "COSTAR: páginas web com IA", storageUrl: video("COSTAR_Paginas_Web_com_IA.mp4") },
      { title: "Refinamento e correção com IA", storageUrl: video("Refinamento_e_Correcao_com_IA.mp4") },
    ],
    puzzles: [
      { prompt: "Antes de escolher cores, o que uma página precisa saber?", options: ["Público e objetivo", "A sombra do botão", "O nome da fonte mais famosa"], answer: 0, hint: "Uma página existe para alguém fazer algo." },
      { prompt: "Qual bloco explica o próximo passo?", options: ["CTA", "Rodapé vazio", "Imagem aleatória"], answer: 0, hint: "Call to action é o convite para agir." },
      { prompt: "Como melhorar uma primeira versão?", options: ["Testar, observar e refinar", "Publicar sem olhar", "Mudar tudo ao mesmo tempo"], answer: 0, hint: "Refinamento é um ciclo, não um chute." },
    ],
  },
  {
    key: "dia-a-dia",
    eyebrow: "MÓDULO 04 / RITMO",
    title: "IA para o dia a dia",
    shortTitle: "Dia a dia",
    fingerprint: "R.IT / RITMO",
    signalPhrase: "SINAL DE RITMO",
    description: "Use a IA para estudar, organizar e decidir melhor — com exemplos que cabem na sua rotina real.",
    outcome: "Você sai com um jeito simples de transformar uma necessidade em conversa útil.",
    color: "#D4B4FF",
    softColor: "#372B4A",
    sceneImage: "/manus-storage/room-dia-a-dia_e595bd19.jpg",
    coverImage: PLAYER_COVER_URL,
    duration: "6 aulas · 38 min",
    aiLink: "https://chatgpt.com/",
    aiLabel: "Abrir uma IA para praticar",
    practice: "Escolha uma tarefa real de hoje e peça à IA para organizar o primeiro passo, sem terceirizar sua decisão.",
    practicePrompt: "Tenho esta situação hoje: [descreva]. Ajude-me a organizar opções, próximos passos e uma pergunta que eu devo responder antes de decidir. Não decida por mim.",
    chapters: [
      { title: "A matriz de Eisenhower com IA", storageUrl: video("A_Matriz_de_Eisenhower_com_IA.mp4") },
      { title: "Cronograma de estudo com IA", storageUrl: video("Cronograma_de_Estudo_com_IA.mp4") },
      { title: "Gabaritando provas com IA", storageUrl: video("Gabaritando_Provas_com_IA.mp4") },
      { title: "IA: o princípio 80/20", storageUrl: video("IA_O_Principio_80_20.mp4") },
      { title: "Resumos inteligentes", storageUrl: video("Resumos_Inteligentes.mp4") },
      { title: "Revisão semanal com IA", storageUrl: video("Revisao_Semanal_com_IA.mp4") },
    ],
    puzzles: [
      { prompt: "Qual é o primeiro passo para usar IA numa tarefa real?", options: ["Nomear a situação", "Pedir para a IA adivinhar", "Começar pelo resultado final"], answer: 0, hint: "Descreva o que está acontecendo com suas próprias palavras." },
      { prompt: "Para estudar melhor, o que ajuda a IA?", options: ["Tema, prazo e nível atual", "Apenas a palavra ‘estudar’", "Nenhum contexto"], answer: 0, hint: "Quanto mais concreto o cenário, mais útil o plano." },
      { prompt: "Quem toma a decisão final?", options: ["Você, usando a IA como apoio", "A primeira resposta", "O acaso"], answer: 0, hint: "IA ajuda a pensar; sua realidade decide." },
    ],
  },
];

export const moduleByKey = Object.fromEntries(modules.map((module) => [module.key, module])) as Record<ModuleKey, ModuleData>;
