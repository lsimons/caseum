<img src="docs/design/logo/logo.png" width="200" align="right" margin="10" alt="Caseum logo">

# Caseum

Caseum is a modern lightweight approach to software architecture using multiple views.

## Multiple views

Caseums combines these views:
* **C**omponents using C4
* **A**ctors using personas
* **S**tories using Gherkin
* **E**vents using event storming
* **U**I using wireframes
* **M**odels using TLM

Together these views fully describe a software system.

Not all projects need all views.

## Lightweight

Caseum is for incremental, "just enough" architecture. It has stages:

1. brainstorming & whiteboarding
2. diagrams & decision records
3. models as code & executable specifications

Many projects only need stage 1. Many other projects only need stages 1 and 2.

See the [guide on stages of architecture](guides/stages.md).

## Recording decisions

<img src="guides/records-slack-example.png" width="200" align="right" margin="10" alt="Screenshot of a slack channel being used to record decisions">

Architecture records the important design decisions for a software system. The records are for communicating with current and future people working on and with the software.

See the [guide on recording decisions](guides/records.md).

## Tools

The primary tools used by Caseum are:

* Whiteboards, markers, and sticky notes
* Draw.io for digital diagrams
* Markdown text files for decision records
* Model specification in structured text formats (Structurizr C4, Gherkin, TLMD and CloudEvents JSON)

See the guides on [whiteboarding architecture](guides/whiteboarding.md) and on [using draw.io for architecture](guides/drawio.md).

Different tools are available per view per stage:

|                     | **Brainstorming & Whiteboarding**               | **Diagrams & Decision Records**                           | **Models & Executable Specifications**    |
|---------------------|-------------------------------------------------|-----------------------------------------------------------|-------------------------------------------|
| **Components**      | [Boxes & lines](components/c4-whiteboarding.md) | [C4 Draw.io Library](components/c4-template.md)           | [C4 as Code](components/c4-code.md)       |
| **Actors**          | [Roles & needs](actors/actor-whiteboarding.md)  | [Persona Markdown Template](actors/persona-template.md)   | -                                         |
| **Stories**         | [Goals & epics  ](stories/story-whiteboarding.md)         | [User Story Markdown Template](stories/story-template.md) | [Gherkin](stories/gherkin-code.md)        |
| **Events**          | [Event Storming](events/event-storming.md)      | [ES Draw.io Library](events/event-template.md)            | [CloudEvents](events/cloudevents-code.md) |
| **UI**              | [Boxes & lines](ui/ui-whiteboarding.md)         | [Wireframes Draw.io Library](ui/ui-template.md)           | -                                         |
| **Models**          | [Circles & lines](models/fact-whiteboarding.md)   | [TLM Draw.io Library](models/tlm-template.md)             | [TLMD](models/tlm-code.md)                |

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Caseum</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/lsimons/caseum" property="cc:attributionName" rel="cc:attributionURL">Leo Simons</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

See [LICENSE.txt](LICENSE.txt) for a plain text copy of the Creative Commons Attribution 4.0 International License.
