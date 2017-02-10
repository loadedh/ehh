'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').GAME_STATES;
const response = require('../responses');
const playerDealer = require('../modules/dealer-player-hands');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const coreHandlers = require('../handlers/core.handlers');


module.exports = Alexa.CreateStateHandler(states.STARTNEW, mixinHandlers(coreHandlers, {
  StartTheGame() {
    this.emit(':ask', response.newGame());
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':ask', response.gameHelp(), response.keepGoing());
  },
  'AMAZON.YesIntent': function() {
    this.handler.state = states.PLAYING;
    this.emit(':ask', `Your cards are ${playerDealer.playerHand()}`); //Dealer needs cards as well.
  },                                                                             //Have to tell the player just one card
  'AMAZON.NoIntent': function() {
    this.emit(':tell', response.goodbye());
  },
  EndSessionIntent() {
    console.log('Game has ended!');
    this.emit(':saveState', true);
  },
  Unhandled() {
    response.ask.call(this, response.yesOrNo());
  }
}));
