import { useDb } from './client'
import { pillars, topics, resources, progress } from './schema'
import { count } from 'drizzle-orm'

interface SeedResource {
  type: 'book' | 'course' | 'article' | 'video' | 'project' | 'docs' | 'paper'
  title: string
  url: string | null
  author: string | null
}

interface SeedTopic {
  slug: string
  title: string
  description: string
  depth: 'broad' | 'deep' | 'optional'
  estimatedHours: number | null
  priority: number
  resources: SeedResource[]
}

interface SeedPillar {
  slug: string
  title: string
  description: string
  color: string
  topics: SeedTopic[]
}

const seedData: SeedPillar[] = [
  {
    slug: 'mental-model',
    title: 'Mental Model',
    description: 'Foundational ways of thinking about software systems',
    color: '#fabd2f',
    topics: [
      {
        slug: 'systems-thinking',
        title: 'Systems thinking',
        description: 'Understand the path from keypress to pixel. Trace how data flows through the entire stack — from hardware interrupts, through the kernel, across process boundaries, into your application, and back out to the display.',
        depth: 'deep',
        estimatedHours: 40,
        priority: 4,
        resources: [
          { type: 'book', title: 'How Linux Works', url: null, author: 'Brian Ward' },
          { type: 'book', title: 'Computer Systems: A Programmer\'s Perspective', url: null, author: 'Randal E. Bryant, David R. O\'Hallaron' },
          { type: 'video', title: 'What happens when you type a URL into your browser', url: 'https://www.youtube.com/watch?v=AlkDbnbv7dk', author: null },
        ],
      },
      {
        slug: 'reading-code',
        title: 'Reading code as a first-class skill',
        description: 'Develop the ability to read and understand unfamiliar codebases quickly. Learn to identify patterns, trace execution flow, and build mental models of code without running it.',
        depth: 'broad',
        estimatedHours: 20,
        priority: 4,
        resources: [
          { type: 'book', title: 'Code Reading: The Open Source Perspective', url: null, author: 'Diomidis Spinellis' },
          { type: 'article', title: 'How to Read Code', url: null, author: null },
        ],
      },
      {
        slug: 'hypothesis-driven-debugging',
        title: 'Hypothesis-driven debugging',
        description: 'Debug systematically: form a hypothesis, design an experiment to test it, observe the result, and iterate. Stop shotgun debugging.',
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
        description: 'Develop judgment for when to abstract and when not to. Understand the cost of the wrong abstraction versus duplication. Learn to recognize premature abstraction and over-engineering.',
        depth: 'deep',
        estimatedHours: 30,
        priority: 4,
        resources: [
          { type: 'article', title: 'The Wrong Abstraction', url: 'https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction', author: 'Sandi Metz' },
          { type: 'book', title: 'A Philosophy of Software Design', url: null, author: 'John Ousterhout' },
          { type: 'video', title: 'Simple Made Easy', url: 'https://www.infoq.com/presentations/Simple-Made-Easy/', author: 'Rich Hickey' },
        ],
      },
    ],
  },
  {
    slug: 'core-broad',
    title: 'Core Knowledge: Broad Layer',
    description: 'Foundational technical skills every developer needs',
    color: '#83a598',
    topics: [
      {
        slug: 'systems-language',
        title: 'One systems language: Rust or Go',
        description: 'Learn a systems-level language to understand memory management, concurrency primitives, and performance constraints.',
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
        description: 'Achieve fluency in a high-level scripting language for rapid prototyping, automation, and glue code.',
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
        description: 'Indexes, query plans, denormalization. Understand what your ORM is doing under the hood and when to reach for raw SQL.',
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
        description: 'Understand the core protocols of the web. Know what happens at each layer when a request is made.',
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
        description: 'Be productive in a terminal. Know your shell, your editor, and how to combine Unix tools.',
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
        description: 'Rebase, bisect, reflog. Understand the DAG. Be confident recovering from any git state.',
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
        description: 'Understand images, layers, networking, volumes, multi-stage builds. Use compose for local dev and deployment.',
        depth: 'broad',
        estimatedHours: 30,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Docker Documentation', url: 'https://docs.docker.com/', author: null },
          { type: 'book', title: 'Docker Deep Dive', url: null, author: 'Nigel Poulton' },
          { type: 'project', title: 'Build your own Docker', url: null, author: null },
        ],
      },
    ],
  },
  {
    slug: 'core-deep',
    title: 'Core Knowledge: Deep Layer',
    description: 'Advanced technical knowledge for deeper understanding',
    color: '#b8bb26',
    topics: [
      {
        slug: 'distributed-systems',
        title: 'Distributed systems: consensus, CAP, eventual consistency',
        description: 'Understand the fundamental challenges and trade-offs of building systems that span multiple machines.',
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
        description: 'Understand how databases actually store, index, and retrieve data. Know why different engines make different trade-offs.',
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
        description: 'Build production AI features. Understand embeddings, retrieval-augmented generation, evaluation frameworks, and prompt engineering at scale.',
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
        description: 'Understand parsing, ASTs, type checking, and code generation. Build a small interpreter or compiler.',
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
        description: 'Think about security systematically. Understand common vulnerabilities, threat modeling, and the basics of applied cryptography.',
        depth: 'deep',
        estimatedHours: 35,
        priority: 3,
        resources: [
          { type: 'book', title: 'Serious Cryptography', url: null, author: 'Jean-Philippe Aumasson' },
          { type: 'docs', title: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/', author: null },
        ],
      },
      {
        slug: 'performance-engineering',
        title: 'Performance engineering: profiling, cache hierarchies',
        description: 'Learn to measure before optimizing. Understand CPU caches, memory hierarchy, profiling tools, and systematic performance work.',
        depth: 'deep',
        estimatedHours: 40,
        priority: 3,
        resources: [
          { type: 'book', title: 'Systems Performance', url: null, author: 'Brendan Gregg' },
          { type: 'article', title: 'What Every Programmer Should Know About Memory', url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf', author: 'Ulrich Drepper' },
        ],
      },
    ],
  },
  {
    slug: 'ai-tooling',
    title: 'AI-Era Tooling',
    description: 'Tools and practices for the AI-augmented developer',
    color: '#d3869b',
    topics: [
      {
        slug: 'agentic-coding',
        title: 'Agentic coding workflow (Claude Code, Cursor, Zed)',
        description: 'Integrate AI coding assistants into your workflow. Understand when they help, when they hurt, and how to get the best results.',
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
        description: 'Run models locally for privacy, speed, and understanding. Learn quantization, hardware requirements, and when local makes sense.',
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
        description: 'Build LLM features with evaluation as the foundation. Define success criteria before writing prompts, and iterate based on measurements.',
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
        description: 'Design prompts as systems, not strings. Understand context windows, structured outputs, chain-of-thought, and prompt composition patterns.',
        depth: 'broad',
        estimatedHours: 20,
        priority: 4,
        resources: [
          { type: 'docs', title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering', author: null },
          { type: 'article', title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', author: null },
        ],
      },
    ],
  },
  {
    slug: 'gear',
    title: 'Gear & Environment',
    description: 'Physical and digital environment for productive development',
    color: '#fe8019',
    topics: [
      {
        slug: 'ergonomic-keyboard',
        title: 'Ergonomic keyboard mastery',
        description: 'Invest in your primary input device. Consider split keyboards, learn proper technique, customize your layout.',
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
        description: 'Optimize your screen real estate. Tiling window managers, workspace organization, minimizing context switches.',
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
        description: 'Use your homelab to practice deployment, networking, monitoring, and infrastructure skills in a safe environment.',
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
        description: 'Configure your development machine for running local language models. Understand RAM, GPU, and storage requirements.',
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
    description: 'Skills that amplify everything else you do',
    color: '#8ec07c',
    topics: [
      {
        slug: 'technical-writing',
        title: 'Technical writing: READMEs, design docs, post-mortems',
        description: 'Write clearly about technical topics. Good documentation, design docs, and post-mortems are force multipliers.',
        depth: 'broad',
        estimatedHours: 25,
        priority: 5,
        resources: [
          { type: 'docs', title: 'Google Technical Writing Course', url: 'https://developers.google.com/tech-writing', author: null },
          { type: 'book', title: 'Docs for Developers', url: null, author: 'Jared Bhatti et al.' },
        ],
      },
      {
        slug: 'reading-source',
        title: 'Reading source code of tools you use',
        description: 'Go beyond the docs. Read the actual source of your dependencies, frameworks, and tools to understand how they work.',
        depth: 'broad',
        estimatedHours: 30,
        priority: 4,
        resources: [
          { type: 'article', title: 'Read the Source, Luke', url: null, author: null },
        ],
      },
      {
        slug: 'hobby-outside-code',
        title: 'One long-horizon hobby outside code',
        description: 'Maintain a serious hobby outside programming. It prevents burnout, builds patience, and often provides useful analogies.',
        depth: 'broad',
        estimatedHours: null,
        priority: 3,
        resources: [],
      },
      {
        slug: 'async-communication',
        title: 'Async communication for remote work',
        description: 'Write better messages, docs, and updates. Reduce meetings. Be effective across time zones.',
        depth: 'broad',
        estimatedHours: 15,
        priority: 4,
        resources: [
          { type: 'book', title: 'Remote: Office Not Required', url: null, author: 'Jason Fried, David Heinemeier Hansson' },
          { type: 'article', title: 'How to write async', url: null, author: null },
        ],
      },
    ],
  },
]

async function seed() {
  const db = useDb()

  const existing = db.select({ value: count() }).from(pillars).get()
  if (existing && existing.value > 0) {
    console.log('Database already seeded, skipping.')
    return
  }

  console.log('Seeding database...')

  for (let pi = 0; pi < seedData.length; pi++) {
    const p = seedData[pi]
    const pillarRows = db.insert(pillars).values({
      slug: p.slug,
      title: p.title,
      description: p.description,
      order: pi + 1,
      color: p.color,
    }).returning().all()
    const pillar = pillarRows[0]

    for (let ti = 0; ti < p.topics.length; ti++) {
      const t = p.topics[ti]
      const topicRows = db.insert(topics).values({
        pillarId: pillar.id,
        slug: t.slug,
        title: t.title,
        description: t.description,
        depth: t.depth,
        estimatedHours: t.estimatedHours,
        order: ti + 1,
        priority: t.priority,
      }).returning().all()
      const topic = topicRows[0]

      // Create initial progress record
      db.insert(progress).values({
        topicId: topic.id,
        status: 'not_started',
        confidence: 1,
        updatedAt: new Date().toISOString(),
      }).run()

      for (let ri = 0; ri < t.resources.length; ri++) {
        const r = t.resources[ri]
        db.insert(resources).values({
          topicId: topic.id,
          type: r.type,
          title: r.title,
          url: r.url,
          author: r.author,
          order: ri + 1,
        }).run()
      }
    }
  }

  console.log('Seeding complete.')
}

seed().catch(console.error)
