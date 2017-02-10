'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').GAME_STATES;
const response = require('../responses');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const playerDecisions = require('../modules/dealer-player-hands');
const coreHandlers = require('./core.handlers');

module.exports = Alexa.CreateStateHandler(states.SPLIT, mixinHandlers(coreHandlers, {

  // this.emit(':tell', `Your current hand is ${playerDecisions.SplitHand1()}`);
  //
  // if (playerDecisions.theDealersTotal() === 21) {
  //   this.handler.state = states.STOPPED; //possibly do dealer checks for bust or win blah blah blah here
  //   this.emit(':tell', 'The dealer hit 21, You have lost against the dealer. Would you like to play again?')
  // } else if (playerDecisions.theDealersTotal() > 21) {
  //   this.handler.state = states.STOPPED;
  //   this.emit(':tell', 'The dealer has bust, you win this hand, congratulations! Would you like to play again?')
  // } else if (playerDecisions.playerStandIdSplit1() === 1) {
  //   this.handler.state = states.SPLITSECONDHAND;
  //   this.emit(':ask', 'You are standing with this hand. What would you like to do with the second hand?')
  // }

  // const firstHandAfterSplitAndHit = playerDecisions.SplitHand1().concat(playerDecisions.dealtCard());

  HitIntent() {
    this.handler.state = states.SPLITSECONDHAND;
    this.emit(':tell', `Your first hand now has ${playerDecisions.SplitHand1().concat(playerDecisions.dealtCard())}. What will you do with your second hand?`);
  },
  StandIntent() {

    if (playerDecisions.dealerStandIdSplit1() === 1) {
      if (playerDecisions.theDealersTotal() > playerDecisions.splitTotal1()) {
        this.handler.state = states.STOPPED;
        this.emit(':tell', `The dealer has won. Beating your total of ${playerDecisions.splitTotal1()}, with her ${playerDecisions.theDealersTotal()}.` +
                           ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() === playerDecisions.splitTotal1()) {
        this.handler.state = states.STOPPED;
        this.emit('tell', 'You have the same total as the dealer however in this house the dealer wins all ties!' +
                          ' Would you like to play again?');
      } else if (playerDecisions.theDealersTotal() < playerDecisions.splitTotal1()) {
        this.handler.state = states.STOPPED;
        this.emit('tell', `You have won! Beating the dealers total of ${playerDecisions.theDealersTotal()}, with your ${playerDecisions.splitTotal1()}` +
                          ' Would you like to play again?');
      }
    }

    this.handler.state = states.SPLITSECONDHAND;
    playerDecisions.playerStandIdSplit1() + 1;
    this.emit(':tell', playerDecisions.playerStands());
  },
  SurrenderIntent() {
    this.handler.state = states.STOPPED;
    this.emit(':tell', response.playerSurrenders());
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':ask', response.gameHelp());
  }
}));
