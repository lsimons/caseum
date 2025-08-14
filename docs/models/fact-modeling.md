# Fact-Based Modeling

Fact-oriented descriptions of information models are more stable, durable, and expressive than using UML or ER. They are easier to understand for non-technical stakeholders.

## Why doesn't everyone know about FBM?

Fact-Based Modeling is to UML as Lisp is to Java: older, more powerful, and sadly less well-known and used. But while Lisp is hard to learn, FBM is easy!

The main reason FBM isn't more popular is that the software industry has spent decades trying to make model-driven software development work (whether using CASE tools, MDA, or no-code platforms), focusing on modeling tools and languages that are easy to translate to object-oriented or procedural software.

## Why should I use FBM?

Because it works really well! The original [ORM whitepaper](http://orm.net/pdf/ORMwhitePaper.pdf) remains the best practical description of the many advantages of fact-based modeling.

## Why should I use FBM with Caseum?

Caseum is quite a _practical_ architecture tool for building software. The main purpose of architecture when making software is to help you to design and to _think_ about the software. Caseum picks the best available tools for thinking, and modeling using facts is a great way to think!

## What is a fact?

A fact is a piece of information that is true about the business domain. Facts are the building blocks of information models.

## What is fact-based modeling?

Fact-based modeling is a modeling technique that focuses on facts and their relationships. It is a family of techniques that includes [Object-Role Modeling (ORM)](http://orm.net/), [Type-Link Modeling (TLM)](https://type.link.model.tools/), [NIAM](https://en.wikipedia.org/wiki/NIAM), and [FCO-IM](https://en.wikipedia.org/wiki/FCO-IM).

## Can I use Caseum without using fact-based modeling?

Sure! For bigger systems, simply replace TLM or ORM or another fact-based approach with another structured way to model the information domain for your software. You could use ER-style diagrams or UML class diagrams. For smaller systems, just use informal boxes-and-lines-and-sticky-notes whiteboarding in any way you like.
