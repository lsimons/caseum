# As-is and to-be designs

**The most important architecture description of the existing system is the one as it currently exists, "as-is".**

Learning, agreeing, and knowing how things actually are is very important. Too many teams focus only on what should be or what could be, "to-be". This is a mistake. When you work with individual assumptions of how things are instead of a shared understanding, you will build the wrong thing the wrong way slowly.

## Finding facts

When working with an existing system, it is common for its architecture description to be a little or a lot out of date. Often the only design document is of what teams intended to build, not what they actually built. This means designs cannot be trusted.

To create a shared as-is understanding of a software architecture, gather all the descriptions available and ask the maintainers of the system whether the descriptions are up-to-date. Descriptions that are out-of-date should be flagged as such. They do not all need to be updated.

Hold interactive [whiteboarding](whiteboarding.md) workshops to draw new pictures of the system as-is. Any box, line, circle, or other element you draw on the whiteboard should be backed up by a fact. Look for evidence in the running system, its source code, or the knowledge of experts. Do not draw things that may be true or are assumed to be true.

Most systems have only a few of the Caseum views. Drawing the other views helps to find more facts. Capture all the information across different views, iterating and refining the as-is design as you learn more together. When you have a complete set of facts, tell the story of the as-is system to each other several times, finding more facts and information as you do so.

### Looking at example data to find facts

You can understand a lot about existing systems by looking at their data inputs and outputs. Capture UI forms and screens, API requests and responses, reports, and dashboards. It can help to print these out and stick them on the walls next to your whiteboards.

As you understand more, use [fact-based whiteboarding](../models/fact-whiteboarding.md) to draw the data model underlying and supporting the examples. Check each type and each link between types against the examples.

### Event storming to find facts

An [event storming](../events/event-storming.md) workshop is a great way to find these as-is facts, especially if you have access to business stakeholders. Especially for long-running systems, their current use can be very different from the original intent, and this is important to capture.

### Working backwards

The [guide on stages of design](stages.md) suggests working iteratively in this order:

1. Actors
2. Stories
3. UI
4. Events
5. Components
6. Models

Starting with actors, stories, and UI helps to make the rest of the design user-centric. When documenting existing systems, you can work backward instead. First capture all the facts you can find about the system, then start to involve experts and stakeholders to understand how the system is used and why.

## From as-is to to-be

Many engineers are inclined to talk about solving problems as they see them. When documenting the as-is architecture, it is natural to want to talk about changing it to fix things. Rather than prevent such thoughts completely, instead capture the ideas about possible changes as you go, and create a backlog of design ideas.

Most teams spend too much time on to-be designs and not enough on as-is designs. If you don't know where you are, it is difficult to get to where you want to be. Complete the as-is design to a good level of quality and detail.

Once the as-is description of the system is reasonably complete and everyone on the team can tell the same story about the system from a common shared understanding, it is time to start designing changes to the existing system to end up in a new situation.

It can be tempting to design the to-be situation based on all the new ideas that were already generated. Instead, stay user-focused. Describe the needs of actors that are not being (fully) met by the existing system and the stories that would meet their needs. Then design just enough changes to the existing system to meet those needs.

For many existing systems, the unmet needs are those of the maintainers of the existing system. The maintainers spend so much time on keeping the lights on that they cannot make the changes their users need. In this case, it can help to consider these maintainers as users and to [introduce a platform](platforms.md) layer to capture their needs.

## Imagining big changes

Sometimes when doing design work for an existing system, there is a hope that radical new technology creates a big improvement. The existing system may be using legacy technology. Its maintainers may have moved on. Stakeholders are interested in rebuilding or replatforming such a system in a big bang.

But such big-bang migrations do not work. Do not promise otherwise.

In such a situation, the to-be system can be designed as a completely new system following the [guide to stages](stages.md). Such a to-be system can help to convince non-technical stakeholders.

Once the new to-be system is imagined, design many small step-by-step migrations from the as-is situation to the to-be situation. Keep a sequence of [records](records.md) that move the current system incrementally to the new situation. If you cannot design such a sequence, change the to-be design so that the incremental migration becomes possible.

The larger and older the existing system, the longer the migration path seems, and the higher the temptation becomes to consider a big-bang change...the lower the chance of success of such big-bang change becomes.

## Other terminology

'Ist' is the German term for as-is, and 'Soll' is the German term for to-be, so in German you can speak of 'Ist und Soll' to describe the current and future situation.

The steps to take to go from as-is to to-be architecture are crossing a gap, so you can speak of 'gap analysis' to describe part of the design work of crossing the gap, a popular phrase in business language. Note that beyond just doing the analysis, you should explicitly design the migration path, as described above.
