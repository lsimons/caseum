# Describing Models as Code using LinkML

**Turn your agreed facts into a [LinkML](https://linkml.io/) schema, then generate JSON Schema, diagrams, docs, and SQL from that single source.**

```yaml
classes:
  Person:
    attributes:
      id:
        identifier: true
        range: uri
      name:
        required: true
      coach:
        range: Person
        multivalued: true
      department:
        range: Department
```

Once the facts are agreed on the whiteboard ([stage 1](fact-whiteboarding.md)) and drawn ([stage 2](model-diagrams.md)), stage 3 lands them in code. Keeping one schema file and generating the rest — API schema, database schema, docs — stops those artifacts from drifting out of sync.

[LinkML](https://linkml.io/) is a YAML-based schema language with a good set of [generators](https://linkml.io/linkml/generators/). It is maintained by Lawrence Berkeley National Laboratory and actively released.

## From facts to a schema

Take a small HR domain, stated as facts you can read aloud to a domain expert:

```
Each Person is identified by an id, which is a URI.
Each Person has exactly one name.
Each Person (the coachee) may have one or more coaches, each of whom is a Person.
Each Person has at most one Department.
Each Team has at least one lead, who is a Person.
```

The same model as LinkML (`hr.yaml`):

```yaml
id: https://example.org/hr
name: hr
prefixes:
  linkml: https://w3id.org/linkml/
  hr: https://example.org/hr/
default_prefix: hr
default_range: string
imports:
  - linkml:types

classes:
  Person:
    attributes:
      id:
        identifier: true
        range: uri
      name:
        required: true
      coach:
        range: Person
        multivalued: true
      department:
        range: Department
  Department:
    attributes:
      id:
        identifier: true
        range: uri
  Team:
    attributes:
      lead:
        required: true
        multivalued: true
        range: Person
```

Each fact becomes a slot (LinkML's word for an attribute), and the how-many wording maps directly:

| Fact sentence form     | LinkML slot                            |
|------------------------|----------------------------------------|
| `is identified by`     | `identifier: true`                     |
| `has exactly one`      | `required: true`                       |
| `has at most one`      | (the default: optional, single-valued) |
| `has at least one`     | `required: true` + `multivalued: true` |
| `may have one or more` | `multivalued: true`                    |
| `who/which is a X`     | `range: X`                             |

Settle on a fixed set of phrases like this and turning the whiteboard into a schema stops being design work and becomes transcription.

## From schema to software

Run the LinkML generators to produce other artifacts from the model:

* `gen-json-schema hr.yaml` — JSON Schema for validating API payloads.
* `gen-erdiagram hr.yaml` — a [Mermaid](https://mermaid.js.org/) ER diagram.
* `gen-sqlddl hr.yaml` — SQL `CREATE TABLE` DDL, including the join table for the multivalued `coach`.
* `gen-doc hr.yaml` — a browsable HTML documentation site.
* `gen-pydantic` / `gen-typescript` — typed classes for your code.

You can also validate example data against the schema, so a concrete example doubles as a test:

```console
$ linkml validate -s hr.yaml -C Person ada.yaml
No issues found
```

LinkML does **not** ship an XML Schema or OpenAPI generator (verified against LinkML 1.11.1, July 2026); if you need those, generate JSON Schema and adapt.

## An honest caveat: LinkML isn't fact-based

LinkML is attribute/class-centric, not fact-oriented, and its rigid schema/data split moves examples away from the facts they illustrate. You gain a maintained generation pipeline; you give up reading the model as sentences and attaching examples directly to a fact.

Those tradeoffs, and why they still make LinkML the pragmatic choice today, are the subject of the article [Fact-based modelling and LinkML](https://leosimons.com/2026/07/26/fact-based-modelling-and-linkml/). This is a *contextual* recommendation: the durable thing is to [model just the facts](fact-modeling.md), found by talking with domain experts. Which tool lands them in code can change as the tooling landscape does.

## Consider other fact-based tools

If you need the full rigor of [Object-Role Modeling (ORM)](https://en.wikipedia.org/wiki/Object-role_modeling) — the complete methodology behind these techniques — its tooling still exists, though most of it is Windows-GUI and diagram-first. See [Fact-Based Modeling](fact-modeling.md) for the wider family and for why fact-oriented modeling beats UML class diagrams or ER.
