# Fact-Based Modeling

Fact-oriented descriptions of information models are more stable, durable, and expressive than UML or ER, and easier for non-technical stakeholders to check. The durable idea is simple: **model just the facts.**

## What is a fact?

A fact is a piece of information that is true about the business domain, small enough to state as a single sentence you can read aloud:

> A Team has at least one lead, who is a Person.

Facts are the building blocks of an information model.

## What is fact-based modeling?

Fact-based modeling builds a model up from elementary facts and the links between them, instead of starting from tables or classes. You find the facts by talking with the people who know the domain — using concrete examples, plain language, and simple drawings — and you write each one as a sentence they can confirm or reject.

It is a family of techniques. The best known is [Object-Role Modeling (ORM)](https://en.wikipedia.org/wiki/Object-role_modeling), the work of [Terry Halpin](https://en.wikipedia.org/wiki/Terry_Halpin). Others include [NIAM](https://en.wikipedia.org/wiki/NIAM) and [FCO-IM](https://en.wikipedia.org/wiki/FCO-IM). They differ in notation and rigor, but share the same core: a domain is a set of facts, and every fact reads out as a sentence.

## Why model in facts?

Because a sentence is something a domain expert can check. A product manager can read "A Team has at least one lead" and tell you it's wrong — "teams go without a lead for months during reorgs" — which is cheap feedback at a whiteboard and expensive feedback after you ship a `NOT NULL` constraint.

Examples do double duty: a small table of concrete data helps you discover a fact and, at the same time, tests it. If the expert can't fill in your example, the fact is wrong.

The original [ORM whitepaper](http://orm.net/pdf/ORMwhitePaper.pdf) remains a good practical description of the wider advantages.

## Why use it with Caseum?

Caseum is a practical tool for building software, and the point of architecture is to help you design and _think_. Modeling in facts is a good way to think — and, more importantly, a good way to communicate across roles, which is Caseum's reason to exist.

## How do I actually do it?

Three stages, from loose to formal:

1. [Whiteboard the facts](fact-whiteboarding.md) together with the domain experts.
2. [Draw a tidy diagram](model-diagrams.md) if you need to communicate or review the model.
3. [Land the facts in code with LinkML](linkml-code.md) if you need generated JSON Schema, SQL, or docs.

You can stop at any stage. For many domains a whiteboard photo plus the agreed sentences is the whole model, and stopping there is fine.

## Which tool should I use?

Hold this part lightly. The conviction is _model just the facts_; the tool is whatever fits your context today.

Right now I'd suggest [LinkML](https://linkml.io/) when you need models-as-code — even though it is not itself fact-based. The dedicated fact-based tooling has withered, while LinkML is maintained and ships the generators you want. That is a contextual call, not doctrine, and it comes with real tradeoffs; the article [Fact-based modelling and LinkML](https://leosimons.com/2026/07/26/fact-based-modelling-and-linkml/) walks through them honestly. If the tooling landscape shifts, the recommendation can shift with it. The facts-first habit is the durable part.

## Why not UML class diagrams or ER?

They pull you into the structure of the data — tables, classes, hierarchies — before you and the stakeholders have agreed what is actually true in the domain. Fact sentences keep that conversation in language everyone shares.

None of this makes UML or ER bad; they are useful, just the wrong place to _start_. If your team already knows one well, you can model with it — try to agree the facts first.

## Why doesn't everyone know about it?

Fact-based modeling has been around for decades but stayed niche. The industry poured its energy into model-driven development — CASE tools, MDA, no-code platforms — aimed at generating code from models, and favored notations close to objects and tables. Being older and less fashionable doesn't make it worse. It is easy to learn and it works well.

## Can I use Caseum without it?

Sure. For bigger systems, swap in whatever structured modeling approach your team already knows, such as ER or UML class diagrams. For smaller systems, informal boxes-and-lines-and-sticky-notes whiteboarding is plenty. The facts-first habit helps even when the notation doesn't.
