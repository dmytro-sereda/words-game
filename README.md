# Words Game

## Description and tools used

A game that helps expand person's vocabulary. Application was built with vanilla JavaScript, HTML and CSS. Managed requests to the 3rd party API with built-in ES6 featute fetch and <b>async/await</b>. The game was built with the use of MVC (Model View Controller) architecture and OOP (Object Oriented Programming) paradigm. Since state management wasn't complex, simple JavaScript object was used.

The idea of the game is the following: user has to write down the word that starts with a letter displayed on the screen. The word has to be a part of English dictionary and no shorter than 2 letters. If the word is correct, the letter changes to the last letter of the word entered. If the word is incorrect, the user loses one of his lives. There are 3 lives in total. If there are no more lives left, the game is over. There is a timer that resets every time the player enters a word. If the player is unable to enter the word before the clock expires, he loses the life. The counter displays how many words the player has been able to enter in one game.

_In the updated version timer was added in order to make the game harder._

## Available scripts

`npm start` - parcel bundles files and starts application

`npm run build` - parcel builds all the files into dist folder that is available for distribution

## Integrations

I have set-up continous deployment of this application with Netlify. Whenever there are any new commits to this repo, Netlify automatically rebuilds and serves up-to-date application to the client.
