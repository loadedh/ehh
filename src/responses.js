/* eslint-ignore max-len */
'use strict';

module.exports.keepGoing = () =>
  'Would you like to carry on?';

module.exports.gameHelp = () =>
  'This is blackjack. You will have a hand of two cards with which you can hit, stand  or surrender. You may also split but, only if you have a pair and only on the first round';

module.exports.goodbye = () =>
  'Thats a shame. Ok well, I will see you next time!';

module.exports.newGame = () =>
  'Welcome to the casino, would you like to play?';

module.exports.yesOrNo = () =>
  'So is that a yes or a no...?';

module.exports.playerSurrenders = () =>
  'You have surrendered, this gives the win to the dealer! Would you like to play again?'



module.exports.ask = function(sayWhat, continuation) {
  // updates
  this.attributes.previousState = this.handler.state;
  this.attributes.previousResponse = continuation || sayWhat;

  // response
  this.emit(':ask', sayWhat);
};

module.exports.tell = function(tellWhat) {
  this.emit(':tell', tellWhat);
};
