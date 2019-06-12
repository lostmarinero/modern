## Listing Messages

This repo represents additional work that was done to complete the coding
challenge as described: https://justpaste.it/2og3u/pdf

## Process

I originally time boxed myself 1 hour to complete what I could - This allowed me to get through the first 5 bullet points and the last one (pagination I was leaving until after).

Then I wanted to add some more styling (I am no designer...) and the 'Show More Messages' button.

I decided to use moment.js as this is a reasonable 3rd party library to use for displaying formatted time.


## Some things I would update if I was to refactor
1. Move styling to css/less, and would probably consider implementing something like the Block Element Modifier [BEM](http://getbem.com/introduction/) methodology for more structure in the styling.
2. Break the components into a separate file/directory for better organization.
3. Consider changing the storage object of the messages from an array to an object/map. There are upsides and downsides, but accessing/deleting the message by a key instead of having to loop through all the items is a faster lookup.
4. Rename some of the variables/functions - although some are clear, others like 'newFirst' could use some work. I wouldn't send out a PR with the code like this.
