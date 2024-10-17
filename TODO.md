# TODO

## Important

- [ ] Organize the code in a better and more readable way.
- [ ] Try to have aliases for file import (when using require) -> this could be useful in the file where we set the command for pdf conversion where we could avoid passing the conversion functions as arguments.

## Medium

- [ ] Fix vim extension interacting with the cursor's position that lead to the extension not working properly when selecting text.
- [ ] add the h1 to h6 tags in the component list
- [ ] `<a>` tag in the component list (make sure that the selected text will be in the link). Also make it reversible (html a tag to md link).
- [ ] change `<img>` tag so it can transform the default md link when selected (with `![]()` to a proper html img tag). Also make it reversible (html img tag to md img tag). 
- [ ] we have the md to html for tables but the opposite would be nice too (html to md tables)
- [ ] Convert `/` fractions to latex (katex) fractions.

## Low

- [ ] Improve and correct the README
- [ ] Publish the extension on the marketplace when it will be ready.

## Done

- [X] Make the extension (and especially for the server) run directly when vscode is opened (and not when we click on the extension button as for now)
- [X] Make a button to reload the server