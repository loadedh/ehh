'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').GAME_STATES;
const coreHandlers = require('./core.handlers');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const playerDecisions = require('../modules/dealer-player-hands');
const response = require('../responses');

module.exports = Alexa.CreateStateHandler(states.PLAYING, mixinHandlers(coreHandlers, {

  //Check if player has higher score than 21
  //Check if dealer has higher score than 21

  HitIntent() {
    playerDecisions.playerHits();
    this.emit(':tell', playerDecisions.playerHand()/*outcome of dealers logic*/);
  },
  StandIntent() {

    if (playerDecisions.dealerStandId() === 1) {
      if (playerDecisions.theDealersTotal() > playerDecisions.thePlayerTotal()) {
        this.handler.state = states.STOPPED;
        this.emit(':tell', `The dealer has won. Beating your total of ${playerDecisions.thePlayerTotal()}, with her ${playerDecisions.theDealersTotal()}.` +
                           ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() === playerDecisions.thePlayerTotal()) {
        this.handler.state = states.STOPPED;
        this.emit(':tell', 'You have the same total as the dealer however in this house the dealer wins all ties!' +
                          ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() < playerDecisions.thePlayerTotal()) {
        this.handler.state = states.STOPPED;
        this.emit(':tell', `You have won! Beating the dealers total of ${playerDecisions.theDealersTotal()}, with your ${playerDecisions.thePlayerTotal()}` +
                          ' Would you like to play again?');
      }
  }

    this.handler.state = states.DEALING;
    playerDecisions.playerStandId() + 1;
    this.emit(':tell', playerDecisions.playerStands());
  },
  SurrenderIntent() {
    this.handler.state = states.STOPPED;
    this.emit(':tell', response.playerSurrenders());
  },
  SplitIntent() {
    if (playerDecisions.playerHand() > 2) {
      this.emit(':tell', 'You cannot split after you have hit or split before!', 'Choose another option!');
    }
    this.handler.state = states.DEALSPLIT;
    this.emit(':tell', `After splitting you hands are ${playerDecisions.SplitHand1()} and ${playerDecisions.SplitHand2()}`);
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':ask', response.gameHelp());
  }
}));
