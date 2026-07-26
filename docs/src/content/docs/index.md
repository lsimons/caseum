---
title: "Caseum"
---

<img src="/caseum/design/logo/logo.png" width="250" align="right" style="margin-left: 10px" alt="Caseum logo">

[Caseum](http://lsimons.github.io/caseum/) is a simple approach to software architecture that combines multiple views to boost understanding and empathy across roles.

## Video introduction

[Watch on YouTube](https://youtu.be/0s1qPY-W1ew)

## Multiple views

Caseum combines these views:

- **C**omponents using C4
- **A**ctors using roles
- **S**tories using Gherkin
- **E**vents using event storming
- **U**I using wireframes
- **M**odels using facts

<img src="/caseum/guides/stages-example.png" width="200" align="right" style="margin-left: 10px" alt="Several screenshots of architecture views">

Together these views fully describe a software system.

Not all projects need all views.

## Lightweight approach

Caseum is for doing just enough architecture. It has three stages:

1. whiteboarding & dialogue
2. digital diagrams & decision records
3. models as code & executable specifications

Not all projects need all stages.

See the [guide on stages of architecture](/guides/stages/). See the [guide on as-is and to-be designs](/guides/as-is-to-be/) for working on existing projects.

## Recording decisions

<img src="/caseum/guides/records-slack-example.png" width="200" align="right" style="margin-left: 10px" alt="Screenshot of a slack channel being used to record decisions">

Architecture records the important design decisions for a system. The records are for communicating with current and future people working on and with the software.

See the [guide on recording decisions](/guides/records/).

## Tools

<img src="/caseum/models/model-example.png" width="200" align="right" style="margin-left: 10px" alt="Partial fact-based model diagram">

The primary tools used by Caseum are:

- Whiteboards, markers, and sticky notes
- Draw.io for digital diagrams
- Markdown text files for decision records
- Model specification in structured text formats (Structurizr C4, Gherkin, LinkML and AsyncAPI JSON)

See the guides on [whiteboarding architecture](/guides/whiteboarding/) and on [using draw.io for architecture](/guides/drawio/).

Different tools are available per view per stage:

|                | **Whiteboarding &<br/> Dialogue**              | **Diagrams &<br/> Decision Records**                     | **Models &<br/> Executable Specifications** |
| -------------- | ---------------------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| **Components** | [Boxes & lines](/components/c4-whiteboarding/) | [C4 Draw.io Library](/components/c4-template/)           | [C4 as Code](/components/c4-code/)          |
| **Actors**     | [Roles & needs](/actors/actor-whiteboarding/)  | [Role Markdown Template](/actors/role-template/)         | -                                           |
| **Stories**    | [Goals & epics](/stories/story-whiteboarding/) | [User Story Markdown Template](/stories/story-template/) | [Gherkin](/stories/gherkin-code/)           |
| **Events**     | [Event Storming](/events/event-storming/)      | [ES Draw.io Library](/events/event-template/)            | [AsyncAPI](/events/asyncapi-code/)          |
| **UI**         | [Boxes & lines](/ui/ui-whiteboarding/)         | [Wireframes Draw.io Library](/ui/ui-template/)           | -                                           |
| **Models**     | [Circles & lines](/models/fact-whiteboarding/) | [Model diagrams](/models/model-diagrams/)                | [LinkML](/models/linkml-code/)              |

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" align="left" style="border: 0;margin-right: 10px" src="https://i.creativecommons.org/l/by/4.0/88x31.png"></a><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Caseum</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://caseum.org" property="cc:attributionName" rel="cc:attributionURL">Leo Simons</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

See [LICENSE.txt](/LICENSE.txt) for a plain text copy of the Creative Commons Attribution 4.0 International License.

## Contributing

See [CONTRIBUTING.md](/contributing/) for details on how to contribute to Caseum.

## Code of conduct

See [Code of Conduct](/code-of-conduct/) for details on how to participate in the Caseum community.
