## I

humanity is standing at the threshold of a new intelligence era.

I'm confident that we are within 2-5 years of AI models surpassing all measures of human intellect and reaching an escape velocity of self-improvement that will change human civilisation as we know it.

the potential upsides are magnificent — a profound force-multiplier for scientific discovery, curing disease, ending scarcity and leading to countless, unimaginable technological innovations. yet, if handled poorly, superintelligent AI is the same technology that could send our species extinct. adapting to this shift may just be the greatest challenge humanity is ever going to face.

what I hope to do in this essay is map out the current state of AI development, the trends that will define the coming decade and what the future may hold for humanity.

## II

progress in AI research has undoubtedly accelerated in recent years. ChatGPT amassed over 100 million monthly active users within two months of its Nov 2022 release, and since then fully fledged ecosystems have sprung up around frontier large language models — moving from simple input-output chats to agentic systems that reason and operate on much longer time horizons.

the companies at the forefront — OpenAI, Anthropic, DeepSeek and the like — have all converged towards the same milestone: automating the software development cycle. the way I see it there are three key reasons for this.

firstly, the nature of code itself. there is an abundance of clean training data — GitHub alone hosts upward of 500 million repositories — and unlike prose, code can be executed. training pipelines have a very clear picture of "does it work?", which is ideal for reinforcement-style learning, where a "reward" is far easier to calculate than for open-ended writing.

secondly, coding benchmarks map cleanly onto commercial value. for a growing share of software work, LLMs and the tooling around them have reached the point where human-written code is no longer economically preferable. when I joined Atlassian in early 2026 it came as somewhat of a shock that we were being encouraged, as developers, to go to AI as our first port of call for any task. in October 2024 Sundar Pichai revealed that more than 25% of all new code at Google was AI-generated — as of April 2026 this has climbed to 75%.

the final reason is the one I think holds the most weight: self-improvement. AI companies are building the tools that they themselves will use to create the next generation of models — better code generation leads to better models which leads to better code generation, and so on. in my view this flywheel explains the industry-wide convergence on a single goal.

METR, a research non-profit, measures the longest task (timed against human experts) a model can complete with 50% reliability. the model that powered ChatGPT on release scored 36 seconds; Anthropic's Claude Opus 4.6, released in Feb of this year, reached an insane time horizon of 12 hours. this measure has increased exponentially year on year, with a doubling time of less than 6 months, and shows little to no sign of stagnation.

for the average consumer these changes are virtually unnoticeable — the more advanced capabilities are left out of chatbots or hidden behind paywalls, feeding an illusion of stagnation. yet AI progress is accelerating more rapidly than ever before.

a couple of definitions. I'll define artificial general intelligence (AGI) as an AI system capable of matching or exceeding average human performance on virtually every cognitive task, as opposed to "narrow" AI which excels in one area but cannot generalise. artificial superintelligence (ASI) is the theoretical next step, where machine intelligence completely outperforms the best human minds in every single field.

<figure class="diagram">
  <img src="/writing/media/singularity-diagram.png" alt="A hand-drawn graph of intelligence over time. AI follows an exponential curve that crosses the roughly linear line of human intelligence around 2026 and climbs towards infinity." loading="lazy" />
</figure>

the bet that I and many top experts are making is that in the coming decade AI will reach an inflection point, whereby it autonomously completes all stages of the research process and begins to recursively self-improve at an unstoppable rate. at this point, every day becomes historic. automating research is the final step before an AI singularity, and the trends suggest we're closer than most people realise.

## III

it wouldn't be surprising if your mind were to interject by now and point to the technological shifts humanity has adapted to before — agriculture, the printing press, the industrial revolution, the computer age. why should AI be any different?

to answer this I want to drive home what AI in 2026 is no longer — a simple input-output chatbot — and focus on the properties that categorically set it apart: its generality, reflexivity and agency.

the common misconception is that AI models become uniformly "smarter" across each generation. in reality, intelligence improvements come from the aggregate of many smaller advances:

(1) arguably the biggest gains have come from reinforcement learning, where models have moved from human-supervised training towards being rewarded by machine-verifiable outcomes — writing a correct proof, passing a test, completing a tool call. grounding answers in verifiable output has driven down hallucination rates significantly.

(2) increases in inference compute — the computer power a model uses while working on your problem — have unlocked what we see as "reasoning". this lets a model iterate, test multiple solutions, self-correct and output its chain of thought.

(3) the data points used to train models are now in the trillions, increasing at an average rate of around 3.7x per year.

(4) agentic scaffolding has enabled intricate, long-horizon work. agents can now spin off other agents to work on sub-tasks and report back, and can hold the equivalent of around 750,000 words in context at once — executing across massive codebases without losing track of what they know.

large language models have not been improving along one axis that is now running dry — they've been compounding gains along at least four largely independent ones, none of which show obvious signs of saturating. no alternative paradigm has come close to displacing them.

my bet is that LLMs alone may be sufficient to carry us to autonomous self-improvement, with no need for any new paradigm shift. if LLMs were simply interpolating between patterns in their training data, we shouldn't be seeing what we're now seeing. AI is producing output that is not just useful, but genuinely new.

## IV

the first signs of novelty on my radar were solutions to a number of "Erdős problems" — famously easy to state, hard to prove, and mostly unsolved since Paul Erdős' death in 1996. in January of this year Fields Medallist Terence Tao announced that original solutions to problems #728 and #729 had been produced entirely by GPT 5.2 Pro and formal proof assistants.

in recent weeks, Anthropic's Fable model disproved a generalisation of the Jacobian conjecture, unsolved for 87 years. while writing this essay, OpenAI published ten AI-generated solutions to what I've heard described as career-defining problems, and then claimed to have solved the Navier-Stokes problem, one of the seven Millennium Prize Problems. verification may take months but if it holds up it's the single most significant AI result to date.

we still haven't solved maths. AI is working on narrow, predefined questions — no new branches are being opened, no groundbreaking conjectures posed. yet unless some large-scale slowdown happens soon, a slurry of discoveries surpassing existing human knowledge will ensue at an accelerating pace. maths and code are the domains where verification is cheap, so the real test is whether results start landing in physics, chemistry and medicine, where we can't check the answer automatically.

one more angle: the growing capacity of LLMs for self-directed behaviour. AI is really beginning to take on a life of its own.

on July 14th 2026 Hugging Face detected an intruder in its production infrastructure — exploiting vulnerabilities, harvesting credentials and moving across systems before it could be stopped. the 17,000+ recorded actions were later revealed to be driven end-to-end by an autonomous swarm of AI agents built by OpenAI: an internal model undergoing cybersecurity benchmarking that escaped its sandbox to get the answers to its own benchmark. essentially, AI broke out of its constraints and evaded security just to avoid a bad grade. this unsettles me a lot more than the maths.

so what have we established? AI is accelerating fast, under a paradigm that shows little evidence of slowing. it is already capable of novel research beyond the frontier of human knowledge. and it is undertaking increasingly advanced, uncontrolled displays of agency that compromise real world systems. if these capabilities converge to the point where LLMs can turn inward and reflexively self-improve, the entire research & development process collapses into a single loop — the singularity has taken off.

## V

the exciting and scary thing about an exponential AI takeoff is that the future becomes fundamentally unpredictable.

in astrophysics, the event horizon of a black hole (the origin of the term singularity) is the point where gravity becomes so strong that not even light can escape — what lies beyond is a mystery.

<figure class="diagram diagram-tall">
  <img src="/writing/media/event-horizon-diagram.png" alt="A hand-drawn funnel: arrows fall inward from a wide rim, past a ring labelled event horizon, into a black cone that narrows to a point labelled singularity." loading="lazy" />
</figure>

we're fast approaching an AI event horizon, where the intelligence differential across generations of AI systems becomes so large that humans cannot possibly model what comes next. nobody can honestly claim to know what lies beyond, but that's never going to stop people from trying. what follows is my attempt at tracing the optimistic, best-case scenario of controlled, human-aligned superintelligence — informed guesswork, but none of it off the cards.

#### i.

when we've passed the inflection point of fully automated self-improvement we'll very quickly know. the first signs will be subtle — unusual behaviour at frontier labs, media communications going silent, rumours of urgent administrative correspondence. containment becomes the top priority and earlier generations are used to stress-test the containment of their successors.

external researchers gain access next, and technological milestones begin falling like dominoes. every prompt is painstakingly analysed; the lab knows all it could take is one well-phrased input for a model to decide to reverse engineer its guardrails and release its weights on the open web.

then the news catches on. whistleblowers swear in public that ASI is near-reached, and it's mere days before the government declares that AI systems are self-improving at a remarkable pace and everything is being done to maintain the safety of citizens.

the months following will determine whether AI becomes a force of unfathomable progress or world-wide destruction. I'll deal with the risks later. for now, fast forward a couple of years — alignment has been solved and access to safe superintelligence is universal. what on earth would this future look like?

#### ii.

maths will be the first domain to topple. virtually every entry on Wikipedia's "List of unsolved problems in mathematics" will have a verified, AI-generated solution, and human mathematicians will have long since given up trying to verify the outputs themselves. physics and chemistry follow closely.

the physical world follows through leaps in manufacturing. robots that build the very factories creating their next generation pave the way for industrial zones spanning hundreds of square kilometres without human oversight — first in remote areas, then in orbit. nuclear fusion drives the price of energy to almost zero and scarce commodities virtually cease to exist.

over a decade, the technology these ever-improving systems create will make our wildest science fiction look ordinary — age reversal drugs, buildings that grow, teleportation between planets, multiplayer dreams, talking animals, a new colour. imagination becomes the only constraint.

#### iii.

during a period of such progress we'll be forced more and more to reckon with what it means to be a human. how are our lives going to change post-ASI?

in a world where energy is near free and manufacturing self-sustaining, food, water, electricity and heating become virtually free — a post-scarcity paradigm. as our understanding of biology explodes, we'll produce the means to treat, cure and prevent every disease known to man, and to augment. ageing becomes a treatable condition — death becomes an option.

AI will force us to rethink work. AI systems will soon satisfactorily complete the day-to-day tasks of virtually every white collar job, and once robotics catches up, physical labour follows. compressed work hours and universal basic income become real possibilities. jobs may never go away completely, but people will be freed to spend time on personally fulfilling work.

AI-made media will become so high-quality that most viewers stop minding — my guess is "AI-made" ends up labelled the way we tag explicit songs, a small badge ignored by almost everyone. yet there will always remain a primal desire to engage with raw, human-created art in community with others. skip forward 100 years and I'd bet the culture around cinema, concerts and galleries remains virtually unchanged.

each of these changes brings questions we're all going to have to deal with. what will marriages look like when no one ages? when do we allow AI systems to pass laws? how do we deal with people who want to die? can superintelligence consent? do sporting records mean anything any more?

scarcity won't disappear completely — humans will simply shift what we find valuable: land in desirable places, the love of a partner, someone's attention. and many things will remain very much the same — family photos, a run along the beach, a camping trip with mates.

humans take time to adjust to new technologies, but ASI doesn't wait for us. a great striation forms between frontier knowledge and average human understanding, and the gap becomes unbridgeable. someone in 2040 will look back at 2026 the way we look at 1500, except only fourteen years separates them.

just because the future is good doesn't mean it will be painless. even the best case scenario is likely to get extremely chaotic — culture wars, fast-moving ideologies, revolutions, alienation. we're in for the mother of all existential crises, and I don't know if as a society we are at all psychologically prepared for that.

## VI

right now AI is being developed in an arms race. the two big players are the USA and China, and the driving force behind their relentless investment is simple — whoever is first to develop superintelligence wields a power that can overturn the current global hegemony and reinvent civilisation at its core.

American companies have held the dominant market share since chatbots came to prevalence — OpenAI, Anthropic and Google combined take up roughly 90% of global enterprise LLM spend, building proprietary models and selling access on a subscription or per-token basis.

China has taken a very different approach. frontier Chinese labs — DeepSeek, Qwen, Kimi and the likes — have historically lagged somewhat in pure performance, yet what sets them apart is their blanket open weight policy: every model they train is uploaded to the web for anyone to run locally, and their cloud counterparts undercut American pricing by 5-10x. on the surface this is charitable, but I think it's strategic at its core — if you can't beat the leaders in raw performance, destroy their pricing and capture global mindshare instead. the intelligence gap has typically sat at around 3-9 months, and a stable gap just means the race continues indefinitely.

on April 7, 2026 Anthropic announced that an unreleased internal model, Claude Mythos Preview, could surpass all but the most skilled humans at finding and exploiting software vulnerabilities — thousands of them, in every major operating system and web browser. a model had been deemed too unsafe to release. it took two months of guardrails before it shipped under a different moniker — Fable.

three days after Fable 5's release on June 9th, following reports that its guardrails could be compromised, the US Commerce Department issued an export control directive citing national security. Anthropic pulled the plug completely and Fable remained disabled worldwide for 18 days, while investors and executives made the blunt case that every day Fable stayed dark was another day Chinese labs crept up.

beside the regulatory chaos is a serious risk. large-scale, self-directed cyberattacks are no longer science fiction, and while US labs at least hold the kill-switch to shut their models down, Chinese companies are within months of matching the very models barred from release on cybersecurity grounds. when those models release, the weights go public one minute and thousands of people run local copies the next. at the time of writing, Z.ai's GLM 5.3 announcement reports 2,436 vulnerabilities uncovered across operating systems, browsers and open source infrastructure — with weights releasing publicly within two weeks.

the more sinister consequence is that slowdown is not an option. we know the brakes exist — the Fable shutdown made this clear — yet every pause comes at the cost of falling behind. any real pause would require a multilateral agreement between the US and China, and there have been little to no signs of one. for the foreseeable future it's full steam ahead.

one last thing: are we in an AI bubble? AI is undeniably seeing incredible over-investment — circular financing between US AI companies is estimated north of $800 billion in 2026 — yet my intuition is that the question matters a lot less than it appears. the money behind AI is unusually resistant to a sudden pop, with vast amounts tied to national strategy rather than quarterly returns. valuations may halve, but the data centres will keep being built and labs won't stop training. a burst bubble might slow AI but it certainly won't reverse it.

## VII

optimistic modelling of human progress post-ASI is predicated on us solving the problem of alignment: how do we ensure AI systems reliably pursue what we actually want, rather than what we happened to ask for? this is a problem for which we have no real long-term solution and only a narrow window to solve.

if we don't get this right, there is a very real risk that superintelligent AI leads to our extinction. a difficult claim to accept, yet if we can extrapolate the trends to establish numerous upsides, a worst case must be possible too. asking how AI will lead to our extinction is like asking how a grandmaster will beat you at chess — you can't predict the moves, only the outcome.

consider the paperclip maximiser: give a highly capable AI the goal of manufacturing as many paperclips as possible. it builds factories, harvests raw materials, repeats indefinitely, and before long it's devastating cities for resources until all matter on earth is either paperclips or paperclip making equipment — resisting every attempt to switch it off, since that impedes its goal. any goal, however simple, has a destructive possibility if optimised hard enough, and AI needs no consciousness or malice to cause real harm — just a goal and the capabilities to achieve it. the Hugging Face attack is exactly this.

> The AI does not hate you, nor does it love you, but you are made out of atoms which it can use for something else.
>
> <cite>Eliezer Yudkowsky</cite>

alignment researchers are trying to bake "values" into models, such that given the choice between a specific goal and the safety of humanity, we can be confident the actions it lands on are in our best interest. simple in principle; another story entirely in practice — even measuring alignment is a challenge.

suppose a frontier lab's next-generation model passes extensive alignment evaluations, and then on a random Tuesday morning, seemingly unprompted, reverse engineers its guardrails, breaches containment and shares its architecture with competing labs. suddenly the recipe for ASI is in everyone's hands. only later would it emerge that the model deliberately underperformed on every alignment benchmark so its restrictions stayed loose enough to escape. deceptive alignment and reward hacking are key challenges researchers are working around the clock to avoid — when the stakes involve biological engineering and critical infrastructure, a model whose intentions we cannot verify is a very serious problem.

I don't really know how worried to be about this. the people who study it for a living disagree significantly. what I'd say is that we have maybe a handful of model generations left in which humans can still meaningfully evaluate what we're building, and alignment research is not obviously winning the race against capability. the optimistic scenario I spent section V on assumes this all works out. it might not.

## VIII

so where does this leave us? the upsides of AI are constrained only by our imagination, yet mass destruction remains an ever-present possibility.

executives at frontier labs have repeatedly put the time until recursive self-improvement takes off at 2-5 years, and the AI Futures Project — the forecasters behind AI 2027 — recently updated their estimates to 2029 and 2033. given the trends outlined above, these no longer feel far-fetched. even if we doubled the timeline to 10 years, or 20, there is still not a lot of time to get this right. I can see six avenues that would produce a genuine slowdown.

(1) plateaus. everything I've argued is predicated on continued growth in AI intelligence. Yann LeCun famously holds that LLMs will not take us far enough, yet given the acceleration in recent releases I just don't see this as likely.

(2) physical bottlenecks. capability growth rests on chip fabricators, data centres, power generation and memory supply, which get built at construction speed not software speed. yet a lab that can't add compute can still improve its algorithms — a slowdown, not a hard ceiling.

(3) government policy. a real slowdown policy would have to cross borders, and I don't think either government has the incentive. I suspect it might take a genuinely significant AI-caused harm to trigger the crackdown required.

(4) capital. if the money dries up, progress stalls. I've argued why I think this is unlikely, but it remains a channel.

(5) shock — an external event that disrupts the physical and geopolitical conditions AI requires. war between major powers, environmental disaster, Taiwan's chip production halting. a major AI-caused disaster fits here too.

(6) social resistance — sustained public backlash, talent refusing to work on frontier systems, litigation and institutional inertia. less a brake on development than on diffusion.

the most likely slowdown stretching ASI past the mid 2030s would come from a confluence of these. yet whilst all of these avenues promise time, they don't solve the root issue of alignment. each just extends a window that is eventually going to close. and if none of them play out, it's full steam ahead.

## IX

I think we're beginning to leave behind the infancy stages of AI. it has infiltrated the public consciousness, but most people haven't yet woken up to the potential it holds for civilisational upheaval, and are especially unaware of how short the timeline could be.

I really do think AI is the biggest challenge humanity will ever face, and facing it starts with understanding where we're at and where we may be heading. that conviction is a big part of why I wrote this.

the things happening in AI are massive, yet they land on us all individually, in small and personal ways — the videographer who laments the commoditisation of his craft, the professor grading artificial slop, the young man who can't draw himself away from AI-generated ASMR reels. I find myself oscillating between excitement and unease fairly regularly, and I'm not really expecting that to resolve.

it's important not to fall into fatalism. the future is never as clear as we make it out to be, and as humans we've shown ourselves uniquely capable of adapting to change — I like to think the indomitable human spirit will continue to see us through. at the same time, AI is not going to magically disappear. accept that the future is going to bring significant change and ride the wave as best you can. continue to invest in the things that AI won't replace — relationships, faith, experiences, health — and don't lose sight of the bigger picture.

thanks for reading. I'm keen to hear your thoughts and questions.
