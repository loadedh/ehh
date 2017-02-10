'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').GAME_STATES;
const response = require('../responses');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const playerDecisions = require('../modules/dealer-player-hands');
const coreHandlers = require('./core.handlers');

module.exports = Alexa.CreateStateHandler(states.SPLITSECONDHAND, mixinHandlers(coreHandlers, {
  //
  // this.emit(':tell', `Your current hand is ${playerDecisions.SplitHand2()}`);
  //
  // if (playerDecisions.theDealersTotal() === 21) {
  //   this.handler.state = states.STOPPED;
  //   this.emit(':tell', 'The dealer has hit 21 winning this hand, unlucky! Would you like to play again?')
  // } else if (playerDecisions.theDealersTotal() > 21) {
  //   this.handler.state = states.STOPPED;
  //   this.emit(':tell', 'The dealer has bust, you win this hand, congratulations! Would you like to play again?')
  // } else if (playerDecisions.playerStandIdSplit2() === 1) {
  //   this.handler.state = states.DEALSPLIT;
  // }
  //
  // const secondHandAfterSplitAndHit = playerDecisions.SplitHand2().concat(playerDecisions.dealtCard());

  HitIntent() {
    this.handler.state = states.DEALSPLIT;
    this.emit(':tell', `Your second hand now has ${playerDecisions.SplitHand2()}. Dealer is making a decision!`);
  },
  StandIntent() {

    if (playerDecisions.dealerStandIdSplit1() === 1) {
      if (playerDecisions.theDealersTotal() > playerDecisions.splitTotal2()) {
        this.handler.state = states.STOPPED;
        this.emit(':tell', `The dealer has won. Beating your total of ${playerDecisions.splitTotal2()}, with her ${playerDecisions.theDealersTotal()}.` +
                           ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() === playerDecisions.splitTotal2()) {
        this.handler.state = states.STOPPED;
        this.emit('tell', 'You have the same total as the dealer however in this house the dealer wins all ties!' +
                          ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() < playerDecisions.splitTotal2()) {
        this.handler.state = states.STOPPED;
        this.emit('tell', `You have won! Beating the dealers total of ${playerDecisions.theDealersTotal()}, with your ${playerDecisions.splitTotal2()}` +
                          ' Would you like to play again?');
      }
    }

    this.handler.state = states.DEALSPLIT;
    playerDecisions.playerStandIdSplit2() + 1;
    this.emit(':tell', playerDecisions.playerStands());
  },
  SurrenderIntent() {
    this.handler.state = states.STOPPED;
    this.emit(':tell', response.playerSurrenders());
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':ask', response.gameHelp(), `your first hand is ${playerDecisions.SplitHand1()} and your second hand is ${playerDecisions.SplitHand2()}. What will you do with your second hand?`);
  }
}));
