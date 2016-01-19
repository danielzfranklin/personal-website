title: Etch Code
image: /static/images/etch_editor.png
order: 2

[Etch Code][website] is a work-in-progress attempt by [Sam
Schickler](http://samschickler.com/) and I to make the transition between
[Scratch](https://scratch.mit.edu) and a written language easier. Etch Code is
all the same Scratch blocks that people are used to, except the blocks are
written instead of dragged. For example:

    flag clicked:
        say("Hello World")
<!-- full content -->

Etch Code is much looser than most other languages to make it easier to learn.
Capitalization and spaces are irrelevant, so flagclicked equals flagClicked
equals flag clicked equals FLAG CLICKED. The hope is to minimize some types of
stupid syntax errors and keep what a person coming from Scratch must memorize to
a minimum.

Blocks that have other blocks inside of them are indented like in python. If you
want to use tabs, it's your loss. Just be consistent and only use either tabs or
spaces (also just like python).

    flag clicked:
        say("hi")

Strings, integers, and functions are written just as they are in almost every written language

    1                  # integer
    "Hello World"      # string
    say("Hello World") # function

We don't yet support defining custom functions or "more blocks." Let us know if
you have any ideas for how it should work.

It's not quite functional at this point, but there is a semi-working site up at
[etchcode.org][website]

[website]: https://etchcode.org
