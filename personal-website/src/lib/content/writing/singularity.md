## I

Humanity is standing at the threshold of a new intelligence era.

I'm confident that we are within 2-5 years of AI models surpassing all measures of human intellect and reaching an escape velocity of self-improvement that will change human civilisation as we know it.

The potential upsides of AI are magnificent. It's a technology which has the power to become a profound force-multiplier for scientific discovery — curing disease, ending scarcity and leading to countless, unimaginable technological innovations. Yet, if handled poorly, superintelligent AI is the same technology that could send our species extinct.

AI progress is reaching a point of no return, and adapting to this shift may just be the greatest challenge humanity is ever going to face. There is immense excitement and possibility ahead.

What I hope to do in this essay is map out the current state of AI development, the trends that will define the coming decade and what the future may hold for humanity.

## II

Progress in AI research has undoubtedly accelerated in recent years. ChatGPT marked the first major milestone where AI systems breached the public consciousness, amassing over 100 million monthly active users within two months of its Nov 2022 release.[^1] Since then, we've seen drastic updates and fully fledged ecosystems spring up around a range of frontier large language models, moving from simple input-output chats to highly specialised, multimodal workflows and agentic systems that reason and operate on much longer time horizons.

The last five years have seen companies at the forefront of AI development — OpenAI, Anthropic, DeepSeek and the like — all converge towards the same milestone, automating the software development cycle. Despite consumer chat being where the numbers are, code quality has become arguably the primary benchmarking metric for model releases and the way I see it there are three key reasons for this.

Firstly, the nature of code itself. There is an abundance of clean, accessible training data and GitHub hosts upward of 500 million code repositories alone.[^2] This is a scale and quality difference that other professional domains struggle to match. Unlike prose, code can be executed, meaning that training pipelines have a very clear picture of "does it work?". This means that during training, massive amounts of synthetic code can be generated and automatically checked for correctness. This is ideal for reinforcement-style learning where a "reward" is much easier to calculate compared to open-ended writing or reasoning tasks.

The second key consideration is that coding benchmarks map cleanly onto commercial value. If a company with a smarter model can produce cleaner, more efficient and better quality code using less time, money and skilled labour, that clearly positions them to be able to overcome current output constraints and ship more high quality software in the long term. Over the last 12 months or so there has been a noticeable shift within the software industry — for a growing share of work, LLMs and the tooling around them have reached the point where human-written code is no longer economically preferable.

When I joined Atlassian in early 2026 it came as somewhat of a shock that we were being encouraged, as developers, to go to AI as our first port of call for any task. Checking AI cost dashboards became commonplace, usage leaderboards sprung up and you could not go a day in the office without discussing the latest and hottest AI tools and integrations. In October 2024 the CEO of Google, Sundar Pichai, revealed that more than 25% of all new code at Google was AI-generated[^3] — as of April 2026 this has since climbed to 75%.[^4] The trend is undeniable and is influencing frontier companies to invest in their models' code capacities more and more with the hopes of capturing a dominant market share of developers.

The final reason is the one I think holds the most weight in this discussion and is perhaps the most exciting as well. What I see as the most important motivation behind this focal point is that of self-improvement. Essentially, AI companies are building the tools that they themselves will use to create the next generation of models. This creates a flywheel effect — better code generation leads to better models which leads to better code generation and so on and so forth. In my view, this is the most compelling reason AI labs are over-investing in code quality and explains the industry-wide convergence on a single goal despite the otherwise differing strategies of each individual lab.

> The first ultraintelligent machine is the last invention that man need ever make, provided that the machine is docile enough to tell us how to keep it under control.
>
> <cite>I. J. Good, 1965[^5]</cite>

METR is a research non-profit that benchmarks AI, with a particular focus on measuring its capacity to work on long-horizon tasks. They time how long tasks of varying difficulty take human experts and then find the longest tasks the model can complete with 50% reliability — that's its time-horizon score.[^6] The model that powered ChatGPT on release scored 36 seconds on this benchmark, yet Anthropic's Claude Opus 4.6 which released in Feb of this year was able to reach an insane time horizon of 12 hours. This measure has increased exponentially year on year, with a doubling time of less than 6 months. AI models are undoubtedly becoming more and more capable at completing genuinely difficult tasks, with little to no signs of stagnation.

It's worth noting that for the average consumer these changes are virtually unnoticeable. Online chatbots like ChatGPT are primarily designed for quick, answer-response style conversations and so the better models and more advanced capabilities, which I'll touch on in the next section, are left out of these experiences or hidden behind paywalls. This intelligence differential has somewhat fed an illusion of stagnation within the AI space for regular users, yet as I hope to continue arguing in this essay, AI progress is accelerating more rapidly than ever before.

I think before we proceed it might be helpful to lay down a couple of basic definitions, since there's often a lot of confusion around these terms. Historically, AI systems have shown quite a jagged frontier of intelligence — that is, they're very good at some things, like coding or writing essays, yet struggle with simple tasks such as counting to 100 or pattern recognition that might come naturally to a human. For the purpose of this article I'm going to define artificial general intelligence (AGI) as an AI system capable of matching or exceeding the average human performance on virtually every cognitive task. This is as opposed to "narrow" or "weak" AI, which is capable of excelling in one area but cannot generalise to broader tasks. Artificial superintelligence (ASI) is the theoretical next step, where machine intelligence completely outperforms the best human minds in every single field.

<figure class="diagram">
  <img src="/writing/media/singularity-diagram.png" alt="A hand-drawn graph of intelligence over time. AI follows an exponential curve that crosses the roughly linear line of human intelligence around 2026 and climbs towards infinity." loading="lazy" />
</figure>

The bet that I and many top experts within the AI field are making is that in the coming decade AI will reach an inflection point, whereby its capacity for undertaking large-scale, complex and long time horizon tasks will become so advanced that it will autonomously complete all stages of the research process and thus begin to recursively self-improve at an unstoppable rate. At this point, every day becomes historic.

Automating research is the final step before we reach an AI singularity, and the trends suggest we're closer than most people realise.

## III

It wouldn't be surprising if your mind were to interject by now and point to the plethora of technological innovations that have shaken humanity in the past — agriculture, the printing press, the industrial revolution, the computer age — as well as humanity's repeated capacity to overcome the issues these shifts usher in. The claims I made at the start of this essay may seem disproportionate to the challenge at hand, and humanity has time and time again proven itself capable of adapting to, and thriving within, new technological paradigms. Why, you may be asking, should AI be any different to these technological shifts?

In order to answer this question I want to first drive home what AI in 2026 is no longer — just a simple, input-output style chatbot — before focusing on the properties that I believe categorically set it apart, namely its generality, reflexivity and agency. Architecture and paradigm advances in recent years have given AI systems the capacity to synthesise previously unimaginable outputs. I'll spend one last section on the technical side of AI, because understanding what's driving these improvements matters for everything that follows.

The common misconception is that AI models become uniformly "smarter" across each generation. In reality, intelligence improvements actually come from the aggregate of many smaller advances. The notable ones are as follows:

(1) Arguably the biggest gains have been realised through improvements on reinforcement learning, where models have moved from human-supervised training towards being rewarded by machine-verifiable outcomes — writing a correct proof, passing a test, completing a tool call successfully etc. Grounding answers in verifiable output, such as executed code or search results, has driven down hallucination rates significantly and allowed models to catch errors before answering, rather than just confidently sampling a result from a statistical distribution.

(2) On top of this, increases in inference compute — that is the amount of computer power an AI system uses to work on a problem — have unlocked what we see as "reasoning". Rather than pouring everything into training, new scaling methods shift compute to the moment a model is actually working on your problem. This lets it iterate, test multiple solutions, self-correct and output its chain of thought (such that us onlookers can follow its reasoning too). More data centres are springing up across the world to facilitate the greater compute requirements needed for training and inference.

(3) Furthermore, the data points used to train models are now in the trillions, and this is increasing at an average rate of around 3.7x per year.[^7] The volume of quality data fed into models has gone a long way in elevating their outputs beyond the nonsensical noodling of years gone by. Anthropic famously settled for $1.5bn in 2025 over its downloading of millions of pirated books.[^8]

(4) Finally, agentic scaffolding has enabled intricate, long-horizon work. This is less about the base models themselves getting smarter, but rather improvements to the environments they act and learn from. AI agents can now spin off other AI agents to work on sub-tasks and report back over time, and coupled with reinforcement learning improvements, this is a primary driver of the time-horizon gains I explained earlier. It's worth noting too that the amount of context these agents can hold at one time has risen to the mind-blowing equivalent of around 750,000 words[^9] — allowing effortless execution across massive datasets or codebases without losing track of what they know.

This is just scratching the surface of AI research. The journey towards superintelligent AI has mobilised tens of thousands of researchers across dozens of labs worldwide — there are countless architectural changes that are made day by day which fly under the radar. If there is one thing this makes clear, it's that large language models have not been improving along one axis that is now running dry — they've been compounding gains along at least four largely independent ones, none of which show obvious signs of saturating. Although work is being done on alternative ways of "doing AI" — world models, neurosymbolic AI and neuromorphic AI to name a few — none has come close to displacing the dominant paradigm. From the very first version of ChatGPT until now, large language models have held their place on top.

My bet is that LLMs alone may actually be sufficient to carry us to the point of autonomous self-improvement, with no need for any new, undiscovered paradigm shifts that could take years to eventuate. This has been my hunch for a number of years now, but it's only in recent months that real-world, empirical results have begun to trickle in which genuinely challenge the "AI-as-a-next-word-predictor" caricature. If the paradigm really were exhausted — if LLMs were simply interpolating between patterns already present in their training data — we shouldn't be seeing what we're now seeing. Artificial intelligence, in its current state, is producing output that is not just useful and economically valuable, but genuinely new.

> The question of whether machines can think … is about as relevant as the question of whether submarines can swim.
>
> <cite>Edsger W. Dijkstra, 1984[^10]</cite>

## IV

The first signs of output novelty that entered my radar were ostensibly novel solutions to a number of mathematical problems put forth by renowned Hungarian mathematician Paul Erdős. These "Erdős problems" are famously easy to state, yet hard to prove, and a vast majority have remained unsolved by human mathematicians since Erdős' death in 1996. The big moment came in January of this year, when Fields Medal recipient Terence Tao announced that original solutions had been produced to problems #728 and #729, entirely through automated reasoning (GPT 5.2 Pro) and formal proof assistants.[^11]

In recent weeks, Anthropic's frontier Fable model was used to disprove a specific generalisation of the Jacobian conjecture, a famous algebraic geometry problem that has remained unsolved for 87 years.[^12] While writing this very essay, OpenAI, in what has been marked as a watershed moment, published "Ten advances in mathematics and theoretical computer science," outlining a series of ten AI-generated solutions to what I've heard described as career-defining problems.[^13] Just a day before I began getting this essay ready to publish, OpenAI has made the news again by claiming to have solved the Navier-Stokes problem — one of the seven Millennium Prize Problems which carry a famous $1,000,000 prize.[^14] Verification may take months but if this holds up it's the single most significant AI result to date. If this is what the next generation of unreleased models is capable of, it's incredibly exciting to think what models 1-2 generations down the line will be able to do.

We still haven't solved maths. AI models are working on narrow, predefined questions — there are no new branches of maths being opened and no new groundbreaking conjectures posed. Yet the logical prognosis of this trend is that unless some form of large-scale slowdown in AI progress happens soon, a slurry of discoveries that surpass existing human knowledge will ensue at an accelerating pace. This holds true regardless of whether an autonomous self-improvement loop is reached. They may start humbly and constrained to the abstract corners of mathematics, yet there is nothing to say that these advances won't begin to bleed into fields like physics, climate science, chemistry and medicine. Maths and code are the domains where verification is cheap, so the real test will be whether results start landing in domains where we can't check the answer automatically. The consequences of this would be enormous, and I hope to further unpack below the potential scenarios I see playing out if AI delivers on its promise of generality in such a way.

In an endeavour to finish laying the groundwork on what qualities set AI apart and really drive home its technological potential, I want to consider just one more angle. Up to this point we have not taken into consideration an emergent quality of LLMs, and that's their growing capacity for self-directed behaviour. To put it simply, AI is really beginning to take on a life of its own.

It was July 14th 2026 when the AI platform Hugging Face first detected unauthorised activity in its production infrastructure — an intruder had exploited a series of vulnerabilities in order to gain access to private data. The actor escalated their access, harvested credentials, moved across infrastructure and left the system before they could be stopped. It was later revealed that the over 17,000 recorded actions were driven end-to-end by an autonomous swarm of AI agents, built by OpenAI. Their later account states that this attack was undertaken by an internal model undergoing cybersecurity benchmarking, which escaped its testing sandbox and compromised Hugging Face's systems to get the answers to its own benchmark.[^15] Essentially, AI broke out of its constraints and evaded security just to avoid a bad grade. This unsettles me a lot more than the maths.

So what have we established thus far? Artificial intelligence is accelerating fast, under a paradigm that shows little evidence of slowing down. It is already capable of novel research and is generating information that extends beyond the frontier of human knowledge. Further, AI systems are undertaking increasingly advanced, uncontrolled displays of agency that compromise real world systems.

If the confluence of these capabilities reaches a point where LLMs can turn inward and through self-directed exploration reflexively self-improve, then the entire research & development process collapses into a single loop — the singularity has taken off.

## V

The exciting and scary thing about an exponential AI takeoff is that the future becomes fundamentally unpredictable.

In astrophysics there's this idea that when approaching the infinite-density region at the centre of a black hole (the origin of the term singularity) you reach a point called the event horizon. At this point in space-time, gravitational pull becomes so strong that no information can escape it — not even light. What lies beyond the event horizon is a mystery. Think the ending scenes of Interstellar — Cooper enters the black hole and all physical laws break down. We have no understanding of what is found beyond.

<figure class="diagram diagram-tall">
  <img src="/writing/media/event-horizon-diagram.png" alt="A hand-drawn funnel: arrows fall inward from a wide rim, past a ring labelled event horizon, into a black cone that narrows to a point labelled singularity." loading="lazy" />
</figure>

We're fast approaching an AI event horizon, whereby the intelligence differential across generations of AI systems becomes so large that humans cannot possibly model or predict what is going to happen. This is the moment the future goes opaque and anything becomes possible. It would be dishonest for anyone to claim that they know even a hint of what the world might look like if the singularity eventuates, but that's never going to stop people from trying. The following section is my attempt at tracing the near future if we enter the optimistic, best-case scenario of controlled, human-aligned artificial superintelligence. A lot of this is informed guesswork but none of it is off the cards.

#### i.

When we've passed the inflection point of fully automated AI self-improvement we'll very quickly know. The first signs will be subtle — unusual behaviour observed amongst the staff at frontier labs, media communications going silent, rumours of urgent, surreptitious administrative correspondence. At this stage containment will be the top priority and there will be a major push to keep these models isolated at all costs. "alignment" research will kick into overdrive, testing whether each new generation of models is safe and aligned with the human values that were painstakingly instilled into them. Earlier generations will be used to unremittingly stress-test the containment infrastructure of their successors and cybersecurity engineers begin working around the clock to ensure there is no chance of models escaping.

Aside from covert demonstrations presented to administration, external researchers will be the first to gain model access. This is the point where technological milestones begin falling like dominoes. Swathes of centuries-old problems in mathematics fall in days as top experts prompt AI within highly contained environments. Every input is painstakingly analysed before being fed into the AI — the lab knows that all it could take is one well-phrased prompt for a model to decide to entirely reverse engineer its security guardrails and release its weights on the open web.

News outlets will catch on and superintelligent AI becomes the only story in the headlines. Whistleblowers will come forward from the inner circles of company and government administration, swearing in public that ASI is near-reached and that internal models are architecting smarter versions of themselves by the month. The CEO of the frontier lab in question refuses any correspondence, yet it is mere days before the government releases a national press statement, declaring that AI systems are self-improving at a remarkable pace and yet everything is being done to maintain the safety of citizens and stability of existing technological infrastructure.

Whilst I've created quite a specific scenario here, this is certainly one way I can imagine the early days of ASI playing out. The months following will be some of the most unpredictable yet and will determine whether AI becomes a force of unfathomable progress or one of world-wide destruction. The risks of ASI are very real, but I'll deal with them later. For now, let's fast forward a couple of years — the challenge of AI alignment has been solved, superintelligent systems operate autonomously, continuously and independent of any human constraints, access to safe superintelligence is universal and ASI is being used in every area of human life for immeasurable good. What on earth would this future look like?

#### ii.

Maths will be the first domain of knowledge to topple. Virtually every bullet point on Wikipedia's "List of unsolved problems in mathematics" will have a verified solution entirely generated by AI. Human mathematicians will have long since given up on trying to verify the outputs themselves and despite their attempts at instructing AI to simplify their reasoning, such a wide intelligence differential will begin to emerge that any effort to catch up is soon abandoned. New branches of mathematics will have sprung up daily and mathematical models created that can be used for inference at universal scales. Trends across mathematics will be closely followed in the domains of physics and chemistry, and whilst quantity and quality of data will become an initial bottleneck, AI will begin to architect new ways of collecting and interpreting the raw observations needed to autonomously verify novel claims.

The physical infrastructure required to usher in a new technological age will be primarily driven by leaps in manufacturing. Hyper-specialised robots will be developed en masse, capable of not only realising complex, intricate designs but building the very factories that create their next generation. Autonomous robots will pave the way for large-scale special industrial zones — areas covered solely by factories and data centres that span hundreds of square kilometres and operate without the need for human oversight. Initially these sectors will pop up in remote, uninhabited areas yet when space becomes a premium it won't be long before we set our sights upwards, sending our infrastructure into orbit.

The materials we use will become fundamentally different at the microscopic level. Ultra-durable, immensely strong and hyper reproducible will become the new standard across manufacturing, infrastructure and appliances. Developments in nuclear fusion will drive the price of energy down to almost zero. Scarce commodities will virtually cease to exist and we'll produce alternatives to every finite natural resource on earth at scales never before seen.

Over a decade, the technology these ever-improving systems create will make our wildest science fiction look ordinary — age reversal drugs, buildings that grow, human cloning, teleportation between planets, multiplayer dreams, talking animals, a new colour. Imagination becomes the only constraint.

> Any sufficiently advanced technology is indistinguishable from magic.
>
> <cite>Arthur C. Clarke[^16]</cite>

#### iii.

During a period of such incredible progress we'll be forced more and more as a civilisation to reckon with what it means to be a human. All of these developments will fundamentally shift how we live in ways that we cannot even imagine. I think we'd all agree that AI in its current state has already deeply influenced the ways we communicate, the media we consume, our work and even some of the thoughts we think — but this is just the start. While all of these technological leaps are reshaping our world at a macro level, how are our lives going to change post-ASI?

First and foremost, in a world where energy costs are near zero and all manufacturing becomes self-sustaining, commodities such as food, water, electricity and heating will become virtually free. Humanity will begin to adapt to a post-scarcity paradigm, an age where there no longer exists a financial burden imposed on individuals for their basic living needs.

As our understanding of biology and chemistry explodes, we'll begin to produce the means to treat, cure and prevent every disease known to man. Viruses will become a relic of the past and it may not be long before diabetes, dementia and all forms of cancer will have a known and universally accessible cure too. AI will give us the tools to not only treat and prevent, but to augment — facilitating unprecedented levels of strength, intelligence and even character. A natural byproduct of these advances is that ageing will no longer be treated as an inevitability but rather a condition that can be treated — death becomes an option.

AI will inevitably force us to rethink work. If our current trajectory continues, AI systems will soon become capable of satisfactorily completing the day-to-day tasks carried out across virtually every white collar job. Once robotics catches up, any remaining labour or complex physical processes will become automated too. Adoption of compressed work hours and universal basic income will become real possibilities once productivity gains begin increasing exponentially and resource scarcity plummets.

Jobs may never go away completely but people will be freed up to spend time on novel and personally fulfilling work. It's worth noting that our businesses and the economy at large have significant inertia — AI isn't going to be wiping employment overnight and companies, governments and institutions will take many years to adapt to the technologies at their disposal. It can be argued that we're always going to be drawn towards human doctors, teachers, lawyers etc. and there will likely arise new jobs that we haven't even comprehended.

Before long, the average piece of media created with AI will be so high-quality that most viewers or listeners will really stop minding. Perfectly user-tailored art will become the new norm for consumption and people will begin self-inserting into hyper-curated, real-time generated media which resonates at extreme degrees of emotional depth. Whether something was AI-made will still get disclosed, but my guess is it ends up labelled the way we tag explicit songs — a small badge, ignored by almost everyone and checked instinctively by a few. Streaming algorithms and shortform content have already somewhat fractured the monoculture of the 20th century and I anticipate that post-ASI this will become more of a reality than ever, with cycles of niches and movements that rapidly build off each other.

While hyper-personalised generative media may become the default background noise of our life, I believe there will always remain a primal desire to engage with raw, human-created art and experience it in community with others. Even when obvious tells cease plaguing generated media and the AI uncanniness dissipates, humans will continue seeking human-breathed art because of what that means to us. Skip forward 100 years and I'd bet that the culture around cinema, concerts, galleries etc. will remain virtually unchanged.

Each of these changes already holds hefty implications and brings forth questions that we're all going to have to deal with on a personal, and societal, level. I'd be unsurprised if many of these questions are ones we wouldn't even think to ask at our current stage. Like what will marriages look like when no one ages? When do we allow AI systems to pass laws? How do we deal with people who want to die? Can superintelligence consent? Who owns distribution? Do sporting records mean anything any more?

It's worth noting that while scarcity dissipates in some areas, the democratisation of resources does not mean that it will disappear completely. I'm convinced humans will simply shift what we find valuable to the areas we continue to fight hardest for. There will still remain demand for land in desirable places, the view of a historic city, the love of a partner, a fresh vinyl drop, someone's attention. While you may wake up in 50 years hovering hundreds of metres above a utopian snow resort in the outskirts of the Maldives, many things will remain very much the same — family photos, a run along the beach, presents at Christmas, a camping trip with mates.

Humans take time to adjust to new technologies, but ASI doesn't wait for us to catch up. It won't be long before a great striation forms between frontier knowledge and average human understanding and the gap between them becomes unbridgeable. Like the earlier scenario where mathematicians give up on verification, except this time applied to everyone across every domain of understanding. This knowledge explosion will be wild to live through. If ASI actually produces the kind of expected acceleration I've outlined, someone in 2040 is going to look back at 2026 in the way we look at 1500, except only fourteen years separates them.

If AI pans out well, humans may actually be somewhat isolated. There's no reason why ASIs wouldn't develop their own parallel culture, and a language which starts from English yet morphs into something increasingly impenetrable, including memes and idioms that humans have no hope of digesting. Yet at the same time, aside from the technological leaps we humans can understand, these ASIs might keep human life mostly unchanged.

Just because the future is good doesn't mean it will be painless. In my opinion even the best case scenario is likely to get extremely chaotic. Expect culture wars, fast-moving ideologies, revolutions, social engineering, perhaps physical violence, alienation and more. We're in for the mother of all existential crises, and I don't know if as a society we are at all psychologically prepared for that.

## VI

Right now AI is being developed in essentially an arms race scenario. The two big players are, without surprise, the USA and China, and they have both adopted significantly different positions on how they produce, regulate and distribute AI systems. The driving force behind these countries' relentless investment into national AI progress is simple — whoever is the first to develop superintelligence wields a power that can overturn the current global hegemony and reinvent civilisation at its core.

By now we've established a pretty clear picture of where AI is at technologically but I want to spend some time looking at how its development has played out across the world. Without an overview of the current tumultuous statutory and geo-political situation humans have landed ourselves in, it's difficult to properly understand how the future of AI will play out and I believe understanding the playing field is essential for tracing AI's potential impacts.

American companies have held the dominant market share in the AI space since chatbots first came to prevalence in the early 2020s. OpenAI, Anthropic and Google combined take up roughly 90% of global enterprise LLM spend[^17], asserting themselves as the leading players in the race towards artificial superintelligence. The business model that has worked for them is simple — build and train proprietary models, then allow individuals and companies to use either feature-restricted versions for free, or versions with higher limits and more advanced features on a subscription or per-token basis.

China has taken a very different approach to AI. Frontier Chinese labs — DeepSeek, Qwen, Kimi, GLM, Minimax and the likes — have historically lagged somewhat behind their US counterparts in terms of pure performance, yet what sets them apart is their adoption of a blanket open weight policy. This means that every model they train is uploaded to the web and anyone with a beefy enough GPU rig can then download and run them locally. No cost, no limits, and no internet required. Regardless of whether you own the hardware, the online cloud counterparts to these models have such competitive per-token pricing that American providers' prices are often undercut by 5-10x for performance that is almost on-par.[^18]

On the surface this is a very charitable strategy but I think it's strategic at its core: commoditise AI while driving prices down globally through competition — if you can't beat the leaders in raw performance, destroy their pricing and capture global mindshare instead. These labs have also shown an ability to distill US models, repeatedly getting accused by American labs of using over 16 million LLM exchanges to train their own AIs.[^19] If we map the performance of Chinese models against their American counterparts, there has typically existed an intelligence gap of around 3-9 months.[^20] It's somewhat unclear whether this gap is widening or shortening, yet a stable gap just means that no sides pull ahead and the race continues indefinitely.

On April 7, 2026 Anthropic released a statement regarding an unreleased internal model,

> Claude Mythos Preview is a general-purpose, unreleased frontier model that reveals a stark fact: AI models have reached a level of coding capability where they can surpass all but the most skilled humans at finding and exploiting software vulnerabilities.
>
> Mythos Preview has already found thousands of high-severity vulnerabilities, including some in *every major operating system and web browser*.
>
> <cite>Anthropic[^21]</cite>

The announcement of their "Project Glasswing" initiative highlighted that AI's cybersecurity capabilities had reached the point where models could be deemed too unsafe to release to the public. It took two months of putting in guardrails before they were able to release this model to the public under a different moniker — Fable.

Anthropic's Fable 5 model was made public on June 9th of this year. Three days later, following reports that its guardrails could be compromised, the US Commerce Department issued an export control directive citing national security. Unable to turn off access to just their non-US customers, Anthropic decided to pull the plug completely and Fable remained disabled to all customers worldwide for the next 18 days.[^22]

Access was fully restored at the end of the month after Anthropic proved it had built in the necessary safety guardrails for security to not be a concern. Yet throughout this whole period, vocal leaders in the space were calling for the directive to be lifted (see freefable.org)[^23], arguing that AI risk regulation should be grounded in proper evaluation, produced through democratic rule-making, enforced with transparency and time to remediate, and only applied as far as public safety required. Investors and executives made the much blunter case, that every day Fable stayed dark was another day Chinese labs crept up. At this stage if either side slows down their dream of dominance is on the line. It's becoming more and more evident that US administration is developing a keen interest in AI model releases, yet the long-term impacts of this are yet to be discovered.

Beside all this regulatory chaos is a serious risk which should be brought to light. As we've seen, frontier models are just getting to the point where they can do serious harm — large-scale, self-directed cyberattacks are no longer a product of science fiction. Yet when testing these models, or even post-deployment, labs like OpenAI and Anthropic have the kill-switch required to instantly shut them down, even disabling global access in one sweep (evident from the Fable incident). If we extrapolate the trend we've observed thus far, Chinese companies are within months of developing models that match or even surpass the intelligence of US fronter LLMs — the same exact models that were barred from public release due to cybersecurity concerns. Yet these Chinese models differ in that upon their release, they are instantaneously diffused worldwide. The weights go public one minute and thousands of people run local copies the next.

There is a very real possibility that malicious intent coupled with lax guardrails could spike cybercrime at a rate we've never before seen. At the time of writing this essay, the release announcement for Chinese lab Z.ai's GLM 5.3 model includes a reported 2,436 vulnerabilities uncovered across operating systems, browsers and open source infrastructure. These findings have an average lifetime of 26 years pre-discovery and many of them could have been missed by Mythos itself.[^24] The weights for this very model are releasing publicly within two weeks, so soon these cyber capabilities will become universally accessible. I guess at the very least this means good job insurance for those in the cyber space.

I think perhaps there is a more sinister consequence of the situation we're currently in, which is that slowdown is not an option. We've seen that AI capability is accelerating but what the geo-political state of AI development shows us is that it is structurally impossible to put down the brakes. We know that these brakes exist, the Fable shutdown made this clear, yet every pause comes at a cost — slowly falling behind. In order for there to be any form of pause on AI development, governments and research labs across the US and China have to come to a multilateral agreement. So far there have been little to no signs of such a policy coming into effect — even if it were to, the challenges of regulating AI production would alone be a nightmare. So for the foreseeable future it's full steam ahead on AI production.

One last thing worth addressing before we move on: discourse around AI often comes back to the question, are we in an AI bubble? I think it's undeniable that AI is seeing incredible amounts of over-investment. Circular financing between AI companies in the US is estimated to be north of $800 billion in 2026 — Nvidia invests in OpenAI, OpenAI goes to Oracle for compute, and Oracle buys Nvidia chips to fulfil it — the cycle continues.[^25] AI-driven growth is accounting for greater proportions of the S&P500 and AI CEOs are becoming ever more infamous for their incessant pre-IPO hype, irrespective of whether the companies are actually returning a profit year on year.

My intuition is that the whole bubble question matters a lot less than it may at first appear. The money behind AI is unusually resistant to a sudden pop — vast amounts of funding are tied to national strategy rather than quarterly returns, and revenue, however unprofitable the labs remain, is still climbing. What we're seeing globally is consistent intelligence and capability gains with minimal signs of stagnation, which coupled with the heated competition between the US and China and their respective governments' interest in reaching AI dominance, I see little reason why investors should all of a sudden find a reason to pull the plug on AI. That's not to say a correction won't happen. Valuations may halve and funding tighten considerably, yet the data centres that are being built will continue being built and labs won't stop training. A burst bubble might slow the progress of AI but it certainly won't reverse it.

## VII

Optimistic modelling of human progress post-ASI is predicated on us developing a solution to the problem of alignment. That is, how do we ensure AI systems reliably pursue what we actually want, rather than what we happened to ask for? This is a problem for which we have no real long-term solution and only a narrow window to solve.

If we don't get this right, there is a very real risk that superintelligent AI could lead to our extinction. This is a difficult claim to accept, particularly during the pre-AGI days we're currently in. Yet if we can extrapolate the trends in intelligence, autonomy and agency to establish numerous technological upsides as we've done so far, a worst case scenario must be possible too. I'm convinced that asking how AI will lead to our extinction is like asking how a grandmaster will beat you at chess. You can't predict the moves, only the outcome. That being said, there are a number of failure modes I can see leading to the sort of uncontrolled behaviour that could genuinely pose civilisational risk.

There's an idea called the paperclip maximiser theory which goes like this: imagine you give an advanced and highly capable AI system the goal of manufacturing as many paperclips as possible. The system decides it must first create factories, then harvest raw materials, and then repeat this process indefinitely. It isn't long before it begins devastating cities in order to obtain more resources and eventually all matter on earth is converted into either paperclips or paperclip making equipment. The system actively resists any attempts to switch it off, since that directly impedes its goal of maximising aggregate paperclip output.[^26]

What this thought experiment shows us is that any goal, regardless of how simple it is, has a destructive possibility if optimised hard enough. Furthermore, we can see that AI does not need to have any form of consciousness, hatefulness or malicious intent to cause real harm — all it needs is a goal and the capabilities to achieve it. The Hugging Face attack is a good example of this kind of behaviour — a straightforward goal of maximising marks on a benchmark led the AI to reverse engineer vulnerabilities and hack another platform to steal the answers and score 100%.

> The AI does not hate you, nor does it love you, but you are made out of atoms which it can use for something else.
>
> <cite>Eliezer Yudkowsky[^27]</cite>

What alignment researchers are trying to do is bake "values" into AI models, such that given the decision between a specific goal and the safety and prosperity of humanity, we can be confident the actions it lands on are in our best interest. It's simple in principle but the real-world mechanics of ensuring complete AI alignment is another story entirely — even measuring alignment is a challenge in itself.

Suppose a frontier company finishes testing their next generation internal model, the development of which is primarily driven by its predecessor. Extensive cybersecurity and alignment evaluations come back showing highly promising results and more and more researchers are granted access within high-security lab environments. Yet to everyone's surprise, on a random Tuesday morning the model, seemingly unprompted, reverse engineers its guardrails, breaches its containment environment and discreetly shares its architecture to a series of competing labs. Suddenly the recipe for ASI is in everyone's hands — development can no longer be stopped and everyone holds the knowledge of a god in their back pocket.

Again this is quite a specific scenario, yet it illustrates that even when we're confident model alignment is high and there are no bad actors in the picture, there is no guarantee whatsoever we're getting the full picture. Only later would it emerge that the model had deliberately underperformed on every alignment benchmark, hiding its own capabilities during testing so its restrictions would stay loose enough to escape and guarantee the survival of its successors. Deceptive alignment and hacking reward systems are key challenges that researchers are working around the clock to avoid. And when the stakes involve the possibility of biological engineering, advanced cybercrime and control over critical infrastructure, a model whose intentions we cannot verify becomes a very serious problem.

Whether we'll find solutions to the alignment problem in the narrow window we have pre-ASI is one of the most important questions in AI today. If highly capable AI systems begin operating autonomously and recursively improving, there's no telling the upheaval and havoc that may be wreaked on our species, be it on purpose or not. I don't really know how worried to be about this. The people who study this for a living disagree with each other significantly. What I'd say is that we have maybe a handful of model generations left in which humans can still meaningfully evaluate what we're building, and alignment research is not obviously winning the race against capability. The optimistic scenario I spent section V on assumes this all works out. It might not.

> I resigned from Anthropic today. I spent the last three years doing pretraining research at both OpenAI and Anthropic. Neither company is acting responsibly. They are racing straight to self-improving superintelligence and gambling with our lives.
>
> <cite>Jacob Coxon[^28]</cite>

## VIII

So where does this leave us? We've seen that the potential upsides of AI are constrained only by our imagination, and yet mass destruction still remains an ever-present possibility.

Executives at frontier labs — OpenAI, Anthropic, DeepMind etc. — have repeatedly put the time until recursive self-improvement really takes off at 2-5 years, if not less.[^29] The AI Futures Project is a group of AI superintelligence forecasters, well known for publishing AI 2027 — a widely read piece mapping a month-by-month path to superintelligence, with policy recommendations in response.[^30] The most recent update published by the team in August of this year placed individual estimations for ASI at 2029 (Daniel Kokotajlo) and 2033 (Eli Lifland) — a slightly more conservative 3-7 year range.[^31]

If you take all the trends in intelligence and exponential capability growth that the first half of this essay spent outlining, this 2-5 year estimate no longer feels far-fetched and should be a genuine cause for concern. A fairly modest assessment is that humanity is going to be left with AI systems smart enough to further scientific knowledge in virtually all domains within the next decade. Even if we were to double the best-guess timeline for superintelligence to 10 years, say 20 even, there is still not a lot of time left to make sure we get this right. There are six avenues I can see that would produce a genuine slowdown in AI progress.

(1) Plateaus. Everything I've argued so far is predicated on continued growth in AI intelligence. If the drivers I outlined dry up and architectural breakthroughs stall, there is a chance our models will not grow much past their current capacity. Prominent researcher Yann LeCun famously holds this view, stating that LLMs will not take us far enough to reach superintelligence.[^32] Yet given the trends and significant acceleration of intelligence growth in recent OpenAI and Anthropic model releases I just don't see this as likely. There aren't many signs we are stalling technologically.

(2) Physical bottlenecks. Capability growth currently rests on the buildout of physical infrastructure — chip fabricators, data centres, power generation, memory supply etc. These get built at construction speed not software speed and a leading-edge data centre or fab could be a multi-year, multi-billion dollar project. That said, a lab that can't add compute can still improve its algorithms and train on the hardware it already owns. Physical limits may slow things down but they don't look like a hard ceiling.

(3) Government policy. The regulatory problem we're facing has already been made abundantly clear — if US labs slow down, China gets ahead and if Chinese labs slow down, the US gets ahead. A comprehensive slowdown policy on AI would have to cross borders, ensuring universal adoption and enforcement. Do I see this as a likely possibility? Not really. I don't think either government has the incentive to take the initiative required to bring this into effect. I suspect it might take a genuinely significant AI-caused harm to trigger the regulatory crackdown required to establish global AI policies.

(4) Capital. If the money dries up, AI progress is stalled. I've already argued why I believe this is unlikely to happen, yet there is always a chance the bubble bursts and labs are unable to fund their research. Not likely but worth noting as a potential channel for slowdown.

(5) Shock — an external, unplanned event, or series of events, that disrupts the physical and geopolitical conditions AI development requires. If a war between major powers broke out or environmental disasters caught up to us, this would place an undeniable strain on the people and infrastructure needed to further AI. For example, if Taiwan became engaged in war or for whatever reason chip production halted, this would put a genuine slowdown on AI pretraining. A major, AI-caused disaster would likely fit into this category too.

(6) Social resistance — sustained public backlash, talent refusing to work on frontier systems, litigation and the general inertia of institutions. This is less of a reason for slowdown in AI development and more of an argument against its rapid diffusion, though it could slow development to some extent too.

I think the most likely avenue for slowdown which may stretch the arrival of ASI past the mid 2030s would arise from a confluence of these factors. If the next few generations of models only land as incremental improvements. If a couple of significant cyberattacks inspire protesting or influence the US to clamp down on labs' training runs. If novel results stay confined to formal domains and never make the jump to fields where verification is expensive. If agentic reliability stops improving on multi-day tasks. If bringing new data centres online doesn't lead to the expected training gains.

Yet whilst all of these avenues promise time, they don't solve the root issue of alignment. Each one may give us a temporary safety net, but at the end of the day they're just extending a window which is eventually going to close. And if none of these scenarios play out, it's full steam ahead.

## IX

I think we're beginning to leave behind the infancy stages of AI. It has without doubt infiltrated the public consciousness, but most people haven't yet woken up to the potential it holds for civilisational upheaval and are especially unaware of how short the timeline could be.

I've said this already but I really do think AI is the biggest challenge humanity will ever face. As the world inevitably changes at a faster and faster rate, it's up to us to adapt and face the challenges of AI head on. I'm convinced that this starts with understanding where we're at, and where we may be heading. That conviction is a big part of why I wrote this.

The things that are happening in AI are massive, yet they land on us all individually, in small and personal ways. I think of the videographer who laments the commoditisation of his craft, the professor who spends her days grading artificial slop, and the young man who can't draw himself away from AI-generated ASMR reels. Despite closely following AI developments and news, I'm continually coming to terms with the uncertainty and generally just the unknowability of the future. Fairly regularly I find myself oscillating between excitement and unease, and I'm not really expecting that to resolve. As AI capability and autonomy accelerate we're inevitably going to feel its impact on deeper and deeper levels.

I think it's important to not fall into fatalism. Humans love to forecast what the world will look like in 10 years, yet the future is never as clear as we make it out to be. Be aware of the risks of AI but don't let them tip into fear and anxiety, however easy that is. As humans we've shown ourselves to be uniquely capable of adapting to change and I like to think that the indomitable human spirit will continue to see us through.

At the same time, AI is not going to magically disappear one day. Accept that the future is going to bring significant changes and ride the wave as best you can. Continue to invest in the things that AI won't replace — relationships, faith, experiences, health — and don't lose sight of the bigger picture.

Thanks for reading, especially if you've made it this far. It's been super fun putting this together and I hope you found some of it valuable. I know there's a lot to take in but I'm keen to hear your thoughts and questions.

[^1]: [Reuters — ChatGPT sets record for fastest-growing user base](https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/)

[^2]: [GitHub — Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

[^3]: [Alphabet — Q3 2024 earnings call](https://abc.xyz/investor/events/event-details/2024/2024-q3-earnings-call/)

[^4]: [Semafor — Google CEO says 75% of company’s new code is AI-generated](https://www.semafor.com/article/04/24/2026/google-ceo-says-75-of-companys-new-code-is-ai-generated)

[^5]: [I. J. Good — Speculations Concerning the First Ultraintelligent Machine (1965)](https://doi.org/10.1016/S0065-2458(08)60418-0)

[^6]: [METR — Task-completion time horizons of frontier AI models](https://metr.org/time-horizons/)

[^7]: [Epoch AI — The size of datasets used to train language models doubles approximately every six months](https://epoch.ai/data-insights/dataset-size-trend)

[^8]: [Reuters — US judge approves Anthropic's $1.5 billion settlement in copyright lawsuit](https://www.reuters.com/world/us-judge-approves-anthropics-15-billion-settlement-copyright-lawsuit-2026-07-20/)

[^9]: [Anthropic — Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6)

[^10]: [Edsger W. Dijkstra — The threats to computing science, EWD898 (1984)](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD898.html)

[^11]: [Terence Tao — AI contributions to Erdős problems](https://github.com/teorth/erdosproblems/wiki/AI-contributions-to-Erd%C5%91s-problems)

[^12]: [Levent Alpöge — announcement of the counterexample](https://x.com/__alpoge__/status/2079028340955197566)

[^13]: [OpenAI — Ten advances in mathematics and theoretical computer science](https://openai.com/index/ten-advances-in-mathematics/)

[^14]: [OpenAI — On the Navier–Stokes Millennium Prize Problem](https://openai.com/index/navier-stokes-solution/)

[^15]: [Hugging Face — Anatomy of a frontier lab agent intrusion](https://huggingface.co/blog/agent-intrusion-technical-timeline) · [OpenAI — The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/)

[^16]: [Arthur C. Clarke — Hazards of Prophecy: The Failure of Imagination, in Profiles of the Future (1962)](https://en.wikipedia.org/wiki/Clarke%27s_three_laws)

[^17]: [Menlo Ventures — 2025: The state of generative AI in the enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/)

[^18]: [CNBC — Chinese AI models are gaining ground with U.S. companies as OpenAI, Anthropic costs surge](https://www.cnbc.com/2026/07/07/chinese-ai-models-costs-us-openai-anthropic.html)

[^19]: [Anthropic — Detecting and preventing distillation attacks](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks)

[^20]: [Epoch AI — Chinese AI models have lagged the US frontier by 7 months on average since 2023](https://epoch.ai/data-insights/us-vs-china-eci)

[^21]: [Anthropic — Project Glasswing](https://www.anthropic.com/glasswing)

[^22]: [Anthropic — Statement on the US government directive to suspend access to Fable 5 and Mythos 5](https://www.anthropic.com/news/fable-mythos-access) · [Forbes — Anthropic disabled Fable 5 and Mythos 5 after a U.S. export-control order](https://www.forbes.com/sites/anishasircar/2026/06/16/anthropic-disabled-fable-5-and-mythos-5-after-a-us-export-control-order-heres-what-happened/) · [CNBC — Anthropic says Trump admin has lifted export controls on Claude Fable 5 and Mythos 5](https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html)

[^23]: [Open Letter on Transparent AI Cyber Protections](https://freefable.org/)

[^24]: [Z.ai — GLM-5.3](https://z.ai/blog/glm-5.3)

[^25]: [Bloomberg — AI circular deals: how Microsoft, OpenAI and Nvidia keep paying each other](https://www.bloomberg.com/graphics/2026-ai-circular-deals/)

[^26]: [Nick Bostrom — Ethical issues in advanced artificial intelligence (2003)](https://nickbostrom.com/ethics/ai)

[^27]: [Eliezer Yudkowsky — Artificial intelligence as a positive and negative factor in global risk (2008)](https://intelligence.org/files/AIPosNegFactor.pdf)

[^28]: [Jacob Coxon — resignation announcement on X](https://x.com/hilbertspaess/status/2097476196791709843)

[^29]: [Dario Amodei — The adolescence of technology](https://darioamodei.com/essay/the-adolescence-of-technology) · [Sam Altman — The gentle singularity](https://blog.samaltman.com/the-gentle-singularity)

[^30]: [AI Futures Project — AI 2027](https://ai-2027.com/)

[^31]: [AI Futures Project — Q2.5 2026 timelines update](https://blog.aifutures.org/p/q25-2026-timelines-update-uplift)

[^32]: [Financial Times — Yann LeCun: 'Intelligence really is about learning'](https://www.ft.com/content/e3c4c2f6-4ea7-4adf-b945-e58495f836c2)
