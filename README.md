# Fractals Playground

This website allows you to explore the breautiful world of fractals. We can find fractals everywhere in nature. Popular examples are the *[Romanseco broccoli](https://en.wikipedia.org/wiki/Romanesco_broccoli?wprov=sfti1)* and many types of ferns. In fractals, the shape of the smaller parts looks like like the shape of the whole. We can say that they are *self-similar*.

### Properties of fractals
Fractals can pack an incredibly large surface areas into a small volume. This can be important for living things, as large surface areas allow them to better exchange molecules with their environment, such as oxygen, carbon dioxide, or food molecules.

The animation below shows us what this can look like in 2D...
> Insert animation of folding Koch curve

## Making Fractals
Although the shape of fractals can look incredibly complicated, we can make them using a few simple tricks. Instead of writing instructions for how to make the whole shape, we try to come up with simple rules that describe how the structure grows in a stepwise manner. Figuring out the rules is the most important step. Afterwards, all we have to do teach a computer how to understand them as drawing instructions.

## L -  Systems
This is where **Lindenmeyer-Systems** or (L-Systems) come in. They are a way to do just that! Originally, they were invented by the Hungarian biologist **Aristide Lindenmeyer**, who used them to describe how strands of algae grow.

##### Parts
The idea behind L-Systems is to take a drawing instructions and repeatedly apply the same rules to them, that change each instruction into another set of instructions at each step of the process. (This step-wise approach is called *iterative generation*).

###### Alphabet
The alphabet is a set of letters or symbols that represent actions for the drawing program. The symbols used here are
- **`F`** *"move forward and draw"*,
- **`X`** *"move forward and draw"* or *just move forward*
- **`+`** "*turn left by a certain angle*"
- **`-`** *"turn right by a certain angle"*
- **`[`** "*enter a branch*"
- **`]`** *"exit a branch"*

###### Axiom
This is a sentence made from our alphabet that forms the starting point. In the simplest case this is a single symbol.

##### Rules
These are applied to each symbol to move from one step to the next and generate a new sentence of symbols for each step of.

## A Simple Example

Let's try to implement the example of the *Koch snowflake*.

![Koch Snowflake](/assets/koch-snowflake.png)

First, we need to figure out what our alphabet is. There are no branches in the snowflake, so we will not need any symbols for branching (**`[`** and **`]`**). We need a symbol for drawing a line (**`F`**) and symbols for turning left and right (+ and -).

Let's start by drawing a single line (our Axiom is **`F`** ). To draw a Koch curve, each line is turned into four lines with a kink in the middle...

![Koch Rule](/assets/koch-rule.png)

The corresponding rule set is **`F+F--F+F`** .

1. Click on the settings button and past the rule into the field labelled **`F->`**.
2. Grow the structure by pressing the red button labelled plus.
3. Set the angle to 60°.

##### Turning the Koch Curve into A Koch Snowflake
In order to turn the Kock curve into a snowflake, we need to change the Axiom.

1. Change the Axiom to **`F++F++F`**
2. Explore

## Suggested L-Systems to Explore
- Dragon Curve
- Koch Snowflake
- Sierpinski Triangle
- Binary Tree
- Barnsley Fern

---

## User Interface

### Main Page
- The blue buttons control the position of the origin
- The red buttons control the depth/iteration step
- The yellow buttons control the angle
- The green buttons change the zoom-level or scale
- The rules can be edited by pressing...
- The drawing can be download as `image.png` by pressing the download button.

### Keyboard Shortcuts
 - <kbd class="kbc-button-xs">w</kbd>, <kbd class="kbc-button-xs">a</kbd>, <kbd class="kbc-button-xs">s</kbd>, <kbd class="kbc-button-xs">d</kbd> - for moving the origin up, left, down or right, respectively
 - <kbd class="kbc-button-xs">y</kbd> / <kbd class="kbc-button-xs">x</kbd> - for changing the depth (iteration step)
 - <kbd class="kbc-button-xs">c</kbd> / <kbd class="kbc-button-xs">v</kbd> - for changing the angle
 - <kbd class="kbc-button-xs">b</kbd> / <kbd class="kbc-button-xs">n</kbd> - for changing the zoom/scaling

### Settings Page
- Only the following symbols can be used for specifying rules:
	- **`F`** *"move forward and/or draw"*
	- **`X`** *"move forward and/or draw"*
	- **`+`** "*turn left by a certain angle*"
	- **`-`** *"turn right by a certain angle"*
	- **`[`** "*enter a branch*"
	- **`]`** *"exit a branch"*
- You can change the effect that **`X`** has using the radio buttons.