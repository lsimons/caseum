# Whiteboarding Models

**Together with the people who know the domain, draw the key facts about its concepts on the whiteboard. Focus on types and the links between them, not the underlying structure.**

![Processed photo of a whiteboard containing facts](fact-whiteboarding-example.jpg)

The whiteboard is where you discover and agree the facts, in the room with the domain experts. Keep it informal so anyone can contribute: no software, no formal notation, just circles, lines, sticky notes, and the conversation.

## Draw just the facts

A fact is a piece of information that is true about the business domain. Draw only types that are known to exist in the domain. Draw only relationships that are known to exist in the domain. Draw only types and relationships in the domain that the software needs to know about.

## Draw circles instead of boxes

The dominance of ER and UML modeling techniques in creating software designs is a minor tragedy. By drawing boxes of entities (whether tables or classes) and then putting the properties of those entities inside the boxes, you think about the structure of the data too much and too early.

To avoid this trap, simply draw circles for each type (entity, class, concept) instead. To add a property, relationship, or other detail about the type, draw another circle, and link the circles with a line. By working this way, you do not introduce a hierarchy of types vs properties, and you can iterate on the design on the whiteboard and discover the eventual hierarchy as you go.

## Draw crow's feet for one-to-many or many-to-many relationships

To show that a link between two types is a one-to-many or many-to-many relationship, draw a crow's foot on the end of the line.

## Draw arrows for inheritance

If a certain type is a specialization of another type, draw an open-head arrow from the specialized type to the general type.

Don't use inheritance unless you need it.

## Draw the same concept multiple times

If you are drawing a large model, avoid drawing super-long lines that are hard to trace. Instead, you can draw the same type a couple of times in different places on the whiteboard so that you can show all its relationships.

## Write the primary identifier of a type inside the circle

If a type has a single primary identifier in the business domain, write it inside the circle, right after the type name, in brackets. For example, "Bank Account (IBAN)".

## Avoid specifying all facts on the whiteboard

The whiteboard is a tool for thinking. It is not necessary to specify all facts on the whiteboard. Instead, focus on the facts that are most important to the software design.

While you can draw [formal ORM diagrams](model-diagrams.md) on a whiteboard, the added syntax and semantics make it harder to contribute for those not trained in the technique — the expert who happily corrects a sentence will hesitate to touch a diagram symbol. It is often better to stick to simpler diagrams and focus on the conversation about what the key facts are and how the software should support them.

## Add examples of facts

A few pieces of concrete example data help a lot to clarify the model. Especially for more complex domain concepts, add some concrete examples, usually as a table of sample data. Examples do double duty: they help you discover a fact and they test it. If a domain expert can't fill in the example table, the fact is wrong.
