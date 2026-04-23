// Daily Fortune - 22 Major Arcana Tarot Cards

export interface TarotCard {
  id: number
  name: string
  emoji: string
  summary: string
  message: string
  love: string
  work: string
  money: string
  lucky: {
    color: string
    number: number
    item: string
  }
}

export const TAROT_CARDS: TarotCard[] = [
  { 
    id: 0, 
    name: "The Fool", 
    emoji: "🌸", 
    summary: "A fresh start",
    message: "Today is your day to take that first step you've been putting off. You don't need a perfect plan — you just need the courage to begin. Trust that things will unfold.",
    love: "If you've been hesitant to reach out to someone, today is the day. A simple message can open a door you didn't know was there. New encounters have unexpected depth today.",
    work: "Start that project you've been delaying. Don't worry about having all the answers — the first move is what matters. Small experiments today lead to bigger opportunities later.",
    money: "A small, fresh start with your finances today. Open that savings account, try a new budgeting app, or just start tracking one expense. Beginnings don't need to be big.",
    lucky: { color: "White", number: 1, item: "A fresh notebook" }
  },
  { 
    id: 1, 
    name: "The Magician", 
    emoji: "🎩", 
    summary: "Your power is ready",
    message: "Everything you need to make progress today is already in your hands. You have the skills, the contacts, the ideas. Stop waiting for the right moment — this is it.",
    love: "Make the first move today. That text, that call, that honest conversation — you've been ready. The other person is waiting for your initiative more than you realize.",
    work: "Today is perfect for launching, pitching, or starting. Your ideas are clearer than usual. Put them into action — write that email, make that call, share that proposal.",
    money: "You have more earning power than you realize. Review your skills — is there something you could monetize? A side project, a freelance gig, a new service?",
    lucky: { color: "Gold", number: 8, item: "A pen you love" }
  },
  { 
    id: 2, 
    name: "The High Priestess", 
    emoji: "🌙", 
    summary: "Trust your inner voice",
    message: "The answer you're looking for won't come from asking others today. Something inside you already knows. Quiet the noise and listen to your first instinct.",
    love: "Pay attention to what's unsaid. Someone's actions are telling you something their words aren't. Trust the feeling you get when you're around them, not just what they say.",
    work: "Don't make big decisions based on pressure today. Sit with the options overnight. Your gut has information your logical mind hasn't caught up with yet.",
    money: "Hold off on impulsive purchases today. That thing in your cart? Sleep on it. If you still want it tomorrow, then yes. Your intuition knows what's worth it.",
    lucky: { color: "Silver", number: 2, item: "Moonstone or pearl" }
  },
  { 
    id: 3, 
    name: "The Empress", 
    emoji: "👑", 
    summary: "Nurture what matters",
    message: "Today isn't about pushing harder — it's about tending. The things you care for will grow. Slow down and give attention to what you love.",
    love: "Small gestures matter more than grand ones today. Cook for them, remember what they mentioned, be present. Your warmth is what makes people stay.",
    work: "Creative projects need care today, not deadlines. Take time to refine your work. A polished small thing beats a rushed big thing. Quality will be noticed.",
    money: "Invest in something that grows slowly — your health, your home, your skills. Today rewards patience, not quick returns. Long-term abundance starts with small deposits.",
    lucky: { color: "Emerald green", number: 3, item: "Fresh flowers" }
  },
  { 
    id: 4, 
    name: "The Emperor", 
    emoji: "🏛️", 
    summary: "Build your structure",
    message: "Today rewards planning and boundaries. Set clear rules for yourself — when to work, when to rest, what to say yes to. Freedom comes from good structure.",
    love: "Define what you want in your relationships. Unclear expectations create resentment. Have that difficult conversation about boundaries or commitment today.",
    work: "Organize your tasks, block your calendar, finish what you started. Today is for discipline, not creativity. The boring systems work will pay off for weeks.",
    money: "Review your budget today. Know exactly what comes in and goes out. Financial freedom starts with financial clarity. Set up automatic savings if you haven't.",
    lucky: { color: "Deep red", number: 4, item: "A sturdy watch" }
  },
  { 
    id: 5, 
    name: "The Hierophant", 
    emoji: "📜", 
    summary: "Wisdom from experience",
    message: "Don't reinvent the wheel today. Someone has already solved the problem you're facing. Ask for advice, read what experts say, follow proven paths.",
    love: "Honor the commitments you've made. If you said you'd be there, be there. Reliability is what builds trust — and trust is what makes love last.",
    work: "Find a mentor or learn from one today. A 30-minute conversation with someone experienced can save you weeks of trial and error. Ask for that coffee chat.",
    money: "Learn from those who've built wealth before you. Read one financial book, listen to one investing podcast, or ask a financially wise friend for their system.",
    lucky: { color: "Burgundy", number: 5, item: "An old book" }
  },
  { 
    id: 6, 
    name: "The Lovers", 
    emoji: "💞", 
    summary: "Choice defines you",
    message: "You have a real choice to make today, and it matters more than it seems. Choose based on your values, not convenience. This decision shapes what comes next.",
    love: "A meaningful connection is nearby — either someone new or someone you already know in a new light. Be honest about what you actually want, not what you should want.",
    work: "The right partner or team makes everything easier. Invest in relationships with people whose work ethic you respect. Protect yourself from energy-draining collaborations.",
    money: "Partner finances need honest conversation today. If you share money with someone, align on goals. If not, make sure your investments match your actual values.",
    lucky: { color: "Rose pink", number: 6, item: "Something shared with a loved one" }
  },
  { 
    id: 7, 
    name: "The Chariot", 
    emoji: "🏆", 
    summary: "Move forward with focus",
    message: "Your scattered energy is your biggest obstacle today. Pick one goal and go hard. Momentum creates its own motivation — you just have to start moving.",
    love: "Be direct about what you want. Hints and games waste everyone's time. If you like them, say so. If something isn't working, address it. Clarity is attractive.",
    work: "Block 2-3 hours for your most important task today. Turn off notifications. Work with intensity, then rest fully. Half-focused effort all day produces nothing.",
    money: "Pick one financial goal and attack it this week. Pay down that card, hit that savings target, or finish that budget. Focus beats scattered effort with money.",
    lucky: { color: "Royal blue", number: 7, item: "Running shoes" }
  },
  { 
    id: 8, 
    name: "Strength", 
    emoji: "🦁", 
    summary: "Gentle power wins",
    message: "The situation that's frustrating you needs patience, not force. Stay calm, stay kind, stay persistent. Inner strength moves mountains that brute force can't.",
    love: "Difficult conversations go better when you're soft. Lead with curiosity, not accusation. The goal is understanding, not winning. Their defensiveness melts when yours does.",
    work: "That difficult colleague or situation — respond with composure today. Emotional control is your superpower in meetings. Others will remember how you handled pressure.",
    money: "Resist panic-selling or panic-buying today. Stay the course you set when calm. Emotional financial decisions cost more than you think. Patience compounds wealth.",
    lucky: { color: "Warm orange", number: 8, item: "Something that makes you feel brave" }
  },
  { 
    id: 9, 
    name: "The Hermit", 
    emoji: "🕯️", 
    summary: "Look inward today",
    message: "The external noise is loud today, but the real work is internal. Step back from the social demands. Spend time alone. Answers come in silence, not in crowds.",
    love: "You don't need to respond to every message immediately. Give yourself space to know what you actually feel. A thoughtful reply tomorrow beats a rushed one today.",
    work: "Deep work day. Close the Slack, turn off meetings if you can. Two hours of focused thinking beats eight hours of scattered busywork. Your best ideas need quiet.",
    money: "Review your spending alone today — no advice, no comparisons. What do YOU actually value? Design a financial life around YOUR priorities, not what looks impressive.",
    lucky: { color: "Pale yellow", number: 9, item: "A single candle" }
  },
  { 
    id: 10, 
    name: "Wheel of Fortune", 
    emoji: "🎡", 
    summary: "Change is coming",
    message: "Something shifts today — maybe small, maybe big. Stay flexible. What looks like a problem might be an opportunity in disguise. What feels like luck is usually preparation meeting timing.",
    love: "Unexpected twists in your love life today. Someone returns, someone leaves, someone surprises you. Don't cling to how things were. The current has its own wisdom.",
    work: "An unplanned opportunity or obstacle appears today. Your ability to adapt matters more than your ability to stick to the plan. Yes, to new things when they feel right.",
    money: "A financial situation shifts today — an expense you didn't expect, or an income you didn't plan for. Don't react emotionally. Both challenges and windfalls are temporary.",
    lucky: { color: "Rainbow", number: 10, item: "Something that spins or rolls" }
  },
  { 
    id: 11, 
    name: "Justice", 
    emoji: "⚖️", 
    summary: "Truth and fairness",
    message: "Today asks you to be honest — with others and yourself. The accounts need balancing. What you give should match what you take. What you say should match what you do.",
    love: "Have that overdue conversation today. If something's been unfair in the relationship, name it calmly. Love thrives on honesty, not politeness that hides resentment.",
    work: "Address the imbalance. Are you doing more than your share? Or less? Speak up either way. Work relationships need clarity. Silent suffering helps no one.",
    money: "Review who owes what — bills, shared expenses, promises. Settle it today. Unbalanced finances create invisible stress. Fair accounting clears the air.",
    lucky: { color: "Steel gray", number: 11, item: "A scale or balance" }
  },
  { 
    id: 12, 
    name: "The Hanged Man", 
    emoji: "🙃", 
    summary: "See it differently",
    message: "Stuck? Try looking at the problem upside down. The thing you're fighting against might be exactly what you need. Surrender the old angle. A new perspective changes everything.",
    love: "If you've been frustrated with someone, try seeing their side fully today. Not justifying — just understanding. You might discover the real issue isn't what you thought.",
    work: "The approach that's not working today isn't wrong — it's just not fitting this problem. Pause. What if you did the opposite? What if you let it be harder for a while?",
    money: "The way you've been thinking about money might be the limitation. Try a radical reframe today. What if saving less and investing in yourself paid off more?",
    lucky: { color: "Deep indigo", number: 12, item: "Something viewed from a new angle" }
  },
  { 
    id: 13, 
    name: "Death", 
    emoji: "🦋", 
    summary: "Let it end",
    message: "Something needs to end today so something better can begin. A habit, a relationship, a belief, a version of yourself. Don't fear the ending — it's making room for what's next.",
    love: "A chapter closes today. Maybe a relationship, maybe just a pattern you've been stuck in. Grieve it briefly, then release. What comes next needs this space.",
    work: "Quit the project that's draining you. Stop the task that's never going to work. Endings feel like failure but they're not — they're necessary. Your best work needs this clearing.",
    money: "Cancel the subscription you don't use. Close the account you don't need. Let go of the financial commitment that's no longer serving you. Simplicity creates clarity.",
    lucky: { color: "Black", number: 13, item: "Something you're ready to release" }
  },
  { 
    id: 14, 
    name: "Temperance", 
    emoji: "🌊", 
    summary: "Find your balance",
    message: "Today rewards moderation. Not too fast, not too slow. Not too much, not too little. Mix opposites with skill — bold ideas with careful execution, ambition with patience.",
    love: "Blend honesty with kindness today. Say the true thing, but with love. Listen, but also share. Relationships need both closeness and space. Find the rhythm that works.",
    work: "You're either pushing too hard or too soft. Recalibrate today. Match your effort to what the situation actually needs. Skilled pacing beats maximum effort every time.",
    money: "The middle path with money today. Don't deprive yourself, don't indulge recklessly. A small pleasure enjoyed mindfully beats a big purchase you'll regret.",
    lucky: { color: "Turquoise", number: 14, item: "Water in any form" }
  },
  { 
    id: 15, 
    name: "The Devil", 
    emoji: "🔗", 
    summary: "See what binds you",
    message: "Notice what controls you today — the habit you can't stop, the thought you can't shake, the pattern that repeats. Awareness is the first step. You have more choice than you think.",
    love: "A relationship dynamic has been holding you back. Today, see it clearly. Not to blame anyone — just to notice. You can choose differently, starting with the next small moment.",
    work: "The job that drains you isn't a prison, even when it feels like one. What's the real reason you're staying? Fear? Comfort? Identity? Name it. Then decide consciously.",
    money: "The financial habit that keeps you stuck — notice it today. Overspending when stressed? Under-earning from fear? The pattern isn't you. It's just a pattern. Patterns can change.",
    lucky: { color: "Deep crimson", number: 15, item: "Something that reminds you of freedom" }
  },
  { 
    id: 16, 
    name: "The Tower", 
    emoji: "⚡", 
    summary: "Sudden clarity",
    message: "Something crumbles today so truth can be seen. It might feel disruptive, but it's necessary. What's falling apart was never going to last. What comes next will be built on honesty.",
    love: "A illusion in a relationship might break today. Hard, but freeing. You can't build love on what isn't real. The painful truth now saves years of quiet suffering later.",
    work: "A plan or assumption collapses today. Don't panic. Sometimes a crash clears the field for better work. What you do in the next 48 hours matters more than what fell apart.",
    money: "A financial wake-up call today. Maybe a surprise bill, maybe seeing your accounts clearly for the first time. The shock is short. The clarity is lasting. Use it.",
    lucky: { color: "Lightning silver", number: 16, item: "Something struck by change" }
  },
  { 
    id: 17, 
    name: "The Star", 
    emoji: "⭐", 
    summary: "Hope returns",
    message: "After the hard times, light returns. Today brings quiet optimism, small miracles, renewed faith. Don't rush to grand gestures. Just notice: you're still here, and that's enough.",
    love: "Healing after heartbreak today. The ache is softer. Maybe someone new catches your attention, or someone familiar feels different. Let yourself feel hopeful without forcing anything.",
    work: "Your creative spirit returns today. Projects you'd given up on feel possible again. Trust this energy. Write, make, create — not for results, but because it's time.",
    money: "Finances feel calmer today. The stress is lifting. Make one small long-term investment — in your retirement, your skills, your future self. Hope is compound interest.",
    lucky: { color: "Soft blue", number: 17, item: "Something that reminds you of the night sky" }
  },
  { 
    id: 18, 
    name: "The Moon", 
    emoji: "🌙", 
    summary: "Not everything is clear",
    message: "Today has shadows. Things aren't what they seem — good or bad. Don't trust every fear. Don't trust every hope. Wait for daylight before making big decisions. Confusion is temporary.",
    love: "A relationship feels confusing today. Don't over-analyze every text. Don't assume the worst. Give it time. What feels murky now will clarify in a day or two.",
    work: "You might be misreading a situation at work. Get a second perspective before reacting. What feels like a problem might be a misunderstanding. What feels exciting might be half-true.",
    money: "Don't make financial decisions in anxiety today. Markets will move, opportunities will appear and disappear. Your fear is lying to you, but so is your FOMO. Wait.",
    lucky: { color: "Pale silver", number: 18, item: "Something that catches moonlight" }
  },
  { 
    id: 19, 
    name: "The Sun", 
    emoji: "☀️", 
    summary: "Joy is available",
    message: "Today is for warmth, lightness, play. You've worked hard. Now enjoy. The success you've been chasing is already here in small ways — notice it. Celebrate today. The seriousness can wait.",
    love: "Fun, laughter, ease in relationships today. Plan something joyful with someone you love. Not meaningful — just fun. The best connections are built on shared light moments.",
    work: "A win today — maybe small, maybe big. Acknowledge it. You've been head-down for too long. Look up. See what you've built. Share the good news. Success is better shared.",
    money: "A financial bright spot today — an unexpected bonus, a good deal, or just the realization that you're okay. Enjoy it. Wealth is also the ability to feel good about what you have.",
    lucky: { color: "Sunflower yellow", number: 19, item: "Something that made you smile recently" }
  },
  { 
    id: 20, 
    name: "Judgement", 
    emoji: "📯", 
    summary: "Time to decide",
    message: "You've been on the fence about something. Today is for deciding. Look at the whole picture, your values, your future self. Then commit. Ambivalence costs more than wrong choices.",
    love: "Decide if this relationship is what you want — not what you should want. Commit or release. Both are okay. What's not okay is staying in limbo. Clarity is a gift to both of you.",
    work: "That career pivot, that difficult conversation, that quit-or-stay question — today, decide. Your future self will thank you for the courage. Ambivalence ages you.",
    money: "That financial decision you've been avoiding — today, make it. Buy or don't buy. Invest or don't. Ask for the raise or accept you won't. Clarity frees the mind for what's next.",
    lucky: { color: "Pure white", number: 20, item: "Something that represents a decision made" }
  },
  { 
    id: 21, 
    name: "The World", 
    emoji: "🌍", 
    summary: "Completion and wholeness",
    message: "Something comes full circle today. A project ends, a goal is reached, a lesson lands. Take a full breath. You did the work. Celebrate the completion before starting the next thing.",
    love: "A relationship reaches a meaningful milestone, or you find harmony where there was friction. Appreciate what you've created together — the work has been worth it.",
    work: "A major project wraps up today. Don't rush to the next thing. Pause. Document what worked. Celebrate with your team. Mastery compounds when achievements are acknowledged.",
    money: "A financial goal is completed today — a debt paid, a savings milestone, a contract signed. Pause. Acknowledge it. Then set the next one from a place of abundance.",
    lucky: { color: "Royal purple", number: 21, item: "Something that represents completion" }
  }
]
