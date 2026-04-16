export interface SeedResource {
  type: 'book' | 'course' | 'article' | 'video' | 'project' | 'docs' | 'paper'
  title: string
  url: string | null
  author: string | null
}

export interface SeedTopic {
  slug: string
  title: string
  titlePt: string
  description: string
  descriptionPt: string
  depth: 'broad' | 'deep' | 'optional'
  estimatedHours: number | null
  priority: number
  resources: SeedResource[]
}

export interface SeedPillar {
  slug: string
  title: string
  titlePt: string
  description: string
  descriptionPt: string
  color: string
  topics: SeedTopic[]
}

const seedData: SeedPillar[] = [
  {
    slug: 'mental-model',
    title: 'Mental Model',
    titlePt: 'Modelo Mental',
    description: 'Foundational ways of thinking about software systems',
    descriptionPt: 'Formas fundamentais de pensar sobre sistemas de software',
    color: '#fabd2f',
    topics: [
      {
        slug: 'systems-thinking',
        title: 'Systems thinking',
        titlePt: 'Pensamento sistêmico',
        description: `Understand the path from keypress to pixel. Trace how data flows through the entire stack.

**Why it matters:** Without systems thinking, you optimize local problems while ignoring global bottlenecks. This skill lets you debug faster, design better architectures, and communicate effectively across teams.

**Study approach:** Pick one concrete path (e.g., "user clicks a button") and trace it layer by layer: browser event → HTTP request → server routing → database query → response → render. Draw a diagram each time. Repeat for different system types (API call, file upload, WebSocket message).

**Practice:**
- Trace a request through a system you use daily — draw every hop
- Read the source of one layer you don't understand (e.g., how does Express route a request?)
- Write a 1-page "How X Works" doc for a service you maintain`,
        descriptionPt: `Entenda o caminho do pressionamento de tecla ao pixel. Rastreie como os dados fluem por toda a stack.

**Por que importa:** Sem pensamento sistêmico, você otimiza problemas locais ignorando gargalos globais. Essa habilidade permite debugar mais rápido, projetar arquiteturas melhores e se comunicar efetivamente entre equipes.

**Abordagem de estudo:** Escolha um caminho concreto (ex: "usuário clica um botão") e rastreie camada por camada: evento do browser → requisição HTTP → roteamento do servidor → consulta ao banco → resposta → renderização. Desenhe um diagrama cada vez. Repita para diferentes tipos de sistema.

**Prática:**
- Rastreie uma requisição em um sistema que você usa diariamente — desenhe cada salto
- Leia o código-fonte de uma camada que você não entende
- Escreva um doc de 1 página "Como X funciona" para um serviço que você mantém`,
        depth: 'deep',
        estimatedHours: 40,
        priority: 4,
        resources: [
          { type: 'book', title: 'How Linux Works', url: null, author: 'Brian Ward' },
          { type: 'book', title: 'Computer Systems: A Programmer\'s Perspective', url: null, author: 'Randal E. Bryant, David R. O\'Hallaron' },
          { type: 'video', title: 'What happens when you type a URL into your browser', url: 'https://www.youtube.com/watch?v=AlkDbnbv7dk', author: null },
          { type: 'article', title: 'What happens when...', url: 'https://github.com/alex/what-happens-when', author: 'Alex Gaynor' },
        ],
      },
      {
        slug: 'reading-code',
        title: 'Reading code as a first-class skill',
        titlePt: 'Leitura de código como habilidade primária',
        description: `Develop the ability to read and understand unfamiliar codebases quickly.

**Why it matters:** You will read 10x more code than you write. The ability to quickly orient in an unfamiliar codebase is the highest-leverage skill for a developer who works with AI — you must be able to verify and understand generated code.

**Study approach:** Deliberate practice, not passive reading. Pick a project, set a timer for 30 minutes, and answer specific questions: "Where does authentication happen?" "How does data get from the API to the UI?" Start from entry points (main, index, routes) and follow the call graph.

**Practice:**
- Pick 3 open-source projects of increasing complexity. For each, find and document the main data flow in 30 minutes
- Read a PR review from a senior dev — understand their reasoning
- Read the source of a library you use daily (e.g., your HTTP client, your test framework)`,
        descriptionPt: `Desenvolva a capacidade de ler e entender codebases desconhecidos rapidamente.

**Por que importa:** Você lerá 10x mais código do que escreve. A capacidade de se orientar rapidamente em uma codebase desconhecida é a habilidade de maior alavancagem para um dev que trabalha com IA — você precisa verificar e entender código gerado.

**Abordagem de estudo:** Prática deliberada, não leitura passiva. Escolha um projeto, configure um timer de 30 minutos e responda perguntas específicas: "Onde acontece a autenticação?" "Como os dados vão da API para a UI?"

**Prática:**
- Escolha 3 projetos open-source de complexidade crescente. Para cada um, documente o fluxo principal em 30 minutos
- Leia um code review de um dev sênior — entenda o raciocínio
- Leia o código-fonte de uma lib que você usa diariamente`,
        depth: 'broad',
        estimatedHours: 20,
        priority: 4,
        resources: [
          { type: 'book', title: 'Code Reading: The Open Source Perspective', url: null, author: 'Diomidis Spinellis' },
          { type: 'article', title: 'How to Read Code', url: null, author: null },
          { type: 'project', title: 'Read the source of Express.js or Fastify — trace a request', url: null, author: null },
        ],
      },
      {
        slug: 'hypothesis-driven-debugging',
        title: 'Hypothesis-driven debugging',
        titlePt: 'Debugging orientado por hipóteses',
        description: `Debug systematically: form a hypothesis, design an experiment to test it, observe the result, and iterate.

**Why it matters:** Random debugging (changing things until it works) doesn't scale. A disciplined approach saves hours and builds intuition. This is especially critical when debugging AI-generated code — you need a method, not just "try again."

**Study approach:** Practice the scientific method applied to code. For every bug: (1) state what you expect, (2) state what actually happens, (3) form a hypothesis about why, (4) design the smallest test that distinguishes your hypothesis from alternatives. Keep a debugging journal.

**Practice:**
- Next 5 bugs you encounter: write down your hypothesis before changing any code
- Practice binary search debugging: narrow the problem space by half each step
- Debug a problem using only logs and assertions (no debugger)`,
        descriptionPt: `Depure sistematicamente: forme uma hipótese, projete um experimento para testá-la, observe o resultado e itere.

**Por que importa:** Debugging aleatório (mudar coisas até funcionar) não escala. Uma abordagem disciplinada economiza horas e constrói intuição. Especialmente crítico ao debugar código gerado por IA.

**Abordagem de estudo:** Pratique o método científico aplicado a código. Para cada bug: (1) declare o que espera, (2) o que realmente acontece, (3) forme uma hipótese, (4) projete o menor teste que distingue sua hipótese. Mantenha um diário de debugging.

**Prática:**
- Nos próximos 5 bugs: escreva sua hipótese antes de alterar qualquer código
- Pratique debugging por busca binária: reduza o espaço do problema pela metade a cada passo
- Depure um problema usando apenas logs e assertions (sem debugger)`,
        depth: 'broad',
        estimatedHours: 15,
        priority: 3,
        resources: [
          { type: 'book', title: 'Debugging: The 9 Indispensable Rules', url: null, author: 'David J. Agans' },
          { type: 'article', title: 'How to Debug', url: 'https://blog.regehr.org/archives/199', author: 'John Regehr' },
        ],
      },
      {
        slug: 'taste-in-abstractions',
        title: 'Taste in abstractions',
        titlePt: 'Bom gosto em abstrações',
        description: `Develop judgment for when to abstract and when not to. Understand the cost of the wrong abstraction versus duplication.

**Why it matters:** AI tools generate abstractions eagerly. Without taste, you'll accept premature generalizations that make code harder to change. The wrong abstraction is worse than duplication — this is one of the most important lessons in software design.

**Study approach:** Study real-world examples of good and bad abstractions. Read codebases that are famously well-designed (Redis, SQLite, Go stdlib). For each abstraction you encounter, ask: "What would happen if I inlined this?" If the answer is "not much," it's probably premature.

**Practice:**
- Find 3 abstractions in your codebase. For each, argue for and against keeping it
- Refactor one over-abstracted module by inlining. Note what gets simpler
- Read Sandi Metz's "The Wrong Abstraction" and apply its criteria to code you wrote last month`,
        descriptionPt: `Desenvolva julgamento sobre quando abstrair e quando não. Entenda o custo da abstração errada versus duplicação.

**Por que importa:** Ferramentas de IA geram abstrações avidamente. Sem bom gosto, você aceitará generalizações prematuras que tornam o código mais difícil de mudar. A abstração errada é pior que duplicação.

**Abordagem de estudo:** Estude exemplos reais de abstrações boas e ruins. Leia codebases famosas por bom design (Redis, SQLite, Go stdlib). Para cada abstração, pergunte: "O que aconteceria se eu fizesse inline?"

**Prática:**
- Encontre 3 abstrações na sua codebase. Para cada uma, argumente a favor e contra
- Refatore um módulo over-abstracted fazendo inline. Note o que ficou mais simples
- Leia "The Wrong Abstraction" de Sandi Metz e aplique seus critérios ao código que você escreveu no mês passado`,
        depth: 'deep',
        estimatedHours: 30,
        priority: 4,
        resources: [
          { type: 'article', title: 'The Wrong Abstraction', url: 'https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction', author: 'Sandi Metz' },
          { type: 'book', title: 'A Philosophy of Software Design', url: null, author: 'John Ousterhout' },
          { type: 'video', title: 'Simple Made Easy', url: 'https://www.infoq.com/presentations/Simple-Made-Easy/', author: 'Rich Hickey' },
        ],
      },
      {
        slug: 'modeling-simplification',
        title: 'Modeling & simplification',
        titlePt: 'Modelagem & simplificação',
        description: `Reduce problems to known patterns (queue, cache, pipeline, state machine). Prefer simpler architectures; resist unnecessary abstraction — especially from AI-generated code.

**Why it matters:** Most software problems map to a small set of well-understood patterns. Recognizing which pattern fits is the core of system design. AI will propose novel architectures — your job is to ask: "Can this be a simple queue instead?"

**Study approach:** Build a personal catalog of patterns. Every time you see a system, classify it: is this a pipeline? A pub/sub? A state machine? A cache invalidation problem? Practice reducing complex descriptions to their essential shape.

**Practice:**
- Describe 5 systems you've worked on using only: queue, cache, pipeline, state machine, pub/sub, CRUD
- Take a complex architecture diagram and simplify it — what can you remove?
- Design a system on paper before writing any code. Defend each component's existence`,
        descriptionPt: `Reduza problemas a padrões conhecidos (fila, cache, pipeline, máquina de estados). Prefira arquiteturas mais simples; resista à abstração desnecessária — especialmente de código gerado por IA.

**Por que importa:** A maioria dos problemas de software se mapeia a um conjunto pequeno de padrões bem entendidos. Reconhecer qual padrão se encaixa é o cerne do design de sistemas.

**Abordagem de estudo:** Construa um catálogo pessoal de padrões. Toda vez que vir um sistema, classifique: é um pipeline? Um pub/sub? Uma máquina de estados?

**Prática:**
- Descreva 5 sistemas usando apenas: fila, cache, pipeline, máquina de estados, pub/sub, CRUD
- Pegue um diagrama de arquitetura complexo e simplifique — o que você pode remover?
- Projete um sistema no papel antes de escrever código. Defenda a existência de cada componente`,
        depth: 'deep',
        estimatedHours: 30,
        priority: 5,
        resources: [
          { type: 'book', title: 'A Philosophy of Software Design', url: null, author: 'John Ousterhout' },
          { type: 'article', title: 'Design Patterns', url: null, author: 'Gang of Four' },
          { type: 'video', title: 'Simple Made Easy', url: 'https://www.infoq.com/presentations/Simple-Made-Easy/', author: 'Rich Hickey' },
        ],
      },
      {
        slug: 'invariants-correctness',
        title: 'Invariants & correctness',
        titlePt: 'Invariantes & corretude',
        description: `Define non-negotiable properties early (e.g., "no data loss", "idempotent operations"). Use invariants to guide debugging and validate AI output.

**Why it matters:** Invariants are your safety net. When you define them upfront, you can verify AI-generated code mechanically: "Does this preserve my invariant?" This is the most reliable way to catch subtle bugs that tests miss.

**Study approach:** For every system you build, write down 3-5 invariants before writing code. Examples: "total balance across all accounts is always zero", "every request gets exactly one response", "deleted records never reappear." Then verify these hold through code review and assertions.

**Practice:**
- Write invariants for a system you currently maintain. Check if any are violated
- Add runtime assertions for your 3 most important invariants
- Review AI-generated code by checking it against your stated invariants`,
        descriptionPt: `Defina propriedades inegociáveis cedo (ex: "sem perda de dados", "operações idempotentes"). Use invariantes para guiar a depuração e validar a saída da IA.

**Por que importa:** Invariantes são sua rede de segurança. Quando definidos antecipadamente, você pode verificar código gerado por IA mecanicamente: "Isso preserva minha invariante?"

**Abordagem de estudo:** Para cada sistema que construir, escreva 3-5 invariantes antes de escrever código. Depois verifique se são mantidas através de code review e assertions.

**Prática:**
- Escreva invariantes para um sistema que você mantém. Verifique se alguma é violada
- Adicione assertions em runtime para suas 3 invariantes mais importantes
- Revise código gerado por IA verificando contra suas invariantes declaradas`,
        depth: 'deep',
        estimatedHours: 25,
        priority: 5,
        resources: [
          { type: 'book', title: 'Program Proofs', url: null, author: 'K. Rustan M. Leino' },
          { type: 'article', title: 'Designing for Correctness', url: null, author: null },
        ],
      },
      {
        slug: 'failure-modes-thinking',
        title: 'Failure modes thinking',
        titlePt: 'Pensamento sobre modos de falha',
        description: `Go beyond "how it works" to "how it breaks". Network latency, packet loss, partial failures in distributed systems, backpressure and timeouts.

**Why it matters:** Happy-path thinking is the default. Senior engineers distinguish themselves by asking "what happens when this fails?" before shipping. Every production incident you prevent saves days of firefighting.

**Study approach:** For every feature you build, write a "failure mode analysis" before coding: list 5 ways it can fail and what happens in each case. Study post-mortems from companies like Google, Cloudflare, and GitHub — they reveal patterns of failure that repeat across all systems.

**Practice:**
- Write a failure mode analysis for a feature you shipped recently
- Read 5 public post-mortems. Extract the common failure patterns
- Intentionally break a system you control (kill a service, corrupt data, add latency) and observe what happens`,
        descriptionPt: `Vá além de "como funciona" para "como quebra". Latência de rede, perda de pacotes, falhas parciais em sistemas distribuídos, backpressure e timeouts.

**Por que importa:** Pensar no caminho feliz é o padrão. Engenheiros seniores se distinguem perguntando "o que acontece quando isso falha?" antes de entregar.

**Abordagem de estudo:** Para cada feature, escreva uma "análise de modos de falha" antes de codificar: liste 5 formas de falhar e o que acontece em cada caso. Estude post-mortems de empresas como Google, Cloudflare e GitHub.

**Prática:**
- Escreva uma análise de modos de falha para uma feature que você entregou recentemente
- Leia 5 post-mortems públicos. Extraia padrões comuns de falha
- Quebre intencionalmente um sistema que você controla e observe o que acontece`,
        depth: 'deep',
        estimatedHours: 30,
        priority: 4,
        resources: [
          { type: 'book', title: 'Release It!', url: null, author: 'Michael T. Nygard' },
          { type: 'article', title: 'How Complex Systems Fail', url: 'https://how.complexsystems.fail/', author: 'Richard Cook' },
          { type: 'article', title: 'Post-mortems collection', url: 'https://github.com/danluu/post-mortems', author: 'Dan Luu' },
        ],
      },
    ],
  },
  {
    slug: 'core-broad',
    title: 'Core Knowledge: Broad Layer',
    titlePt: 'Conhecimento Base: Camada Ampla',
    description: 'Foundational technical skills every developer needs',
    descriptionPt: 'Habilidades técnicas fundamentais que todo desenvolvedor precisa',
    color: '#83a598',
    topics: [
      {
        slug: 'data-structures-algorithms',
        title: 'Data structures & algorithms fundamentals',
        titlePt: 'Fundamentos de estruturas de dados & algoritmos',
        description: `Know the core data structures (arrays, hash maps, trees, graphs, heaps) and when to use each. Understand time/space complexity intuitively.

**Why it matters:** This is the vocabulary of problem-solving. You don't need to memorize sorting algorithms, but you must recognize when a problem is "this is a graph traversal" or "this needs a priority queue." AI can write the implementation, but you choose the data structure.

**Study approach:** Focus on intuition over memorization. For each data structure, understand: what operations are fast? What operations are slow? When would I pick this over alternatives? Implement the core ones from scratch once, then never again — the understanding is the point.

**Practice:**
- Implement a hash map, a binary search tree, and a min-heap from scratch
- Solve 30 carefully chosen problems (not grind — pick problems that teach different patterns)
- For every API you design, justify the data structure choice in a comment`,
        descriptionPt: `Conheça as estruturas de dados principais (arrays, hash maps, árvores, grafos, heaps) e quando usar cada uma. Entenda complexidade tempo/espaço intuitivamente.

**Por que importa:** Este é o vocabulário da resolução de problemas. Você não precisa memorizar algoritmos de ordenação, mas deve reconhecer quando um problema é "uma travessia de grafo" ou "precisa de uma priority queue."

**Abordagem de estudo:** Foque em intuição sobre memorização. Para cada estrutura, entenda: que operações são rápidas? Quais são lentas? Quando escolheria esta sobre alternativas?

**Prática:**
- Implemente um hash map, uma BST e um min-heap do zero
- Resolva 30 problemas escolhidos com cuidado (não grind — escolha problemas que ensinam padrões diferentes)
- Para cada API que projetar, justifique a escolha da estrutura de dados`,
        depth: 'broad',
        estimatedHours: 50,
        priority: 5,
        resources: [
          { type: 'book', title: 'Grokking Algorithms', url: null, author: 'Aditya Bhargava' },
          { type: 'course', title: 'Neetcode 150', url: 'https://neetcode.io/practice', author: null },
          { type: 'book', title: 'Introduction to Algorithms (CLRS)', url: null, author: 'Cormen, Leiserson, Rivest, Stein' },
          { type: 'project', title: 'Implement a hash map and binary search tree from scratch', url: null, author: null },
        ],
      },
      {
        slug: 'systems-language',
        title: 'One systems language: Rust or Go',
        titlePt: 'Uma linguagem de sistemas: Rust ou Go',
        description: `Learn a systems-level language to understand memory management, concurrency primitives, and performance constraints.

**Why it matters:** Even if you primarily work in TypeScript or Python, understanding a lower-level language changes how you think about all code. You'll understand why garbage collection pauses happen, what "zero-cost abstractions" means, and how concurrent programs can go wrong.

**Study approach:** Pick one and go deep enough to build something real. For Rust: work through the book + Rustlings, then build a CLI tool. For Go: do the Tour of Go, then build an HTTP server. The goal is not to become a Rust expert — it's to understand the concerns that higher-level languages hide from you.

**Practice:**
- Build a CLI tool that processes files (e.g., a log parser, a CSV transformer)
- Write a concurrent program that uses channels/mutexes
- Reimplement something you built in JS/Python and compare the thought process`,
        descriptionPt: `Aprenda uma linguagem de nível de sistemas para entender gerenciamento de memória, primitivas de concorrência e restrições de performance.

**Por que importa:** Mesmo que trabalhe primariamente em TypeScript ou Python, entender uma linguagem de nível mais baixo muda como você pensa sobre todo código.

**Abordagem de estudo:** Escolha uma e vá fundo o suficiente para construir algo real. Para Rust: livro + Rustlings, depois construa uma ferramenta CLI. Para Go: Tour of Go, depois construa um servidor HTTP.

**Prática:**
- Construa uma ferramenta CLI que processa arquivos
- Escreva um programa concorrente usando channels/mutexes
- Reimplemente algo que construiu em JS/Python e compare o processo mental`,
        depth: 'broad',
        estimatedHours: 80,
        priority: 5,
        resources: [
          { type: 'book', title: 'The Rust Programming Language', url: 'https://doc.rust-lang.org/book/', author: 'Steve Klabnik, Carol Nichols' },
          { type: 'project', title: 'Rustlings', url: 'https://github.com/rust-lang/rustlings', author: null },
          { type: 'book', title: 'The Go Programming Language', url: null, author: 'Alan Donovan, Brian Kernighan' },
          { type: 'course', title: 'Tour of Go', url: 'https://go.dev/tour/', author: null },
        ],
      },
      {
        slug: 'scripting-language',
        title: 'One scripting language: Python or TypeScript',
        titlePt: 'Uma linguagem de script: Python ou TypeScript',
        description: `Achieve fluency in a high-level scripting language for rapid prototyping, automation, and glue code.

**Why it matters:** This is your daily driver for getting things done fast. Fluency means you can express ideas without fighting the language — essential for prototyping, scripting, and writing the "glue" that connects systems.

**Study approach:** The best way to learn a scripting language is to use it for everything for 30 days: automation scripts, data processing, API prototypes, tooling. Read the language's idiomatic guide (Fluent Python, Effective TypeScript) to move beyond "it works" to "it's well-written."

**Practice:**
- Automate 3 manual tasks you do regularly (file processing, API calls, data cleanup)
- Build a small API server with proper error handling and validation
- Write a script that interacts with 2+ external services and handles failures gracefully`,
        descriptionPt: `Alcance fluência em uma linguagem de script de alto nível para prototipagem rápida, automação e código de integração.

**Por que importa:** Esta é sua ferramenta diária para fazer coisas rapidamente. Fluência significa expressar ideias sem lutar com a linguagem.

**Abordagem de estudo:** Use para tudo por 30 dias: scripts de automação, processamento de dados, protótipos de API, tooling. Leia o guia idiomático da linguagem.

**Prática:**
- Automatize 3 tarefas manuais que faz regularmente
- Construa um pequeno servidor API com tratamento de erros e validação
- Escreva um script que interage com 2+ serviços externos e trata falhas graciosamente`,
        depth: 'broad',
        estimatedHours: 60,
        priority: 5,
        resources: [
          { type: 'book', title: 'Fluent Python', url: null, author: 'Luciano Ramalho' },
          { type: 'docs', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', author: null },
          { type: 'book', title: 'Effective TypeScript', url: null, author: 'Dan Vanderkam' },
        ],
      },
      {
        slug: 'sql-fluency',
        title: 'SQL fluency beyond ORMs',
        titlePt: 'Fluência em SQL além de ORMs',
        description: `Indexes, query plans, denormalization. Understand what your ORM is doing under the hood.

**Why it matters:** Every application talks to a database. ORMs hide SQL, but they can't hide performance. When your query is slow, you need to read the query plan, understand indexing, and know when to denormalize. This is not optional knowledge.

**Study approach:** Learn by doing, not by reading. Set up a database with realistic data (100k+ rows), write queries, and use EXPLAIN ANALYZE to understand what's happening. Learn to read query plans before learning to optimize them.

**Practice:**
- Load a dataset with 100k+ rows. Write 10 queries of increasing complexity
- For each query, run EXPLAIN ANALYZE and optimize based on the plan
- Identify the 3 slowest queries in a project you maintain and optimize them`,
        descriptionPt: `Índices, planos de consulta, desnormalização. Entenda o que seu ORM faz por baixo dos panos.

**Por que importa:** Toda aplicação conversa com um banco de dados. ORMs escondem SQL, mas não escondem performance. Quando sua query é lenta, você precisa ler o plano de execução.

**Abordagem de estudo:** Aprenda fazendo. Configure um banco com dados realistas (100k+ linhas), escreva queries e use EXPLAIN ANALYZE.

**Prática:**
- Carregue um dataset com 100k+ linhas. Escreva 10 queries de complexidade crescente
- Para cada query, rode EXPLAIN ANALYZE e otimize baseado no plano
- Identifique as 3 queries mais lentas em um projeto que mantém e otimize-as`,
        depth: 'broad',
        estimatedHours: 40,
        priority: 5,
        resources: [
          { type: 'book', title: 'SQL Performance Explained', url: 'https://use-the-index-luke.com/', author: 'Markus Winand' },
          { type: 'course', title: 'SQLBolt', url: 'https://sqlbolt.com/', author: null },
          { type: 'book', title: 'Database Design for Mere Mortals', url: null, author: 'Michael J. Hernandez' },
        ],
      },
      {
        slug: 'http-dns-tls',
        title: 'HTTP, DNS, TLS fundamentals',
        titlePt: 'Fundamentos de HTTP, DNS, TLS',
        description: `Understand the core protocols of the web.

**Why it matters:** Every web application is built on these protocols. Debugging "the request isn't reaching the server" requires understanding DNS resolution, TLS handshakes, HTTP methods, headers, and status codes at a level deeper than "200 means OK."

**Study approach:** Use tools to observe protocols in action: \`curl -v\`, \`dig\`, \`openssl s_client\`, browser DevTools Network tab. The best way to learn HTTP is to build a simple HTTP server from a raw TCP socket.

**Practice:**
- Use \`curl -v\` to trace 5 different requests. Annotate each header
- Set up a local DNS resolver and observe query resolution
- Build a minimal HTTP/1.1 server that handles GET/POST using only TCP sockets`,
        descriptionPt: `Entenda os protocolos fundamentais da web.

**Por que importa:** Toda aplicação web é construída sobre estes protocolos. Debugar "a requisição não chega no servidor" requer entender resolução DNS, handshake TLS, métodos HTTP e headers em profundidade.

**Abordagem de estudo:** Use ferramentas para observar protocolos em ação: \`curl -v\`, \`dig\`, \`openssl s_client\`, aba Network do DevTools.

**Prática:**
- Use \`curl -v\` para rastrear 5 requisições diferentes. Anote cada header
- Configure um resolver DNS local e observe a resolução de queries
- Construa um servidor HTTP/1.1 mínimo usando apenas sockets TCP`,
        depth: 'broad',
        estimatedHours: 25,
        priority: 4,
        resources: [
          { type: 'book', title: 'HTTP: The Definitive Guide', url: null, author: 'David Gourley, Brian Totty' },
          { type: 'article', title: 'How DNS Works', url: 'https://howdns.works/', author: null },
          { type: 'article', title: 'The Illustrated TLS 1.3 Connection', url: 'https://tls13.xargs.org/', author: 'Michael Driscoll' },
        ],
      },
      {
        slug: 'linux-shell-editor',
        title: 'Linux shell + a fast editor: neovim/helix',
        titlePt: 'Shell Linux + um editor rápido: neovim/helix',
        description: `Be productive in a terminal. Know your shell, your editor, and how to combine Unix tools.

**Why it matters:** The terminal is the most powerful and flexible interface for software development. Mastery of shell commands, pipes, and a modal editor compounds — every second saved on common operations adds up to hours per week.

**Study approach:** Make the terminal your default environment for 30 days. No GUI file managers, no GUI git clients. When you need to do something, find the command. Invest 15 minutes per day in your editor config and shortcuts. Use spaced repetition for keybindings.

**Practice:**
- Complete vimtutor 3 times (it gets faster each time)
- Write 5 shell one-liners that solve real problems (log parsing, file renaming, process management)
- Set up a dotfiles repo and iterate on your shell configuration weekly`,
        descriptionPt: `Seja produtivo no terminal. Conheça seu shell, seu editor e como combinar ferramentas Unix.

**Por que importa:** O terminal é a interface mais poderosa e flexível para desenvolvimento. Domínio de comandos shell, pipes e um editor modal se compõe — cada segundo economizado se acumula.

**Abordagem de estudo:** Faça do terminal seu ambiente padrão por 30 dias. Sem gerenciadores de arquivo GUI, sem git GUI. Invista 15 minutos/dia no config do editor.

**Prática:**
- Complete o vimtutor 3 vezes (fica mais rápido a cada vez)
- Escreva 5 one-liners que resolvem problemas reais
- Configure um repo de dotfiles e itere semanalmente`,
        depth: 'broad',
        estimatedHours: 50,
        priority: 5,
        resources: [
          { type: 'book', title: 'The Linux Command Line', url: 'https://linuxcommand.org/tlcl.php', author: 'William Shotts' },
          { type: 'docs', title: 'Neovim Documentation', url: 'https://neovim.io/doc/', author: null },
          { type: 'course', title: 'Vimtutor', url: null, author: null },
        ],
      },
      {
        slug: 'git-advanced',
        title: 'Git beyond add/commit/push',
        titlePt: 'Git além de add/commit/push',
        description: `Rebase, bisect, reflog. Understand the DAG. Be confident recovering from any git state.

**Why it matters:** Git is the version control system for software. Fumbling with git costs real time and can cause data loss. Confidence with advanced git operations (interactive rebase, bisect, reflog recovery) separates productive developers from those who are afraid of their own tools.

**Study approach:** Learn the data model first (commits are nodes in a DAG, branches are pointers, HEAD is a pointer to a pointer). Once you understand the model, commands become intuitive. Practice in a throwaway repo where mistakes don't matter.

**Practice:**
- Create a messy git history and clean it up with interactive rebase
- Use \`git bisect\` to find a real regression in a project
- Intentionally "lose" commits and recover them with reflog`,
        descriptionPt: `Rebase, bisect, reflog. Entenda o DAG. Tenha confiança para recuperar qualquer estado do git.

**Por que importa:** Git é o sistema de controle de versão do software. Tropeçar com git custa tempo real e pode causar perda de dados.

**Abordagem de estudo:** Aprenda o modelo de dados primeiro (commits são nós em um DAG, branches são ponteiros). Uma vez que entenda o modelo, os comandos se tornam intuitivos.

**Prática:**
- Crie um histórico git bagunçado e limpe com rebase interativo
- Use \`git bisect\` para encontrar uma regressão real em um projeto
- Intencionalmente "perca" commits e recupere com reflog`,
        depth: 'broad',
        estimatedHours: 20,
        priority: 4,
        resources: [
          { type: 'book', title: 'Pro Git', url: 'https://git-scm.com/book/en/v2', author: 'Scott Chacon, Ben Straub' },
          { type: 'article', title: 'Git from the inside out', url: 'https://codewords.recurse.com/issues/two/git-from-the-inside-out', author: 'Mary Rose Cook' },
        ],
      },
      {
        slug: 'docker-compose-deep',
        title: 'Docker + compose deeply',
        titlePt: 'Docker + compose a fundo',
        description: `Understand images, layers, networking, volumes, multi-stage builds.

**Why it matters:** Containers are the deployment unit of modern software. Understanding Docker deeply means you can debug build failures, optimize image sizes, secure your containers, and design multi-service architectures that work in both development and production.

**Study approach:** Build real Dockerfiles, not toy examples. Containerize a multi-service application with a database, cache, and web server. Debug networking issues between containers. Optimize a multi-stage build to minimize image size.

**Practice:**
- Containerize a project with a multi-stage build (build + runtime stages)
- Set up a docker-compose with 3+ services and debug their networking
- Reduce an existing Docker image size by 50%+ through layer optimization`,
        descriptionPt: `Entenda imagens, camadas, rede, volumes, builds multi-estágio.

**Por que importa:** Containers são a unidade de deploy do software moderno. Entender Docker profundamente significa debugar falhas de build, otimizar tamanhos de imagem e projetar arquiteturas multi-serviço.

**Abordagem de estudo:** Construa Dockerfiles reais. Containerize uma aplicação multi-serviço com banco, cache e web server. Depure problemas de rede entre containers.

**Prática:**
- Containerize um projeto com build multi-estágio
- Configure um docker-compose com 3+ serviços e depure a rede
- Reduza o tamanho de uma imagem Docker existente em 50%+ através de otimização de camadas`,
        depth: 'broad',
        estimatedHours: 30,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Docker Documentation', url: 'https://docs.docker.com/', author: null },
          { type: 'book', title: 'Docker Deep Dive', url: null, author: 'Nigel Poulton' },
          { type: 'project', title: 'Build your own Docker', url: null, author: null },
        ],
      },
      {
        slug: 'testing-tdd',
        title: 'Testing strategy & test-driven development',
        titlePt: 'Estratégia de testes & desenvolvimento orientado a testes',
        description: `Know when to write unit tests, integration tests, and end-to-end tests. Understand the testing pyramid and when to violate it.

**Why it matters:** Tests are the only way to refactor with confidence. Without tests, every change is a gamble. But bad tests (brittle, slow, testing implementation details) are worse than no tests — they slow you down and give false confidence. The skill is knowing *what* to test and *how*.

**Study approach:** Start with the testing pyramid: many unit tests, fewer integration tests, even fewer E2E tests. Then learn when to break this rule (some systems are better served by integration tests). Write tests for real bugs you've encountered — that builds intuition for what's worth testing.

**Practice:**
- Write tests for the last 3 bugs you fixed. Each test should fail before the fix and pass after
- Refactor a module with full test coverage — notice how tests enable fearless changes
- Set up a CI pipeline that blocks merges on test failure`,
        descriptionPt: `Saiba quando escrever testes unitários, de integração e end-to-end. Entenda a pirâmide de testes e quando violá-la.

**Por que importa:** Testes são a única forma de refatorar com confiança. Sem testes, cada mudança é uma aposta. Mas testes ruins são piores que nenhum teste — a habilidade é saber *o que* testar e *como*.

**Abordagem de estudo:** Comece com a pirâmide de testes. Depois aprenda quando quebrar essa regra. Escreva testes para bugs reais que encontrou.

**Prática:**
- Escreva testes para os últimos 3 bugs que corrigiu
- Refatore um módulo com cobertura de testes completa
- Configure um pipeline CI que bloqueia merges em falha de testes`,
        depth: 'broad',
        estimatedHours: 35,
        priority: 5,
        resources: [
          { type: 'book', title: 'Unit Testing Principles, Practices, and Patterns', url: null, author: 'Vladimir Khorikov' },
          { type: 'article', title: 'Testing Trophy', url: null, author: 'Kent C. Dodds' },
          { type: 'book', title: 'Test Driven Development: By Example', url: null, author: 'Kent Beck' },
        ],
      },
      {
        slug: 'api-design',
        title: 'API design: REST, GraphQL, gRPC',
        titlePt: 'Design de APIs: REST, GraphQL, gRPC',
        description: `Design APIs that are intuitive, consistent, and evolvable. Understand the tradeoffs between different API styles.

**Why it matters:** APIs are the contracts between systems. A well-designed API is a joy to use and easy to extend. A poorly designed one creates ongoing pain for every consumer. This skill becomes critical as you work with AI systems that expose and consume APIs.

**Study approach:** Study well-designed APIs (Stripe, GitHub, Twilio) and analyze what makes them good: naming conventions, error handling, pagination, versioning. Then design your own API and have someone else try to use it without documentation — their confusion reveals your design flaws.

**Practice:**
- Design an API for a domain you know well. Write the spec before any code
- Compare the same feature built with REST vs GraphQL — when does each shine?
- Review 3 APIs you consume. List what's good and what's confusing about each`,
        descriptionPt: `Projete APIs intuitivas, consistentes e evoluíveis. Entenda os tradeoffs entre diferentes estilos de API.

**Por que importa:** APIs são os contratos entre sistemas. Uma API bem projetada é prazerosa de usar e fácil de estender. Uma mal projetada cria dor contínua para cada consumidor.

**Abordagem de estudo:** Estude APIs bem projetadas (Stripe, GitHub, Twilio) e analise o que as torna boas. Depois projete sua própria API e peça para alguém usá-la sem documentação.

**Prática:**
- Projete uma API para um domínio que conhece bem. Escreva a spec antes de qualquer código
- Compare a mesma feature com REST vs GraphQL — quando cada um brilha?
- Revise 3 APIs que você consome. Liste o que é bom e confuso em cada uma`,
        depth: 'broad',
        estimatedHours: 25,
        priority: 4,
        resources: [
          { type: 'article', title: 'Stripe API Design', url: 'https://docs.stripe.com/api', author: null },
          { type: 'article', title: 'Microsoft REST API Guidelines', url: 'https://github.com/microsoft/api-guidelines', author: null },
          { type: 'book', title: 'Designing Web APIs', url: null, author: 'Brenda Jin, Saurabh Sahni, Amir Shevat' },
          { type: 'docs', title: 'GraphQL Best Practices', url: 'https://graphql.org/learn/best-practices/', author: null },
        ],
      },
    ],
  },
  {
    slug: 'core-deep',
    title: 'Core Knowledge: Deep Layer',
    titlePt: 'Conhecimento Base: Camada Profunda',
    description: 'Advanced technical knowledge for deeper understanding',
    descriptionPt: 'Conhecimento técnico avançado para um entendimento mais profundo',
    color: '#b8bb26',
    topics: [
      {
        slug: 'distributed-systems',
        title: 'Distributed systems: consensus, CAP, eventual consistency',
        titlePt: 'Sistemas distribuídos: consenso, CAP, consistência eventual',
        description: `Understand the fundamental challenges and trade-offs of building systems that span multiple machines.

**Why it matters:** Modern software is distributed by default — microservices, cloud functions, CDNs. Understanding why distributed systems are hard (network partitions, clock skew, partial failures) prevents you from building systems that work in dev but fail in production.

**Study approach:** Start with DDIA (the "bible" of this topic). Then work through the MIT 6.824 labs. The key insight: theory matters here because the failure modes are unintuitive. You can't learn distributed systems just by building things — you need the conceptual framework first.

**Practice:**
- Implement a simple key-value store that replicates across 3 nodes
- Work through the Fly.io distributed systems challenges
- Read the Raft paper and implement a simplified version`,
        descriptionPt: `Entenda os desafios fundamentais e trade-offs de construir sistemas que abrangem múltiplas máquinas.

**Por que importa:** Software moderno é distribuído por padrão. Entender por que sistemas distribuídos são difíceis previne construir sistemas que funcionam em dev mas falham em produção.

**Abordagem de estudo:** Comece com DDIA. Depois trabalhe nos labs do MIT 6.824. Teoria importa aqui porque os modos de falha são contra-intuitivos.

**Prática:**
- Implemente um key-value store simples que replica entre 3 nós
- Complete os desafios de sistemas distribuídos do Fly.io
- Leia o paper do Raft e implemente uma versão simplificada`,
        depth: 'deep',
        estimatedHours: 60,
        priority: 4,
        resources: [
          { type: 'book', title: 'Designing Data-Intensive Applications', url: null, author: 'Martin Kleppmann' },
          { type: 'paper', title: 'Time, Clocks, and the Ordering of Events in a Distributed System', url: 'https://lamport.azurewebsites.net/pubs/time-clocks.pdf', author: 'Leslie Lamport' },
          { type: 'course', title: 'MIT 6.824: Distributed Systems', url: 'https://pdos.csail.mit.edu/6.824/', author: null },
        ],
      },
      {
        slug: 'database-internals',
        title: 'Database internals: B-trees, LSM trees, MVCC',
        titlePt: 'Internos de banco de dados: B-trees, LSM trees, MVCC',
        description: `Understand how databases actually store, index, and retrieve data.

**Why it matters:** When you understand how a B-tree index works, you stop guessing about query performance. When you understand MVCC, you can reason about concurrent transactions. This knowledge transforms database work from "try it and see" to "I know what will happen."

**Study approach:** Read Database Internals by Alex Petrov for theory, then build a toy database to internalize the concepts. The "build your own SQLite" tutorial is exceptional — it walks you through building a database from scratch, page by page.

**Practice:**
- Build a simple B-tree implementation that supports insert/search/delete
- Implement a basic LSM tree with memtable and SSTable flush
- Work through the "Build your own SQLite" tutorial end-to-end`,
        descriptionPt: `Entenda como bancos de dados realmente armazenam, indexam e recuperam dados.

**Por que importa:** Quando você entende como um índice B-tree funciona, para de adivinhar sobre performance de queries. Quando entende MVCC, consegue raciocinar sobre transações concorrentes.

**Abordagem de estudo:** Leia Database Internals para teoria, depois construa um toy database para internalizar os conceitos.

**Prática:**
- Construa uma implementação de B-tree com insert/search/delete
- Implemente uma LSM tree básica com memtable e flush para SSTable
- Complete o tutorial "Build your own SQLite" do início ao fim`,
        depth: 'deep',
        estimatedHours: 50,
        priority: 5,
        resources: [
          { type: 'book', title: 'Database Internals', url: null, author: 'Alex Petrov' },
          { type: 'book', title: 'Designing Data-Intensive Applications', url: null, author: 'Martin Kleppmann' },
          { type: 'project', title: 'Build your own SQLite', url: 'https://cstack.github.io/db_tutorial/', author: null },
        ],
      },
      {
        slug: 'ai-engineering',
        title: 'AI engineering: deployment, evaluation, RAG, prompt pipelines',
        titlePt: 'Engenharia de IA: deploy, avaliação, RAG, pipelines de prompt',
        description: `Build production AI features. Understand embeddings, RAG, evaluation frameworks, and prompt engineering at scale.

**Why it matters:** AI engineering is the defining skill of this era. But it's not just about calling an API — production AI requires evaluation pipelines, retrieval systems, context management, cost optimization, and guardrails. The gap between a demo and a production system is enormous.

**Study approach:** Build end-to-end: a RAG system with real data, proper chunking, evaluation metrics, and a feedback loop. Don't just read about it — deploy it and measure the quality. The evaluation pipeline is more important than the model itself.

**Practice:**
- Build a RAG system over your own data (notes, docs, codebase). Measure retrieval quality
- Create an evaluation suite for a prompt-based feature with 50+ test cases
- Build a pipeline that routes between models based on task complexity and cost constraints`,
        descriptionPt: `Construa features de IA para produção. Entenda embeddings, RAG, frameworks de avaliação e engenharia de prompts em escala.

**Por que importa:** Engenharia de IA é a habilidade definidora desta era. Mas não é só chamar uma API — IA em produção requer pipelines de avaliação, sistemas de retrieval, gerenciamento de contexto e guardrails.

**Abordagem de estudo:** Construa end-to-end: um sistema RAG com dados reais, chunking adequado, métricas de avaliação e loop de feedback.

**Prática:**
- Construa um sistema RAG sobre seus próprios dados. Meça a qualidade de retrieval
- Crie uma suite de avaliação para uma feature baseada em prompt com 50+ casos de teste
- Construa um pipeline que roteia entre modelos baseado em complexidade e custos`,
        depth: 'deep',
        estimatedHours: 60,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Anthropic Documentation', url: 'https://docs.anthropic.com/', author: null },
          { type: 'docs', title: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/', author: null },
          { type: 'article', title: 'Building RAG-based LLM Applications for Production', url: null, author: null },
        ],
      },
      {
        slug: 'compilers',
        title: 'Compilers and language design',
        titlePt: 'Compiladores e design de linguagens',
        description: `Understand parsing, ASTs, type checking, and code generation.

**Why it matters:** Compiler knowledge has unexpected leverage: understanding ASTs helps you write better linters and code transforms, understanding parsing helps you design better DSLs and configuration languages, and the discipline of language design improves all your API and abstraction choices.

**Study approach:** Work through Crafting Interpreters from start to finish. It's the best teaching material in all of CS — practical, incremental, and deeply satisfying. Build both the tree-walk interpreter and the bytecode VM.

**Practice:**
- Build a complete interpreter for a small language (Crafting Interpreters walks you through this)
- Write a linter or code formatter for a language you use
- Design a small DSL for a domain problem you care about`,
        descriptionPt: `Entenda parsing, ASTs, verificação de tipos e geração de código.

**Por que importa:** Conhecimento de compiladores tem alavancagem inesperada: entender ASTs ajuda a escrever melhores linters, entender parsing ajuda a projetar melhores DSLs.

**Abordagem de estudo:** Complete Crafting Interpreters do início ao fim. É o melhor material de ensino em toda a ciência da computação.

**Prática:**
- Construa um interpretador completo para uma linguagem pequena
- Escreva um linter ou formatter para uma linguagem que usa
- Projete uma DSL pequena para um problema de domínio que te importa`,
        depth: 'optional',
        estimatedHours: 80,
        priority: 3,
        resources: [
          { type: 'book', title: 'Crafting Interpreters', url: 'https://craftinginterpreters.com/', author: 'Robert Nystrom' },
          { type: 'course', title: 'Build Your Own Lisp', url: 'https://www.buildyourownlisp.com/', author: 'Daniel Holden' },
        ],
      },
      {
        slug: 'security',
        title: 'Security: threat modeling, crypto fundamentals',
        titlePt: 'Segurança: modelagem de ameaças, fundamentos de criptografia',
        description: `Think about security systematically. Understand common vulnerabilities and applied cryptography.

**Why it matters:** Security breaches are among the most expensive bugs. Understanding OWASP top 10, basic threat modeling, and why you should never roll your own crypto is table stakes. With AI systems, new attack surfaces (prompt injection, data exfiltration) make this even more critical.

**Study approach:** Start with the OWASP Top 10 — understand each vulnerability with real examples. Then learn threat modeling: for every system, ask "who are the adversaries, what are they after, and how could they get it?" Applied crypto: understand hashing, symmetric/asymmetric encryption, and TLS at a conceptual level.

**Practice:**
- Do a threat model for a system you maintain: identify 5 attack vectors
- Find and fix a security vulnerability in your own code (SQL injection, XSS, etc.)
- Complete a beginner CTF challenge set (OverTheWire Bandit, PicoCTF)`,
        descriptionPt: `Pense em segurança sistematicamente. Entenda vulnerabilidades comuns e criptografia aplicada.

**Por que importa:** Brechas de segurança estão entre os bugs mais caros. Com sistemas de IA, novas superfícies de ataque (injeção de prompt, exfiltração de dados) tornam isso ainda mais crítico.

**Abordagem de estudo:** Comece com o OWASP Top 10. Depois aprenda threat modeling. Criptografia aplicada: entenda hashing, criptografia simétrica/assimétrica e TLS a nível conceitual.

**Prática:**
- Faça um threat model para um sistema que mantém: identifique 5 vetores de ataque
- Encontre e corrija uma vulnerabilidade no seu próprio código
- Complete um conjunto de desafios CTF para iniciantes (OverTheWire Bandit, PicoCTF)`,
        depth: 'deep',
        estimatedHours: 35,
        priority: 3,
        resources: [
          { type: 'book', title: 'Serious Cryptography', url: null, author: 'Jean-Philippe Aumasson' },
          { type: 'docs', title: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/', author: null },
          { type: 'project', title: 'OverTheWire Bandit', url: 'https://overthewire.org/wargames/bandit/', author: null },
        ],
      },
      {
        slug: 'performance-engineering',
        title: 'Performance engineering: profiling, cache hierarchies',
        titlePt: 'Engenharia de performance: profiling, hierarquias de cache',
        description: `Learn to measure before optimizing. Understand CPU caches, memory hierarchy, and profiling tools.

**Why it matters:** Premature optimization is the root of all evil, but knowing *when* and *where* to optimize is a superpower. The difference between a system that handles 100 req/s and 10,000 req/s is often a few key optimizations in the right places. Measurement-driven optimization beats guessing every time.

**Study approach:** Always measure first: use profilers (perf, flamegraphs, browser DevTools Performance tab) to identify the actual bottleneck before changing code. Learn the memory hierarchy (L1/L2/L3 cache, RAM, disk) — most performance gains come from cache-friendly data access patterns, not clever algorithms.

**Practice:**
- Profile a real application and find the top 3 bottlenecks. Fix one
- Write two versions of the same algorithm: cache-friendly vs cache-unfriendly. Benchmark the difference
- Generate a flamegraph for a service you maintain and explain what you see`,
        descriptionPt: `Aprenda a medir antes de otimizar. Entenda caches de CPU, hierarquia de memória e ferramentas de profiling.

**Por que importa:** Otimização prematura é a raiz de todo mal, mas saber *quando* e *onde* otimizar é um superpoder.

**Abordagem de estudo:** Sempre meça primeiro: use profilers para identificar o gargalo real antes de mudar código. Aprenda a hierarquia de memória.

**Prática:**
- Profile uma aplicação real e encontre os 3 maiores gargalos. Corrija um
- Escreva duas versões do mesmo algoritmo: cache-friendly vs cache-unfriendly. Benchmark a diferença
- Gere um flamegraph para um serviço que mantém e explique o que vê`,
        depth: 'deep',
        estimatedHours: 40,
        priority: 3,
        resources: [
          { type: 'book', title: 'Systems Performance', url: null, author: 'Brendan Gregg' },
          { type: 'article', title: 'What Every Programmer Should Know About Memory', url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf', author: 'Ulrich Drepper' },
          { type: 'article', title: 'Flame Graphs', url: 'https://www.brendangregg.com/flamegraphs.html', author: 'Brendan Gregg' },
        ],
      },
      {
        slug: 'observability-profiling',
        title: 'Observability & profiling',
        titlePt: 'Observabilidade & profiling',
        description: `Logs, metrics, and tracing as first-class tools. Know how to profile CPU/memory/I/O, trace a request across services. Debugging without observability does not scale.

**Why it matters:** You can't fix what you can't see. In production, you don't have a debugger — you have logs, metrics, and traces. Good observability is the difference between resolving an incident in 5 minutes vs 5 hours.

**Study approach:** Instrument a real application with the three pillars: structured logging (not printf debugging), metrics (counters, histograms, gauges), and distributed tracing (trace ID across service boundaries). Use OpenTelemetry — it's the industry standard.

**Practice:**
- Add structured logging to a service (JSON logs with correlation IDs)
- Set up Prometheus + Grafana for a service and create a useful dashboard
- Implement distributed tracing across 2+ services with OpenTelemetry`,
        descriptionPt: `Logs, métricas e tracing como ferramentas de primeira classe. Saiba como fazer profile de CPU/memória/I/O, rastrear uma requisição entre serviços.

**Por que importa:** Você não pode consertar o que não pode ver. Em produção, não tem debugger — tem logs, métricas e traces.

**Abordagem de estudo:** Instrumente uma aplicação real com os três pilares: logging estruturado, métricas e tracing distribuído. Use OpenTelemetry.

**Prática:**
- Adicione logging estruturado a um serviço (logs JSON com correlation IDs)
- Configure Prometheus + Grafana e crie um dashboard útil
- Implemente tracing distribuído entre 2+ serviços com OpenTelemetry`,
        depth: 'deep',
        estimatedHours: 35,
        priority: 5,
        resources: [
          { type: 'book', title: 'Observability Engineering', url: null, author: 'Charity Majors, Liz Fong-Jones, George Miranda' },
          { type: 'book', title: 'Distributed Tracing in Practice', url: null, author: 'Austin Parker et al.' },
          { type: 'docs', title: 'OpenTelemetry Documentation', url: 'https://opentelemetry.io/docs/', author: null },
        ],
      },
      {
        slug: 'practical-distributed-systems',
        title: 'Practical distributed systems',
        titlePt: 'Sistemas distribuídos na prática',
        description: `Don't stay theoretical (Raft, CAP). Run and break real systems: message queues, caches, clusters. Learn via failure and observation.

**Why it matters:** Theory tells you what's possible; practice tells you what's likely. Running a Redis cluster and watching it handle a node failure teaches you more about distributed systems than reading 10 papers. The goal is operational intuition.

**Study approach:** Deploy real distributed systems in your homelab or local Docker setup. Use them under load. Kill nodes. Observe what happens. Read the monitoring dashboards. This is experiential learning — you need to feel the failure modes, not just read about them.

**Practice:**
- Deploy a 3-node Redis cluster. Kill one node and observe the failover
- Set up RabbitMQ or Kafka. Produce messages faster than consumers can handle — observe backpressure
- Complete the Fly.io distributed systems challenges (Maelstrom)`,
        descriptionPt: `Não fique na teoria (Raft, CAP). Execute e quebre sistemas reais: filas de mensagens, caches, clusters. Aprenda via falha e observação.

**Por que importa:** Teoria diz o que é possível; prática diz o que é provável. A meta é intuição operacional.

**Abordagem de estudo:** Deploy sistemas distribuídos reais no homelab ou Docker local. Use sob carga. Mate nós. Observe.

**Prática:**
- Deploy um cluster Redis de 3 nós. Mate um e observe o failover
- Configure RabbitMQ ou Kafka. Produza mensagens mais rápido que consumers aguentam — observe backpressure
- Complete os desafios de sistemas distribuídos do Fly.io (Maelstrom)`,
        depth: 'deep',
        estimatedHours: 50,
        priority: 4,
        resources: [
          { type: 'project', title: 'Fly.io Distributed Systems Challenges', url: 'https://fly.io/dist-sys/', author: null },
          { type: 'book', title: 'Designing Data-Intensive Applications', url: null, author: 'Martin Kleppmann' },
          { type: 'project', title: 'Build your own Redis', url: null, author: null },
        ],
      },
      {
        slug: 'system-design',
        title: 'System design: architecture for real-world scale',
        titlePt: 'Design de sistemas: arquitetura para escala real',
        description: `Design systems that handle real-world constraints: scale, availability, consistency, cost. Practice the structured approach to system design.

**Why it matters:** System design is where all your technical knowledge converges. It's the skill of making trade-offs: consistency vs availability, simplicity vs scalability, cost vs performance. This is what separates senior engineers from mid-level ones — the ability to design a system that works, not just write code that works.

**Study approach:** Practice by designing systems on paper first. For each design: (1) clarify requirements, (2) estimate scale, (3) define the API, (4) design the data model, (5) draw the high-level architecture, (6) dive deep into one component. Study real-world architectures through engineering blogs.

**Practice:**
- Design a URL shortener, a notification system, and a rate limiter on paper
- Read 10 engineering blog posts about real system architectures (Uber, Netflix, Shopify)
- Redesign a system you've built with 100x the scale — what changes?`,
        descriptionPt: `Projete sistemas que lidam com restrições reais: escala, disponibilidade, consistência, custo.

**Por que importa:** Design de sistemas é onde todo conhecimento técnico converge. É a habilidade de fazer trade-offs. Separa engenheiros seniores de plenos.

**Abordagem de estudo:** Pratique projetando no papel primeiro. Para cada design: (1) esclareça requisitos, (2) estime escala, (3) defina API, (4) modele dados, (5) desenhe arquitetura, (6) aprofunde em um componente.

**Prática:**
- Projete um URL shortener, um sistema de notificações e um rate limiter no papel
- Leia 10 posts de blog de engenharia sobre arquiteturas reais
- Redesenhe um sistema que construiu com 100x a escala — o que muda?`,
        depth: 'deep',
        estimatedHours: 45,
        priority: 5,
        resources: [
          { type: 'book', title: 'System Design Interview', url: null, author: 'Alex Xu' },
          { type: 'book', title: 'Designing Data-Intensive Applications', url: null, author: 'Martin Kleppmann' },
          { type: 'article', title: 'The System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', author: 'Donne Martin' },
          { type: 'article', title: 'High Scalability Blog', url: 'http://highscalability.com/', author: null },
        ],
      },
    ],
  },
  {
    slug: 'ai-tooling',
    title: 'AI-Era Tooling',
    titlePt: 'Ferramentas da Era IA',
    description: 'Tools and practices for the AI-augmented developer',
    descriptionPt: 'Ferramentas e práticas para o desenvolvedor aumentado por IA',
    color: '#d3869b',
    topics: [
      {
        slug: 'agentic-coding',
        title: 'Agentic coding workflow (Claude Code, Cursor, Zed)',
        titlePt: 'Workflow de codificação agêntica (Claude Code, Cursor, Zed)',
        description: `Integrate AI coding assistants into your workflow effectively.

**Why it matters:** AI coding assistants are the biggest productivity multiplier available to developers right now. But the multiplier depends on how you use them. The difference between a developer who uses AI well and one who doesn't is larger than the difference between a junior and senior developer.

**Study approach:** Use AI assistants daily for 30 days. Track what works and what doesn't. Key principle: be specific in your instructions (specs, not vibes), review every output critically, and iterate on your prompts. Learn when to use AI (boilerplate, exploration, unfamiliar code) and when not to (critical logic, security-sensitive code, novel algorithms).

**Practice:**
- Use AI to implement a feature, then review every line as if it were a junior's PR
- Build a CLAUDE.md file for a project and measure how it changes output quality
- Compare: implement the same feature with and without AI. Note where AI helped and where it didn't`,
        descriptionPt: `Integre assistentes de codificação IA ao seu workflow de forma eficaz.

**Por que importa:** Assistentes de IA são o maior multiplicador de produtividade disponível para devs agora. Mas o multiplicador depende de como você os usa.

**Abordagem de estudo:** Use assistentes de IA diariamente por 30 dias. Rastreie o que funciona e o que não. Princípio: seja específico nas instruções, revise cada output criticamente.

**Prática:**
- Use IA para implementar uma feature, depois revise cada linha como se fosse o PR de um júnior
- Construa um CLAUDE.md e meça como muda a qualidade do output
- Compare: implemente a mesma feature com e sem IA. Note onde ajudou e onde não`,
        depth: 'broad',
        estimatedHours: 20,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Claude Code Documentation', url: 'https://docs.anthropic.com/en/docs/claude-code', author: null },
          { type: 'docs', title: 'Cursor Documentation', url: 'https://docs.cursor.com/', author: null },
        ],
      },
      {
        slug: 'local-inference',
        title: 'Local model inference via Ollama / llama.cpp',
        titlePt: 'Inferência local de modelos via Ollama / llama.cpp',
        description: `Run models locally for privacy, speed, and understanding.

**Why it matters:** Running models locally gives you independence from cloud APIs, zero-latency inference for development, and a deeper understanding of how LLMs work (quantization, context windows, hardware requirements). It's also essential for privacy-sensitive use cases.

**Study approach:** Set up Ollama, download a few models of different sizes, and benchmark them on real tasks. Understand the relationship between model size, quantization level, available RAM, and output quality.

**Practice:**
- Run 3 different model sizes on the same task. Compare quality and speed
- Set up a local model as your commit message generator for a week
- Build a simple chat interface that uses a local model via Ollama API`,
        descriptionPt: `Execute modelos localmente para privacidade, velocidade e entendimento.

**Por que importa:** Rodar modelos localmente dá independência de APIs cloud, inferência zero-latência e entendimento mais profundo de como LLMs funcionam.

**Abordagem de estudo:** Configure Ollama, baixe modelos de diferentes tamanhos e benchmark em tarefas reais.

**Prática:**
- Rode 3 tamanhos diferentes de modelo na mesma tarefa. Compare qualidade e velocidade
- Configure um modelo local como gerador de mensagens de commit por uma semana
- Construa uma interface de chat simples usando modelo local via Ollama API`,
        depth: 'broad',
        estimatedHours: 15,
        priority: 3,
        resources: [
          { type: 'docs', title: 'Ollama', url: 'https://ollama.com/', author: null },
          { type: 'project', title: 'llama.cpp', url: 'https://github.com/ggerganov/llama.cpp', author: 'Georgi Gerganov' },
        ],
      },
      {
        slug: 'evals-first',
        title: 'Evals-first development for LLM features',
        titlePt: 'Desenvolvimento evals-first para features LLM',
        description: `Build LLM features with evaluation as the foundation.

**Why it matters:** LLM outputs are non-deterministic. Without evals, you're shipping features you can't test, can't regression-check, and can't improve systematically. Evals are to LLM features what unit tests are to deterministic code — the thing that makes iteration possible.

**Study approach:** Before building any LLM feature, write the eval first: what does "good" look like? How will you measure it? Collect real examples (golden datasets), define metrics (accuracy, relevance, safety), and automate the evaluation pipeline. Then iterate on the prompt until evals pass.

**Practice:**
- Write an eval suite with 50+ test cases before changing a prompt
- Set up automated eval runs in CI for an LLM feature
- Track eval scores over time and correlate them with prompt changes`,
        descriptionPt: `Construa features LLM com avaliação como fundação.

**Por que importa:** Outputs de LLM são não-determinísticos. Sem evals, você entrega features que não pode testar, verificar regressão ou melhorar sistematicamente.

**Abordagem de estudo:** Antes de construir qualquer feature LLM, escreva o eval primeiro: como é "bom"? Como medir?

**Prática:**
- Escreva uma suite de eval com 50+ casos de teste antes de mudar um prompt
- Configure eval runs automatizados no CI para uma feature LLM
- Rastreie scores de eval ao longo do tempo e correlacione com mudanças de prompt`,
        depth: 'deep',
        estimatedHours: 25,
        priority: 5,
        resources: [
          { type: 'article', title: 'Evals are all you need', url: null, author: null },
          { type: 'docs', title: 'Anthropic Evaluation Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/develop-tests', author: null },
        ],
      },
      {
        slug: 'prompt-architecture',
        title: 'Prompt architecture and context engineering',
        titlePt: 'Arquitetura de prompts e engenharia de contexto',
        description: `Design prompts as systems, not strings. Understand context windows, token budgets, and information architecture for LLMs.

**Why it matters:** A prompt is not a sentence — it's an interface. Good prompt architecture means structuring context hierarchically, managing token budgets, using system prompts effectively, and designing prompts that are maintainable and version-controlled. This is software engineering applied to natural language.

**Study approach:** Treat prompts like code: version-control them, test them with evals, review them in PRs. Study the Anthropic and OpenAI prompt engineering guides. Learn the mechanical aspects: how context windows work, what gets cached, how to structure multi-turn conversations.

**Practice:**
- Refactor a prompt from a single string into a structured system prompt + few-shot examples
- Implement prompt templating with variables and conditional sections
- Measure the impact of context ordering on output quality (same information, different order)`,
        descriptionPt: `Projete prompts como sistemas, não strings. Entenda janelas de contexto, budgets de tokens e arquitetura de informação para LLMs.

**Por que importa:** Um prompt não é uma frase — é uma interface. Boa arquitetura de prompt é engenharia de software aplicada a linguagem natural.

**Abordagem de estudo:** Trate prompts como código: versione, teste com evals, revise em PRs. Estude os guias de engenharia de prompt da Anthropic e OpenAI.

**Prática:**
- Refatore um prompt de uma string única para system prompt estruturado + few-shot examples
- Implemente templating de prompt com variáveis e seções condicionais
- Meça o impacto da ordem do contexto na qualidade do output`,
        depth: 'broad',
        estimatedHours: 20,
        priority: 4,
        resources: [
          { type: 'docs', title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering', author: null },
          { type: 'article', title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', author: null },
        ],
      },
      {
        slug: 'spec-driven-ai',
        title: 'Spec-driven AI usage',
        titlePt: 'Uso de IA orientado por especificação',
        description: `Replace vague prompting with clear input/output contracts, constraints and edge cases. Treat AI like a junior engineer with strict boundaries.

**Why it matters:** The #1 mistake developers make with AI is being vague. "Make this better" produces worse results than "Refactor this function to use early returns, keep the same interface, and don't add error handling." Specs are force multipliers for AI — they constrain the output space to what you actually want.

**Study approach:** For every AI task, write a mini-spec first: inputs, expected outputs, constraints, edge cases, what NOT to do. Compare results with and without specs. Build templates for common spec patterns.

**Practice:**
- Write specs for 5 AI tasks this week. Compare output quality with and without specs
- Build a spec template for your most common AI use cases
- Practice writing "negative specs" — things the AI should NOT do`,
        descriptionPt: `Substitua prompts vagos por contratos claros de entrada/saída, restrições e casos extremos.

**Por que importa:** O erro #1 que devs cometem com IA é ser vago. Specs são multiplicadores de força para IA — restringem o espaço de output para o que você realmente quer.

**Abordagem de estudo:** Para cada tarefa com IA, escreva uma mini-spec primeiro: inputs, outputs esperados, restrições, edge cases, o que NÃO fazer.

**Prática:**
- Escreva specs para 5 tarefas com IA esta semana. Compare qualidade do output
- Construa um template de spec para seus casos de uso mais comuns
- Pratique "specs negativas" — coisas que a IA NÃO deve fazer`,
        depth: 'deep',
        estimatedHours: 20,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Anthropic Documentation', url: 'https://docs.anthropic.com/', author: null },
          { type: 'article', title: 'Prompt Engineering for Developers', url: null, author: null },
        ],
      },
      {
        slug: 'stronger-evals',
        title: 'Stronger evals for AI components',
        titlePt: 'Evals mais robustas para componentes de IA',
        description: `Add regression cases, edge/adversarial inputs, and drift tracking over time. Evals become the new "tests" for AI components.

**Why it matters:** As AI becomes more central to your products, eval quality determines product quality. Weak evals (only happy path) give false confidence. Strong evals catch regressions when you change models, update prompts, or modify context. They're the production safety net.

**Study approach:** Build evals incrementally: start with golden examples, add edge cases from real failures, add adversarial inputs, then add drift detection. Track eval scores as time series — declining scores signal degradation before users notice.

**Practice:**
- For an existing AI feature, add 20 edge case tests based on real user failures
- Implement adversarial eval inputs (prompt injection attempts, ambiguous inputs)
- Set up weekly eval runs and chart the scores over time`,
        descriptionPt: `Adicione casos de regressão, inputs extremos/adversariais e rastreamento de drift. Evals se tornam os novos "testes" para componentes de IA.

**Por que importa:** Evals fracas (só happy path) dão falsa confiança. Evals fortes capturam regressões ao mudar modelos, prompts ou contexto.

**Abordagem de estudo:** Construa evals incrementalmente: golden examples, edge cases, adversarial inputs, drift detection.

**Prática:**
- Para uma feature existente, adicione 20 testes de edge case baseados em falhas reais
- Implemente inputs adversariais (injeção de prompt, inputs ambíguos)
- Configure eval runs semanais e grafique os scores ao longo do tempo`,
        depth: 'deep',
        estimatedHours: 25,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Anthropic Evaluation Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/develop-tests', author: null },
          { type: 'article', title: 'Building Evals for LLM Systems', url: null, author: null },
        ],
      },
      {
        slug: 'security-ai-systems',
        title: 'Security basics for AI-integrated systems',
        titlePt: 'Fundamentos de segurança para sistemas integrados com IA',
        description: `Prompt injection, data exposure risks, auth boundaries. Think in terms of threat models, not just features.

**Why it matters:** AI systems introduce entirely new attack surfaces: prompt injection can bypass access controls, context windows can leak sensitive data, and model outputs can be manipulated to produce harmful content. Traditional security + AI-specific security is now the baseline.

**Study approach:** Study the OWASP Top 10 for LLMs. For each attack type, build a proof of concept and then a defense. Key principle: treat LLM output as untrusted user input — never execute it directly, always validate.

**Practice:**
- Attempt prompt injection against a system you built. Fix the vulnerabilities
- Audit an AI feature for data exposure: what sensitive information could leak through the context window?
- Implement input/output guardrails for an LLM feature (content filtering, output validation)`,
        descriptionPt: `Injeção de prompt, riscos de exposição de dados, limites de autenticação. Pense em modelos de ameaça, não apenas features.

**Por que importa:** Sistemas de IA introduzem superfícies de ataque inteiramente novas. Segurança tradicional + segurança específica de IA é agora o baseline.

**Abordagem de estudo:** Estude o OWASP Top 10 para LLMs. Para cada tipo de ataque, construa uma prova de conceito e depois uma defesa.

**Prática:**
- Tente injeção de prompt contra um sistema que construiu. Corrija as vulnerabilidades
- Audite uma feature de IA para exposição de dados
- Implemente guardrails de input/output para uma feature LLM`,
        depth: 'deep',
        estimatedHours: 25,
        priority: 4,
        resources: [
          { type: 'docs', title: 'OWASP Top 10 for LLMs', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', author: null },
          { type: 'article', title: 'Securing LLM Systems', url: null, author: null },
        ],
      },
    ],
  },
  {
    slug: 'gear',
    title: 'Gear & Environment',
    titlePt: 'Equipamento & Ambiente',
    description: 'Physical and digital environment for productive development',
    descriptionPt: 'Ambiente físico e digital para desenvolvimento produtivo',
    color: '#fe8019',
    topics: [
      {
        slug: 'ergonomic-keyboard',
        title: 'Ergonomic keyboard mastery',
        titlePt: 'Domínio de teclado ergonômico',
        description: `Invest in your primary input device. Learn touch typing, explore split keyboards, and optimize your layout.

**Study approach:** This is a physical skill — daily practice for 15 minutes beats marathon sessions. Use a typing trainer daily. If exploring custom keyboards, start with QMK/ZMK firmware documentation.`,
        descriptionPt: `Invista no seu dispositivo de entrada principal. Aprenda digitação por toque, explore teclados split e otimize seu layout.

**Abordagem de estudo:** Habilidade física — prática diária de 15 minutos supera sessões maratona.`,
        depth: 'optional',
        estimatedHours: 20,
        priority: 2,
        resources: [
          { type: 'article', title: 'Keyboard University', url: null, author: null },
          { type: 'docs', title: 'QMK Firmware', url: 'https://docs.qmk.fm/', author: null },
        ],
      },
      {
        slug: 'monitor-workflow',
        title: 'Dual-monitor / ultrawide workflow',
        titlePt: 'Workflow com monitor duplo / ultrawide',
        description: `Optimize your screen real estate. Use a tiling window manager to eliminate manual window management.

**Study approach:** Experiment with different layouts: code left + terminal right, documentation on second monitor. Try a tiling window manager (i3, sway, Hyprland) for a week — it's uncomfortable at first but pays off quickly.`,
        descriptionPt: `Otimize o espaço da sua tela. Use um gerenciador de janelas tiling para eliminar gerenciamento manual de janelas.

**Abordagem de estudo:** Experimente layouts diferentes. Tente um tiling window manager por uma semana.`,
        depth: 'optional',
        estimatedHours: 10,
        priority: 2,
        resources: [
          { type: 'article', title: 'Tiling window managers compared', url: null, author: null },
        ],
      },
      {
        slug: 'homelab',
        title: 'Homelab as a practice environment',
        titlePt: 'Homelab como ambiente de prática',
        description: `Use your homelab to practice deployment, networking, monitoring, and infrastructure skills.

**Why it matters:** A homelab is the safest place to break things and learn. You can practice Docker orchestration, set up monitoring stacks, experiment with databases, and learn networking — all without risking production systems or paying cloud bills.

**Study approach:** Start small and iterate. Don't try to build the perfect homelab on day one. Start with one service (e.g., this roadmap app), add monitoring, add a reverse proxy, add a second service. Each addition teaches infrastructure skills.

**Practice:**
- Deploy 3 services with Docker Compose and a reverse proxy (Traefik/Caddy)
- Set up a monitoring stack (Prometheus + Grafana)
- Configure automated backups and test a restore`,
        descriptionPt: `Use seu homelab para praticar deploy, rede, monitoramento e habilidades de infraestrutura.

**Por que importa:** Um homelab é o lugar mais seguro para quebrar coisas e aprender. Sem riscos de produção ou contas de cloud.

**Abordagem de estudo:** Comece pequeno e itere. Não tente construir o homelab perfeito no dia um.

**Prática:**
- Deploy 3 serviços com Docker Compose e um reverse proxy
- Configure uma stack de monitoramento (Prometheus + Grafana)
- Configure backups automatizados e teste um restore`,
        depth: 'broad',
        estimatedHours: 40,
        priority: 3,
        resources: [
          { type: 'article', title: 'r/homelab Wiki', url: 'https://www.reddit.com/r/homelab/wiki/index/', author: null },
          { type: 'docs', title: 'Proxmox Documentation', url: 'https://pve.proxmox.com/wiki/Main_Page', author: null },
        ],
      },
      {
        slug: 'dev-machine',
        title: 'Dev machine sized for local LLMs (32GB+ RAM)',
        titlePt: 'Máquina de dev dimensionada para LLMs locais (32GB+ RAM)',
        description: `Configure your development machine for running local language models. Understand GPU vs CPU inference, RAM requirements, and quantization trade-offs.

**Study approach:** Research hardware requirements based on the models you want to run. Key: VRAM is the bottleneck for GPU inference, RAM for CPU inference. 32GB RAM handles 7B models comfortably, 64GB+ for 13B+.`,
        descriptionPt: `Configure sua máquina de desenvolvimento para rodar modelos de linguagem locais. Entenda inferência GPU vs CPU, requisitos de RAM e trade-offs de quantização.

**Abordagem de estudo:** Pesquise requisitos de hardware baseado nos modelos que quer rodar. Chave: VRAM é o gargalo para GPU, RAM para CPU.`,
        depth: 'optional',
        estimatedHours: 10,
        priority: 2,
        resources: [
          { type: 'article', title: 'Hardware requirements for local LLMs', url: null, author: null },
        ],
      },
    ],
  },
  {
    slug: 'meta-skills',
    title: 'Meta-Skills',
    titlePt: 'Meta-Habilidades',
    description: 'Skills that amplify everything else you do',
    descriptionPt: 'Habilidades que amplificam tudo o que você faz',
    color: '#8ec07c',
    topics: [
      {
        slug: 'technical-writing',
        title: 'Technical writing: READMEs, design docs, post-mortems',
        titlePt: 'Escrita técnica: READMEs, docs de design, post-mortems',
        description: `Write clearly about technical topics. Good writing is clear thinking made visible.

**Why it matters:** Writing is the primary tool for async communication, knowledge sharing, and decision-making in software teams. A developer who writes well has outsized influence — their design docs get approved, their PRs get merged faster, and their documentation reduces support burden.

**Study approach:** Write regularly: one design doc per month, README for every project, post-mortem for every incident. Get feedback from peers. The Google Technical Writing course is an excellent starting point — it's free and structured.

**Practice:**
- Write a design doc for a feature you're planning (problem, constraints, proposed solution, alternatives)
- Write a post-mortem for the last incident you were involved in
- Rewrite a confusing README in your codebase. Get feedback from someone who reads it cold`,
        descriptionPt: `Escreva com clareza sobre tópicos técnicos. Boa escrita é pensamento claro tornado visível.

**Por que importa:** Escrita é a ferramenta primária para comunicação async, compartilhamento de conhecimento e tomada de decisão. Um dev que escreve bem tem influência desproporcional.

**Abordagem de estudo:** Escreva regularmente: um design doc por mês, README para cada projeto, post-mortem para cada incidente.

**Prática:**
- Escreva um design doc para uma feature planejada
- Escreva um post-mortem para o último incidente
- Reescreva um README confuso. Peça feedback de alguém que leia sem contexto`,
        depth: 'broad',
        estimatedHours: 25,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Google Technical Writing Course', url: 'https://developers.google.com/tech-writing', author: null },
          { type: 'book', title: 'Docs for Developers', url: null, author: 'Jared Bhatti et al.' },
          { type: 'book', title: 'On Writing Well', url: null, author: 'William Zinsser' },
        ],
      },
      {
        slug: 'reading-source',
        title: 'Reading source code of tools you use',
        titlePt: 'Leitura do código-fonte das ferramentas que você usa',
        description: `Go beyond the docs. Read the actual source of your dependencies.

**Why it matters:** Documentation describes what the authors intended. Source code describes what actually happens. Reading source code builds intuition about quality, teaches patterns you wouldn't find in tutorials, and lets you debug issues that no Stack Overflow answer covers.

**Study approach:** Pick one dependency per month and spend 2-3 sessions reading its source. Start from the entry point and follow the main path. Don't try to understand everything — focus on: "How does it handle X?" where X is a feature you use.

**Practice:**
- Read the source of your HTTP framework. How does it route a request?
- Read the source of a library that seems "magic." Demystify it
- Contribute a documentation fix or small bug fix to an open-source project you've read`,
        descriptionPt: `Vá além da documentação. Leia o código-fonte real das suas dependências.

**Por que importa:** Documentação descreve a intenção dos autores. Código-fonte descreve o que realmente acontece. Ler código constrói intuição sobre qualidade.

**Abordagem de estudo:** Escolha uma dependência por mês e passe 2-3 sessões lendo o source. Comece do entry point e siga o caminho principal.

**Prática:**
- Leia o source do seu framework HTTP. Como roteia uma requisição?
- Leia o source de uma lib que parece "mágica." Desmistifique
- Contribua um fix de doc ou bug pequeno para um projeto open-source que leu`,
        depth: 'broad',
        estimatedHours: 30,
        priority: 4,
        resources: [
          { type: 'article', title: 'Read the Source, Luke', url: null, author: null },
          { type: 'project', title: 'Read Express.js, Fastify, or Vue.js source code', url: null, author: null },
        ],
      },
      {
        slug: 'hobby-outside-code',
        title: 'One long-horizon hobby outside code',
        titlePt: 'Um hobby de longo prazo fora de código',
        description: `Maintain a serious hobby outside programming — music, woodworking, climbing, writing, art, sports.

**Why it matters:** A long-horizon hobby prevents burnout, builds patience, and teaches you about learning itself. The meta-skills transfer: the patience you build learning guitar makes you better at learning Rust. The creative thinking from art improves your system design. You become a better developer by being a more complete person.

**Study approach:** Pick something you're genuinely curious about, not something "productive." Commit to it for 6 months before evaluating. The goal is sustained engagement, not mastery.`,
        descriptionPt: `Mantenha um hobby sério fora da programação — música, marcenaria, escalada, escrita, arte, esportes.

**Por que importa:** Um hobby de longo horizonte previne burnout, constrói paciência e ensina sobre aprendizado em si. As meta-habilidades transferem: a paciência de aprender violão melhora o aprendizado de Rust.

**Abordagem de estudo:** Escolha algo que genuinamente te interessa, não algo "produtivo." Comprometa-se por 6 meses antes de avaliar.`,
        depth: 'broad',
        estimatedHours: null,
        priority: 3,
        resources: [],
      },
      {
        slug: 'async-communication',
        title: 'Async communication for remote work',
        titlePt: 'Comunicação assíncrona para trabalho remoto',
        description: `Write better messages, docs, and updates. Reduce meetings. Communicate with clarity and context.

**Why it matters:** Remote work is default for most developers. The quality of your async communication directly determines your effectiveness: a well-written Slack message prevents a 30-minute meeting, a clear PR description speeds up review, and a good status update builds trust.

**Study approach:** Apply these principles to every written communication: (1) lead with context ("Why am I writing this?"), (2) make the ask explicit ("I need X by Y"), (3) link to supporting material, (4) anticipate questions. Review your messages before sending — cut 30% of the words.

**Practice:**
- Rewrite your last 3 Slack messages to be clearer and more actionable
- Write status updates for a week using the format: Done / Doing / Blocked
- Replace one meeting this week with a written document. Compare outcomes`,
        descriptionPt: `Escreva melhores mensagens, docs e atualizações. Reduza reuniões. Comunique com clareza e contexto.

**Por que importa:** Trabalho remoto é padrão para a maioria dos devs. A qualidade da comunicação async determina diretamente sua efetividade.

**Abordagem de estudo:** Aplique: (1) comece com contexto, (2) faça o pedido explícito, (3) linke material de apoio, (4) antecipe perguntas.

**Prática:**
- Reescreva suas últimas 3 mensagens Slack para serem mais claras
- Escreva status updates por uma semana: Feito / Fazendo / Bloqueado
- Substitua uma reunião por um documento escrito. Compare resultados`,
        depth: 'broad',
        estimatedHours: 15,
        priority: 4,
        resources: [
          { type: 'book', title: 'Remote: Office Not Required', url: null, author: 'Jason Fried, David Heinemeier Hansson' },
          { type: 'article', title: 'How to write async', url: null, author: null },
        ],
      },
      {
        slug: 'cost-awareness',
        title: 'Cost awareness',
        titlePt: 'Consciência de custos',
        description: `Understand tradeoffs: latency vs compute, storage vs recomputation, token usage in LLM systems. Build systems that are economically viable.

**Why it matters:** In 2026, AI costs are a significant part of application expenses. Understanding the economics of your technical decisions — token costs, compute costs, storage costs — is as important as understanding the engineering. A system that works but costs 10x too much is not a good system.

**Study approach:** Start tracking costs for everything: cloud bills, API costs, CI minutes. For every architecture decision, add a cost column to your trade-off matrix. Learn to estimate: "this feature will cost $X/month at Y scale."

**Practice:**
- Audit your current cloud/API spend. Identify the top 3 cost drivers
- For an LLM feature, calculate the per-request cost and monthly total
- Propose 3 ways to reduce costs by 30%+ without degrading user experience`,
        descriptionPt: `Entenda trade-offs: latência vs computação, armazenamento vs recomputação, uso de tokens em sistemas LLM.

**Por que importa:** Em 2026, custos de IA são parte significativa das despesas de aplicação. Entender a economia das decisões técnicas é tão importante quanto entender a engenharia.

**Abordagem de estudo:** Comece rastreando custos de tudo. Para cada decisão de arquitetura, adicione uma coluna de custo na matriz de trade-offs.

**Prática:**
- Audite seus gastos atuais com cloud/API. Identifique os 3 maiores drivers de custo
- Para uma feature LLM, calcule o custo por requisição e total mensal
- Proponha 3 formas de reduzir custos em 30%+ sem degradar a experiência`,
        depth: 'broad',
        estimatedHours: 20,
        priority: 4,
        resources: [
          { type: 'article', title: 'Cost-Aware System Design', url: null, author: null },
          { type: 'docs', title: 'AWS Well-Architected: Cost Optimization', url: 'https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html', author: null },
        ],
      },
      {
        slug: 'product-sense',
        title: 'Product sense',
        titlePt: 'Senso de produto',
        description: `Decide what not to build. Optimize for usefulness, not technical elegance. AI increases output — direction becomes more critical.

**Why it matters:** AI makes building faster, which means the bottleneck shifts from "can we build it?" to "should we build it?" Product sense — the ability to identify what's valuable, what users actually need, and what to say no to — is the most important force multiplier when AI handles the implementation.

**Study approach:** Talk to users. Watch them use your product. Track which features get used and which don't. For every feature request, ask "What problem is this solving?" and "Is there a simpler way to solve it?" Read The Mom Test to learn how to have useful user conversations.

**Practice:**
- Watch 3 users use a product you built. Note where they struggle (don't help them)
- Audit your last 5 features by usage data. Kill or simplify the least-used one
- For your next feature, write the "press release" (1 paragraph) before writing any code`,
        descriptionPt: `Decida o que não construir. Otimize para utilidade, não elegância técnica. IA aumenta a produção — direção se torna mais crítica.

**Por que importa:** IA torna a construção mais rápida, então o gargalo muda de "podemos construir?" para "devemos construir?" Senso de produto é o multiplicador mais importante quando IA cuida da implementação.

**Abordagem de estudo:** Converse com usuários. Observe-os usando seu produto. Rastreie quais features são usadas.

**Prática:**
- Observe 3 usuários usando um produto que construiu. Note onde têm dificuldade
- Audite suas últimas 5 features por dados de uso. Elimine ou simplifique a menos usada
- Para sua próxima feature, escreva o "press release" (1 parágrafo) antes de escrever código`,
        depth: 'broad',
        estimatedHours: 20,
        priority: 5,
        resources: [
          { type: 'book', title: 'Inspired', url: null, author: 'Marty Cagan' },
          { type: 'book', title: 'The Mom Test', url: null, author: 'Rob Fitzpatrick' },
        ],
      },
      {
        slug: 'learning-how-to-learn',
        title: 'Learning how to learn',
        titlePt: 'Aprendendo a aprender',
        description: `Master the meta-skill: effective learning strategies, spaced repetition, deliberate practice, and managing your knowledge intake.

**Why it matters:** The half-life of technical knowledge is shrinking. The technologies you learn today may be obsolete in 3 years. What lasts is the ability to learn efficiently. Developers who learn how to learn outpace those who just learn the next framework.

**Study approach:** Apply evidence-based learning techniques: spaced repetition (Anki for concepts), interleaving (mix topics instead of blocking), retrieval practice (test yourself before re-reading), and elaboration (explain concepts in your own words). Track what works for you.

**Practice:**
- Create Anki cards for 20 concepts you want to retain. Review daily for 30 days
- For your next learning topic, test yourself before reading (retrieval practice)
- Keep a "learning journal" for 2 weeks: what you studied, how you studied, what stuck`,
        descriptionPt: `Domine a meta-habilidade: estratégias eficazes de aprendizado, repetição espaçada, prática deliberada e gerenciamento do intake de conhecimento.

**Por que importa:** A meia-vida do conhecimento técnico está diminuindo. O que dura é a capacidade de aprender eficientemente.

**Abordagem de estudo:** Aplique técnicas baseadas em evidência: repetição espaçada (Anki), intercalação (misture tópicos), prática de recuperação (teste-se antes de reler), elaboração (explique com suas palavras).

**Prática:**
- Crie cards Anki para 20 conceitos que quer reter. Revise diariamente por 30 dias
- Para o próximo tópico, teste-se antes de ler (prática de recuperação)
- Mantenha um "diário de aprendizado" por 2 semanas`,
        depth: 'broad',
        estimatedHours: 15,
        priority: 5,
        resources: [
          { type: 'course', title: 'Learning How to Learn (Coursera)', url: 'https://www.coursera.org/learn/learning-how-to-learn', author: 'Barbara Oakley' },
          { type: 'book', title: 'Make It Stick: The Science of Successful Learning', url: null, author: 'Peter C. Brown, Henry L. Roediger III, Mark A. McDaniel' },
          { type: 'book', title: 'Ultralearning', url: null, author: 'Scott Young' },
          { type: 'docs', title: 'Anki', url: 'https://apps.ankiweb.net/', author: null },
        ],
      },
    ],
  },
]

export default seedData
