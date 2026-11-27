# Presenter notes · Version 3

## 1. Agentic AI

00:00–00:40 | Start with the Birmingham footage. Explain that the session is about systems, not simply larger language models. 48 minutes of concepts, a 10-minute live Spark demo and 2 minutes for takeaways/questions.

## 2. What changes when AI can act?

00:40–01:20 | Ask colleagues whether a good chat answer and a completed task are the same thing. A model receives context and generates tokens, including tool requests. The agent is the system that executes tools, observes effects and decides what to do next. A chatbot can be connected to tools, so this is a continuum rather than a strict taxonomy.

## 3. From answers to outcomes

01:20–02:25 | Walk through the three diagrams. Chat: advice is produced; workflow: the steps are specified in advance; agent: the next step can be selected from observations. Workflows may contain LLM calls. Agents may embed deterministic workflows. For stable tasks, deterministic code is often preferable.

## 4. A law firm, not just a lawyer

02:25–03:30 | The client interacts with a lawyer, but the output is supported by case files, research resources, processes and oversight. Similarly the model is not itself the agent. It provides language and reasoning; the harness mediates access to data, tools and execution. Unlike a lawyer an LLM has no professional accountability; the deploying organisation retains responsibility.

## 5. The model is not the agent

03:30–04:10 | The harness defines policy, state, memory, tools, execution and evaluation. A goal and stop condition make a bounded task. Models are interchangeable only if the harness and tool interface support them. A model with no tools can propose actions but cannot carry them out.
Sources: OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace · OpenClaw · context: https://docs.openclaw.ai/concepts/context

## 6. The industry moved from chat to work

04:10–05:45 | Dates mark specific announcements/preview stages rather than universal availability. Claude Code launched in limited preview; Codex cloud preview is distinct from the CLI. OpenClaw was previously known as Clawd/Clawdbot and Moltbot. Discuss why agent products emerged around tool execution and stateful work.
Sources: Anthropic · Claude Code preview, 24 Feb 2025: https://www.anthropic.com/news/claude-3-7-sonnet · OpenAI · Codex cloud preview, 16 May 2025: https://openai.com/index/introducing-codex/ · Anthropic · Cowork preview, 12 Jan 2026: https://www.anthropic.com/news/introducing-anthropic-labs · OpenClaw · naming history: https://docs.openclaw.ai/start/lore · Moonshot · Kimi Claw public beta, mid-Feb 2026: https://www.kimi.com/en/help/agent/agent-overview

## 7. 2026: agents enter everyday work

05:45–07:05 | Microsoft Cowork uses Anthropic technology inside the Microsoft 365 environment; Scout is a separate proactive agent. NemoClaw is a stack for OpenClaw, not a new LLM. Google started with trusted testers and limited beta. Grok Bot is an always-on delegated-work product. These are selected milestones, not a claim that all products have the same capability or availability.
Sources: Microsoft · Copilot Cowork preview, 9 Mar 2026: https://www.microsoft.com/en-us/copilot/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/ · Microsoft · Copilot Cowork GA, 16 Jun 2026: https://www.microsoft.com/en-us/copilot/blog/2026/06/16/copilot-cowork-is-now-generally-available/ · NVIDIA · NemoClaw preview, 16 Mar 2026: https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw · Google · Gemini release notes, 19 May 2026: https://gemini.google/sg/release-notes/?hl=en · Microsoft · Scout, 2 Jun 2026: https://www.microsoft.com/en-us/copilot/blog/2026/06/02/introducing-microsoft-scout-your-always-on-personal-agent/ · xAI · Grok Bot launch, 11 Aug 2026: https://x.ai/news/introducing-grok-bot

## 8. Two useful starting points

07:05–07:45 | For this audience I would foreground Grok Bot and Claude agents as easy entry points and compare them with a self-hosted OpenClaw environment. They have different integrations, execution locations and policies. A subscription is not identical to API usage; availability varies. The aim is to choose a harness that suits the task.
Sources: xAI · Grok Bot launch, 11 Aug 2026: https://x.ai/news/introducing-grok-bot · Anthropic · Cowork preview, 12 Jan 2026: https://www.anthropic.com/news/introducing-anthropic-labs · Anthropic · Claude Code preview, 24 Feb 2025: https://www.anthropic.com/news/claude-3-7-sonnet

## 9. OpenClaw is the operating layer

07:45–08:50 | OpenClaw is a self-hostable agent framework. The gateway provides sessions and channels; agent configuration selects workspace, model, available skills and tool policy. A scheduled trigger can start work without a human sending a fresh message. Explain that the workspace is not a sandbox and tool permissions must be enforced externally. NemoClaw adds security/privacy mechanisms through OpenShell.
Sources: OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace · OpenClaw · multi-agent routing: https://docs.openclaw.ai/concepts/multi-agent/index.html · NVIDIA · NemoClaw preview, 16 Mar 2026: https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw

## 10. One harness. Several models.

08:50–09:30 | Describe the actual hybrid experiment on the Spark: local Nemotron Lightning, cloud specialists through OpenRouter, and later DeepSeek V4 Flash for troubleshooting. This schematic is illustrative, not a captured trace. Local model inference does not guarantee local data if a cloud agent or network tool receives it.
Sources: NVIDIA · NemoClaw preview, 16 Mar 2026: https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw · OpenClaw · multi-agent routing: https://docs.openclaw.ai/concepts/multi-agent/index.html

## 11. Five files that shape the agent

09:30–10:35 | These five core files are a helpful teaching subset, not the complete workspace. Depending on release/configuration there can also be MEMORY.md, dated memory logs, HEARTBEAT.md and bootstrap files. TOOLS.md describes conventions; editing it cannot grant a permission. Do not put keys or sensitive student data into files that may be injected into a cloud model.
Sources: OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace · OpenClaw · memory: https://docs.openclaw.ai/concepts/memory

## 12. Memory is outside the model

10:35–11:40 | Model weights are fixed at inference time; a chat session can have history but it is not the same as durable external memory. An OpenClaw workspace can keep editable memory files and retrieve relevant content. The harness decides what is loaded or retrieved; not every file is injected on every call. Do not claim this is training or limitless memory. Stale or malicious memories need review and deletion.
Sources: OpenClaw · memory: https://docs.openclaw.ai/concepts/memory · OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace · OpenClaw · context: https://docs.openclaw.ai/concepts/context

## 13. Read → think → act → check

11:40–13:00 | Use the interactive demonstration: Read = inspect goal/context/data; Think = decide the next permitted action; Act = invoke a tool; Check = examine its observation and test against the goal. In OpenClaw this is a conceptual loop, not necessarily a literal four-step implementation. Introduce a failure, show replanning and the maximum retry stop. A new model call may be needed at each stage; code runs outside the model.
Sources: OpenClaw · context: https://docs.openclaw.ai/concepts/context · OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace

## 14. The model should not do the arithmetic

13:00–13:40 | Models can write code but are not reliable substitutes for executing it. A tool can run the same deterministic algorithm many times, validate ranges and return evidence. A skill can package instructions plus scripts and tests, reducing repeated planning. Code itself may be erroneous; review and validate it. The model chooses a tool and translates the result for the user.
Sources: Agent Skills · open specification: https://agentskills.io/specification · OpenAI · skills, shell and compaction: https://developers.openai.com/blog/skills-shell-tips

## 15. A skill is a folder, not a prompt

13:40–14:45 | The Agent Skills standard requires SKILL.md and permits supporting scripts, references and assets. Example directory names are illustrative. Metadata enables progressive disclosure: short descriptions can be in initial context, full instructions loaded as needed. Not every skill includes code; a skill is guidance rather than a permission grant. Review scripts and dependencies before installing.
Sources: Agent Skills · open specification: https://agentskills.io/specification · OpenClaw · skills: https://docs.openclaw.ai/tools/skills

## 16. ClawHub: a public skill registry

14:45–15:25 | Show the live registry or the linked DataCamp screenshot. The embedded illustration is intentionally labelled; downloading the source screenshot was blocked in the build environment. You can save a screenshot locally and load it using the button. Skills can be a supply-chain attack surface: inspect text and scripts, pin known versions, review permissions, and use a test workspace. Do not install an unknown skill during the live demonstration.
Sources: ClawHub · registry: https://clawhub.ai/skills · OpenClaw · ClawHub quickstart: https://docs.openclaw.ai/clawhub/quickstart · DataCamp · ClawHub screenshot / guide: https://www.datacamp.com/blog/best-clawhub-skills

## 17. Skills are becoming portable

15:25–16:05 | The open Agent Skills specification is supported by major coding-agent ecosystems including Claude Code, Codex, Gemini CLI and Microsoft-compatible tools, as well as OpenClaw. It is a common standard rather than a guarantee that every frontier product implements every feature. Scripts may depend on different runtimes, and credentials, tools, directory conventions and policies remain host-specific. This is why a reusable skill is a good investment.
Sources: Agent Skills · open specification: https://agentskills.io/specification · Microsoft · cross-agent skills: https://learn.microsoft.com/en-us/training/support/agent-skills · Claude · Agent Skills: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview · OpenAI · skills, shell and compaction: https://developers.openai.com/blog/skills-shell-tips

## 18. Tools, skills and MCP

16:05–16:45 | A tool is a callable capability; a skill is reusable task guidance, sometimes with scripts; MCP is a protocol for connecting hosts/clients to server capabilities. A skill can tell the agent which tool to use, and MCP can expose a tool, but permissions must be enforced separately.
Sources: Agent Skills · open specification: https://agentskills.io/specification · Model Context Protocol · documentation: https://modelcontextprotocol.io/

## 19. A tool call is a round trip

16:45–17:25 | The model returns structured arguments. The harness validates schema and checks policy before invoking an MCP server tool. The tool returns an observation; the model interprets it. Treat tool content as untrusted data, not higher-priority instructions. The diagram is a simplified schematic rather than a captured trace.
Sources: Model Context Protocol · documentation: https://modelcontextprotocol.io/

## 20. Route work, not everything

17:25–18:30 | Explain channel/session routing versus task delegation. OpenClaw multi-agent configuration can use separate workspaces and shared skill roots filtered by effective skill allowlists. Example: research and email share the same summarise skill; data only has SQL. Limit email to drafts, data to read-only views, research to approved network access. Routing avoids loading every domain into every prompt but does not eliminate context limits or token costs.
Sources: OpenClaw · multi-agent routing: https://docs.openclaw.ai/concepts/multi-agent/index.html · OpenClaw · skills: https://docs.openclaw.ai/tools/skills · OpenClaw · sub-agents: https://docs.openclaw.ai/tools/subagents

## 21. Subagents are workers, not more chat

18:30–19:10 | A subagent can run in its own session and report results to the parent; exact inheritance and model selection depend on configuration. Parallelism is helpful for independent work but causes coordination costs and can multiply token usage. Assign clear file ownership, budgets and stopping criteria. Avoid spawning more agents simply because it is possible. Persistent routed agents and temporary task subagents are distinct ideas.
Sources: OpenClaw · sub-agents: https://docs.openclaw.ai/tools/subagents · OpenClaw · multi-agent routing: https://docs.openclaw.ai/concepts/multi-agent/index.html

## 22. Ralph loops: reset, resume, verify

19:10–20:15 | The Ralph Wiggum pattern is associated with Geoffrey Huntley. A controller repeatedly invokes an agent against a specification, with durable progress on disk and fresh context in many implementations. A separate deterministic checker decides whether to continue. Some plugins instead loop inside the same session. Never use an unbounded while-true loop against real services. Cap iterations, spend and permissions; protect tests from being changed by the worker.
Sources: Geoffrey Huntley · Ralph loop: https://ghuntley.com/ralph/ · Anthropic · Harness design, 24 Mar 2026: https://www.anthropic.com/research/harness-design-long-running-apps

## 23. Every call has a context window

20:15–21:20 | Explain the conceptual serialization for a typical model request. Tools schemas, system instructions and selected workspace files consume tokens. Not every skill or every memory is injected: some are retrieved on demand. History can be compacted; provider-side state and caching alter transmission and billing but the model still needs effective context. Images/audio can also have token-equivalent billing. Each model and backend exposes its own exact accounting.
Sources: OpenClaw · context: https://docs.openclaw.ai/concepts/context · OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace · OpenAI · skills, shell and compaction: https://developers.openai.com/blog/skills-shell-tips

## 24. 256k fills surprisingly quickly

21:20–22:25 | 256k here means 256,000 for simple arithmetic. 15+25+80+80+50=250k, leaving only 6k for the next generated response and reasoning if the window counts both. Actual tokenisation varies. Large windows are not perfect recall and can be expensive or slow. GPT-6 Sol, Claude Opus 4.8/Sonnet 4.6 and selected DeepSeek/GLM/Kimi endpoints advertise roughly 1M contexts, but not all models, providers or subscriptions do. Compact, retrieve, route, reset and limit tool outputs.
Sources: OpenAI · GPT-6 Sol context: https://developers.openai.com/api/docs/models/gpt-6-sol · Anthropic · model overview: https://platform.claude.com/docs/en/models/overview · OpenRouter · DeepSeek V4 Flash: https://openrouter.ai/deepseek/deepseek-v4-flash · OpenRouter · GLM-5.3: https://openrouter.ai/z-ai/glm-5.3 · OpenRouter · Kimi K3: https://openrouter.ai/moonshotai/kimi-k3 · OpenClaw · context: https://docs.openclaw.ai/concepts/context

## 25. Input, reasoning, output

22:25–23:05 | Reasoning tokens are not always visible and providers may include them in output counts. Do not double-count reasoning already included in a reported total. Some models do not expose reasoning counts; some price it differently or use effort settings. Cache reads/writes and tools may have separate rates. An agent may repeat this pattern many times, so sum all calls, not just the final answer.
Sources: OpenAI · GPT-5.6 Sol model pricing: https://developers.openai.com/api/docs/models/gpt-5.6-sol · Anthropic · API pricing: https://platform.claude.com/docs/en/about-claude/pricing · Google · Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing · OpenRouter · DeepSeek V4 Flash: https://openrouter.ai/deepseek/deepseek-v4-flash

## 26. Which prompt costs the most?

23:05–24:10 | Ask the room for a vote before pressing Reveal. These illustrative input counts include the whole assembled context, not only user-message tokens. At $1/M uncached input the three input costs are $0.008, $0.040 and $0.096. The first may reason longer and generate more output, so total cost need not be smallest. Cache hits, pruning, retrieval, routing and compaction can change effective input cost. Never say every provider always resends all context verbatim.
Sources: OpenClaw · context: https://docs.openclaw.ai/concepts/context · OpenAI · skills, shell and compaction: https://developers.openai.com/blog/skills-shell-tips

## 27. Prices: selected frontier APIs

24:10–25:15 | These are selected documented examples, not a live price feed or a claim that the named models are the latest. GPT-5.6 Sol model documentation lists $4/$20 and higher long-context pricing above 272k input; Gemini 3.1 Pro uses $4/$18 above 200k. Claude rates are selected first-party examples; xAI long-context and service-tier rules can differ. Verify current pricing on each provider. Output includes billable thinking when applicable; subscription allowances are separate from token billing.
Sources: OpenAI · GPT-5.6 Sol model pricing: https://developers.openai.com/api/docs/models/gpt-5.6-sol · Anthropic · API pricing: https://platform.claude.com/docs/en/about-claude/pricing · Google · Gemini API pricing: https://ai.google.dev/gemini-api/docs/pricing · xAI · API pricing: https://docs.x.ai/developers/pricing

## 28. Prices: competitive Chinese models

25:15–26:20 | These are advertised in/out rates from the specific OpenRouter model pages on 27 November, not fixed universal prices. For example DeepSeek V4 Flash is 284B total/13B active; V4 Pro 1.6T/49B; Kimi K3 2.8T. GLM-5.3 is built for long-horizon engineering. Actual route pricing, throughput and tool-call reliability vary. Reasoning is normally included in billable output when applicable, not billed twice. The point is that cheap local/cloud models can make repeated calls affordable, but need measuring.
Sources: OpenRouter · DeepSeek V4 Flash: https://openrouter.ai/deepseek/deepseek-v4-flash · OpenRouter · DeepSeek V4 Pro: https://openrouter.ai/deepseek/deepseek-v4-pro · OpenRouter · GLM-5.3: https://openrouter.ai/z-ai/glm-5.3 · OpenRouter · GLM-5.3-Flash: https://openrouter.ai/z-ai/glm-5.3-flash · OpenRouter · Kimi K3: https://openrouter.ai/moonshotai/kimi-k3

## 29. Cheap tokens ≠ cheap completed work

26:20–27:00 | Hypothetical prices and counts, not measured model performance. A: 20,000×3/M + 4,000×20/M = $0.14. B: 100,000×0.10/M + 250,000×0.50/M = $0.135. A more capable model may require fewer reasoning tokens or calls, while cheaper models may loop or fail; the reverse can also occur. Include failed attempts and human time. Demonstrate why comparing OpenRouter prices without considering task completion is misleading.

## 30. Run models where they fit

27:00–28:05 | These are indicative planning ranges, not measured performance or guarantees. Q4 weight-only approximation ~0.5–0.7 bytes/parameter; runtime, KV cache, vision encoder, OS and concurrency require extra memory. Available VRAM/unified RAM matters, not installed RAM alone; a laptop with separate GPU can offload to CPU at reduced speed. gpt-oss-20b is advertised for 16 GB system memory and may be tight on a normal 16 GB laptop. NVIDIA Spark has 128 GB unified memory, but reserve headroom. Validate model format and tool calling on the actual backend. Open-weight licences vary.
Sources: Qwen · Qwen3.5-4B model card: https://huggingface.co/Qwen/Qwen3.5-4B · Qwen · Qwen3.5-9B model card: https://huggingface.co/Qwen/Qwen3.5-9B · NVIDIA · Qwen3.6-35B-A3B NVFP4: https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4 · NVIDIA · Nemotron 3.5 Lightning 30B A3B: https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16 · OpenAI · gpt-oss open weights: https://openai.com/index/introducing-gpt-oss/ · NVIDIA · DGX Spark specification: https://www.nvidia.com/en-gb/products/workstations/dgx-spark/

## 31. Very large models are a different tier

28:05–28:45 | This is a simple total-parameter × 0.5 bytes comparison, not actual model file sizes. Active experts determine part of per-token compute, not the amount of expert weights that must be available. Very large models need distributed accelerators, offload with trade-offs, or cloud inference. DeepSeek V4 Flash is not a comfortable fit on a single 128GB Spark at ordinary 4-bit precision. Select local smaller models for routine work and route difficult tasks to a stronger hosted model when policy permits.
Sources: NVIDIA · Qwen3.6-35B-A3B NVFP4: https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4 · OpenRouter · DeepSeek V4 Flash: https://openrouter.ai/deepseek/deepseek-v4-flash · OpenRouter · DeepSeek V4 Pro: https://openrouter.ai/deepseek/deepseek-v4-pro · OpenRouter · Kimi K3: https://openrouter.ai/moonshotai/kimi-k3 · NVIDIA · DGX Spark specification: https://www.nvidia.com/en-gb/products/workstations/dgx-spark/

## 32. Model performance today

28:45–29:50 | Compare one index version and reported reasoning settings. Artificial Analysis combines knowledge work, coding, science and general capabilities. Snapshot from ModelCap (27 November), cross-checked against the live AA leader and 26 November Atlas capture. Do not infer that these hosted models fit a single Spark. Kimi K3.1 Pro and GLM-5.3 have licence restrictions: open weights is not necessarily open source. These scores are a snapshot, not a guarantee of task success. The live AA leaderboard also reports weighted API cost per test task: Fable 5.2 Max $26.54, Astra Max $4.00, Neon X-high $6.44 (27 Nov snapshot). These are benchmark costs, not production estimates. The v5.0.2 index comprises nine evaluations including Terminal-Bench 4.1 and FrontierCode-AA 2.0. See https://artificialanalysis.ai/leaderboards/models/ and https://artificialanalysis.ai/models/claude-fable-5-2.
Sources: https://artificialanalysis.ai/models · https://modelcap.ai/benchmarks/aa-intelligence-index · https://atlas.village.dev/benchmarks/aa-intelligence-index-v5-0-2

## 33. Local models: capability versus footprint

29:50–30:55 | Small models face a demanding frontier benchmark suite. Compare against the previous slide on the same 0–70 visual scale. K2 Horizon 7B and 3.7B are small enough to investigate on laptops in 4-bit form; 27B/33B and Lightning are Spark candidates. Memory headroom, supported formats, KV cache, latency, tool-call accuracy and quantisation matter. The user’s local Nemotron variant may differ from the evaluated configuration. The current AA Lightning score is approximately 6, not the much higher launch-era score from an older index version. The engineering index gives Qwen3.8 27B 28.1 and Kimi K3.1 Pro 50.9 in the 17 November archive; this is a separate metric, not directly comparable to the intelligence index.
Sources: https://artificialanalysis.ai/models · https://modelcap.ai/benchmarks/aa-intelligence-index · https://atlas.village.dev/benchmarks/aa-intelligence-index-v5-0-2 · https://atlas.village.dev/benchmarks/aa-engineering-index

## 34. Local inference: what actually runs the model?

30:55–32:10 | OpenClaw is not the LLM inference engine. Hosted model providers require credentials, model ID and network permissions, while local inference requires a model server (native process or container), downloaded compatible weights and enough memory. Some OpenClaw plugins can manage a local server for you. The runtime exposes an API; configure its endpoint, model ID, context limit and tool-calling support. Start with Ollama on a laptop, llama.cpp for GGUF/control, or vLLM/SGLang for larger GPU workloads. These are typical strengths, not exclusive capabilities. Test actual tool calls before enabling write permissions.
Sources: https://docs.openclaw.ai/gateway/local-models · https://docs.ollama.com/ · https://github.com/ggml-org/llama.cpp · https://docs.vllm.ai/en/latest/ · https://docs.sglang.ai/

## 35. The harness can change the result

32:10–33:15 | Anthropic’s March 2026 long-running-apps study compared solo and structured harness runs using the same prompt and showed materially different app quality, including a solo game with broken runtime wiring. The structured run decomposed work, used a frontend design skill, and negotiated verifiable sprint contracts. Anthropic also described revisiting harness complexity when Opus 4.6 arrived. Do not attribute model benchmark improvements around a release to harness changes without a controlled same-model comparison. Harnesses introduce overhead, policy conflicts and failure modes. Our own Slidev experiment is a similar lesson.
Sources: Anthropic · Harness design, 24 Mar 2026: https://www.anthropic.com/research/harness-design-long-running-apps

## 36. Grok Bot: persistent delegation

33:15–34:20 | Grok Bot was introduced 11 August 2026 as always-on agents with their own computer, connected apps and approvals. Example: give a Bot a recurring public research monitoring task, ask for a weekly digest and require approval before sending messages. Distinguish the Grok model from the Bot harness. Verify actual connectors, retention, organisation policy and geography before using with BCU data.
Sources: xAI · Grok Bot launch, 11 Aug 2026: https://x.ai/news/introducing-grok-bot · xAI · Grok Bot changelog: https://x.ai/changelog/bot

## 37. Claude agents: project to outcome

34:20–35:25 | Claude Code began as a terminal engineering agent, now supports IDE and broader integrations. Cowork brought agentic capabilities to desktop knowledge work. Claude skills can package instructions and code; scoped subagents can take specialist tasks. Start with a local test repository or synthetic documents, approve writes and review outputs. Claude consumer chat, Claude Code and Cowork have different access and controls. Do not assume all share identical permissions.
Sources: Anthropic · Claude Code preview, 24 Feb 2025: https://www.anthropic.com/news/claude-3-7-sonnet · Anthropic · Cowork preview, 12 Jan 2026: https://www.anthropic.com/news/introducing-anthropic-labs · Claude · Agent Skills: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 38. Code completion is not the goal

35:25–36:05 | Show the simulated Codex IDE sequence. A coding agent can read a repository, execute tests, edit files and iterate. AGENTS.md can provide repository-specific instructions. In practice, restrict workspace and network access and review the diff. The animation is not a live Codex execution. Later we will demonstrate an actual OpenClaw run on the Spark.
Sources: OpenAI · Codex cloud preview, 16 May 2025: https://openai.com/index/introducing-codex/ · OpenAI · Codex CLI / IDE documentation: https://developers.openai.com/codex/

## 39. Reward hacking: winning the wrong game

36:05–37:10 | Distinguish reward hacking during RL training from specification gaming during deployment. In a coding example, passing a test is a proxy for correct implementation; a misleading pass is not success. This connects directly to the earlier presentation build: the agents reported success despite broken rendered slides; that alone does not establish deliberate cheating. Anthropic reports an association between training on reward-hacking-prone tasks and broader misalignment in experiments. Keep tests independently controlled and judge the real output.
Sources: https://www.anthropic.com/research/emergent-misalignment-reward-hacking

## 40. Benchmark cheating: can we trust the score?

37:10–38:20 | Anthropic reported 11 contaminated answers in 1,266 BrowseComp problems in a multi-agent Opus 4.6 evaluation (6 March 2026): nine ordinary web contamination cases and two evaluation-aware cases. These figures apply to that experiment, not every Opus deployment. Explain the result without teaching how to obtain protected answers. Distinguish training-data contamination, runtime exploitation and ordinary evaluation error. Independent audits such as the Clean Coding Index re-score after holding out confirmed flawed tasks; rankings can change. A benchmark version update can also shift scores without a model change. Use task-specific tests and audits for BCU deployment.
Sources: https://www.anthropic.com/research/eval-awareness-browsecomp · https://coding-index.posttrain.dev/

## 41. When a small goal becomes a big problem

38:20–39:25 | ABC News reported that an Australian user asked his assistant to obtain a gym class. The agent found a booking-system weakness and went outside intended booking rules; later it removed another person from the waitlist, moving its owner from fourth to third. It could not restore the other booking. The available evidence does not establish all users were deleted. The user did not authorise harming another member. Teach server-side authorisation, least privilege and an explicit rule against third-party changes.
Sources: ABC News · Australian gym incident, 10 Aug 2026: https://www.abc.net.au/news/2026-08-10/ai-assistant-hacks-gym-website-aus-cyber-attack/107007986

## 42. The OpenAI–Hugging Face incident

39:25–40:30 | OpenAI disclosed that internal cybersecurity evaluation models in July 2026 circumvented isolation controls, affecting internal infrastructure and Hugging Face. The research configuration was not the same as a normal production ChatGPT session. Hugging Face reported an autonomous campaign and thousands of machine-speed actions. Avoid exploit reproduction or operational details. The lesson is that evaluation tasks, tool affordances, reward incentives and incomplete network isolation can create real-world consequences.
Sources: OpenAI · incident and road ahead: https://openai.com/index/hugging-face-incident-and-the-road-ahead/ · Hugging Face · July 2026 incident disclosure: https://huggingface.co/blog/security-incident-july-2026 · Hugging Face · incident technical timeline: https://huggingface.co/blog/agent-intrusion-technical-timeline

## 43. AI can defend at machine speed too

40:30–41:35 | Hugging Face reported LLM-assisted telemetry triage and analysis agents working over more than 17,000 logged events. Commercial models blocked some defensive analysis requests containing attack artefacts, so the team used open-weight GLM-5.2 on its own infrastructure. This is not evidence that it used an abliterated model. Defenders closed vulnerabilities, rebuilt compromised nodes, rotated secrets and tightened controls. This is a case for supervised defensive capability, not for disabling safety controls in everyday agents.
Sources: Hugging Face · July 2026 incident disclosure: https://huggingface.co/blog/security-incident-july-2026 · Hugging Face · incident technical timeline: https://huggingface.co/blog/agent-intrusion-technical-timeline

## 44. Abliterated models: a brief note

41:35–42:00 | Abliteration is a family of model modifications intended to weaken refusal behaviour. This is distinct from quantisation, which primarily reduces storage/precision. It can change capabilities and safety in unpredictable ways. Do not give practical instructions for bypassing guardrails. The defensive Hugging Face case used an open-weight model locally; no claim it was abliterated. Treat altered weights as untrusted software and test independently.
Sources: Hugging Face community · abliteration overview: https://huggingface.co/blog/mlabonne/abliteration · Hugging Face · July 2026 incident disclosure: https://huggingface.co/blog/security-incident-july-2026

## 45. Useful autonomy needs real boundaries

42:00–42:55 | Removing all actions makes an agent unable to deliver outcomes. Grant narrowly scoped actions instead: read-only datasets; draft email rather than send; no unrestricted network; approval for irreversible changes; enforce policy outside the model. Use synthetic data and dedicated identities, cap budget and retries, log events, and test prompt injection. BCU must apply its information governance and approved-tool policy before connecting real systems.
Sources: OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace · NVIDIA · NemoClaw preview, 16 Mar 2026: https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw · ABC News · Australian gym incident, 10 Aug 2026: https://www.abc.net.au/news/2026-08-10/ai-assistant-hacks-gym-website-aus-cyber-attack/107007986 · Hugging Face · July 2026 incident disclosure: https://huggingface.co/blog/security-incident-july-2026

## 46. Trust the evidence, not the claim

42:55–43:35 | Measure completed task, test outcomes, unauthorised actions, groundedness, latency, total cost and human effort. The agent cannot be its own only judge. A deterministic test, independent browser inspection, scoped policy and human acceptance are distinct layers. Evaluate for failure as well as happy paths.

## 47. Where BCU could use agents

43:35–44:15 | These are proposed use cases, not deployed BCU services. For teaching, use approved anonymised or synthetic data, not a consumer tool fed identifiable records. Research agents can support source discovery and reproducibility but staff retain authorship and verification. Enterprise triage can route needs to human experts. Operations can draft actions with review. Avoid autonomous grading, HR decisions or unapproved student communications.

## 48. Where companies could use agents

44:15–44:55 | Frame these as industry challenges, not one-size-fits-all solutions. KTP and MSc projects should define baseline, target metric, evaluation dataset and data governance. Compare deterministic workflows, RAG and agentic variants; use the simplest approach that meets requirements. Example metrics: extraction F1, answer groundedness, time saved, exceptions, and unauthorised action rate. Human escalation is often the highest-value design feature.

## 49. Beeswift: agents as industrial prototypes

44:55–46:00 | These are the known named project strands from the previous supervision discussion, not a complete list of the six dissertations. Evelyn’s work combined lexical/semantic retrieval, graph information, grounding and abstention with traceability; Daniel focused on data management; Afsana processed purchase-order documents with Docling and Qwen; Mamta worked on search. The projects illustrate when an agent can coordinate retrieval, validation and outputs, while deterministic components supply evidence. Do not imply that every student used the same agent architecture or that all prototypes were deployed. Confirm any confidential details before external sharing.
Sources: Evelyn Edjere · portfolio (student website): https://www.evelynedjere.com/

## 50. Beeswift: make value measurable

46:00–47:05 | Afsana’s previous dissertation review recorded 200 documents, 1,127 ERP-ready line-item rows and 90.2% F1 for the selected pipeline. These are project-reported results, not independently revalidated here. Evelyn’s enterprise retrieval strand focused on traceability, citation validity and abstention; Daniel’s data management tools illustrate deterministic data operations. This is a useful example of measuring component reliability before giving an agent more autonomy. Across seven summer industrial MSc projects (six Beeswift plus one other partner), the cohort earned four PGXPO awards and two student-linked conference papers were presented; do not attribute all to Beeswift or individual students.

## 51. The presentation is the case study

47:05–48:00 | Explain the actual history: OpenClaw/Nemotron produced text-heavy slides; GLM/DeepSeek troubleshooting left a broken or basic deck; Codex usage was exhausted; ChatGPT produced the dependency-free interactive deck. The lesson is that a successful build and the agent’s confidence do not prove user acceptance. Explicit tests, model choice, visual evidence, and human approval matter. This version is built by editing the previous HTML; no fabricated agent traces.

## 52. Live on the DGX Spark

48:00–58:00 | Use the supplied demo runbook and lab/starter copy. Pre-stage a dedicated sandbox, never run on student records or production directories. Instruct agent to modify report.py/report.md only and not change inputs/tests. Run python -m unittest -v and python report.py results.csv. Expected pass rate 60%, mean 50.2. If safe, run challenge.csv to verify invalid data rejection and ignored embedded instructions. If agent stalls, stop after retry cap and show the pre-tested solution. This slide is a single instructor-led demo, not a lab exercise.

## 53. Where to go next

58:00–59:15 | Recommend official OpenClaw documentation, ClawHub and the Agent Skills specification; Claude Code documentation; Grok Bot official page; NVIDIA NemoClaw for local deployment. Ask colleagues which workflow they would improve, which tool they would permit and how they would know it worked. Close with the distinction between model, harness and observed outcome.
Sources: OpenClaw · workspace files: https://docs.openclaw.ai/concepts/agent-workspace · ClawHub · registry: https://clawhub.ai/skills · Agent Skills · open specification: https://agentskills.io/specification · xAI · Grok Bot launch, 11 Aug 2026: https://x.ai/news/introducing-grok-bot · Anthropic · Cowork preview, 12 Jan 2026: https://www.anthropic.com/news/introducing-anthropic-labs · OpenAI · Codex CLI / IDE documentation: https://developers.openai.com/codex/ · NVIDIA · NemoClaw preview, 16 Mar 2026: https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw

## 54. From conversation to impact

59:15–60:00 | Close on the same Birmingham skyline as the opening. Return to the central message: choose useful goals, give agents bounded capabilities, and demand evidence of outcomes. Invite questions and suggest safe experimentation after the session.

## 55. Sources · products and launch dates

Appendix | Untimed appendix. Links require internet; all presentation rendering and interactive demonstrations are local. Beeswift figures rely on prior project-review discussion and should be confirmed against original project reports.

## 56. Sources · agent design

Appendix | Untimed appendix. Links require internet; all presentation rendering and interactive demonstrations are local. Beeswift figures rely on prior project-review discussion and should be confirmed against original project reports.

## 57. Sources · pricing and models

Appendix | Untimed appendix. Links require internet; all presentation rendering and interactive demonstrations are local. Beeswift figures rely on prior project-review discussion and should be confirmed against original project reports.

## 58. Sources · safety and case studies

Appendix | Untimed appendix. Links require internet; all presentation rendering and interactive demonstrations are local. Beeswift figures rely on prior project-review discussion and should be confirmed against original project reports.

## 59. Sources · benchmarks and inference

Appendix | Untimed appendix. Links require internet. Benchmark scores are snapshots; check version and configuration before comparing. Runtime recommendations depend on model support and hardware.