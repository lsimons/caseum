![Caseum Logo](docs/design/logo/logo.png)

Caseum is a modern lightweight approach for software architecture. It combines aspects:
* C4 for **C**omponents
* personas for **A**ctors
* gherkin for **S**tories
* wireframes for **U**I
* event storming for **E**vents
* TLM for **M**odels

to fully describe a software system.

Caseum is an iterative, "just enough" architecture. It has phases:

1. brainstorming & whiteboarding
2. diagrams & decision records
3. models as code & executable specifications

Different tools are available per aspect per phase:

|                     | **Brainstorming & Whiteboarding**               | **Diagrams & Decision Records**                           | **Models & Executable Specifications**    |
|---------------------|-------------------------------------------------|-----------------------------------------------------------|-------------------------------------------|
| **Components**      | [Boxes & lines](components/c4-whiteboarding.md) | [C4 Draw.io Library](components/c4-template.md)           | [C4 as Code](components/c4-code.md)       |
| **Actors**          | [Names & needs](actors/actor-whiteboarding.md)  | [Persona Markdown Template](actors/persona-template.md)   | -                                         |
| **Stories**         | [Goals](stories/story-whiteboarding.md)         | [User Story Markdown Template](stories/story-template.md) | [Gherkin](stories/gherkin-code.md)        |
| **UI**              | [Boxes & lines](ui/ui-whiteboarding.md)         | [Wireframes Draw.io Library](ui/ui-template.md)           | -                                         |
| **Events**          | [Event Storming](events/event-storming.md)      | [ES Draw.io Library](events/event-template.md)            | [CloudEvents](events/cloudevents-code.md) |
| **Models**          | [Circles & lines](models/fact-whiteboarding.md)   | [TLM Draw.io Library](models/tlm-template.md)             | [TLMD](models/tlm-code.md)                |
