# Describing stories with Who/What/Why

**Use a simple but structured format for each story that describes Who/What/Why. When the details matter, also describe Given/When/Then.**

## Story markdown template
Caseum adopts the typical format of user stories common in many agile methods:

```markdown
### {story title}
* **As a** {actor role}
* **I want** {goal of the story}
* **so that** {reason of the story}
```

When specific detail is important to the design you should add it, in the form of a scenario:

```markdown
#### Scenario:
* **Given** {context}
* (**And** {more context...})
* **When** {action}
* (**And** {another action...})
* **Then** {expected result}
* (**And** {another result...})
```

## Story example

### Add vet to Pet Clinic
* **As a** pet clinic receptionist
* **I want** to add a new vet to the Pet CLinic
* **so that** appointments can be planned for this vet

#### Scenario:
* **Given** I'm logged in to the Pet Clinic Admin
* **When** I select the Vet Admin
* **And** I select the Add Vet function
* **When** I submmit details of a new Vet
* **Then** a new Vet should be added to the system

## Organizing stories

When there are a few stories (20 or less) they can all be combined into a document. When there are more, combine them into one document per actor role. When _that_ becomes unwieldy, create one document per story, with a folder of section per actor. When _that_ becomes unwieldy (100 or more stories), consider a switching to the next [stage](../guides/stages.md) and start writing [Gherkin code](gherkin-code.md) for acceptance tests.

## Stories to structure software development

In agile software development it is common to implement the software one story at a time. While this way of working is of course compatible with Caseum, it is not required.

If you decide to work this way, make sure to keep a complete catalog of all the stories! The catalog should include both the implemented and the not yet implemented stories. This full set of stories should be kept as documentation in order to make good decisions about the architecture.
