'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').GAME_STATES;
const coreHandlers = require('./core.handlers');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const dealerDecision = require('../modules/dealer-player-hands');

module.exports = Alexa.CreateStateHandler(states.DEALING, mixinHandlers(coreHandlers, {

  // if (dealerDecision.playerTotal() === 21) {
  //   this.handler.state = states.STOPPED;
  //   this.emit(':tell', `You have won against the dealers ${dealerDecision.theDealersTotal()} congratulations. Would you like to play again?`)
  // } else if (dealerDecision.playerTotal() > 21) {
  //   this.handler.state = states.STOPPED;
  //   this.emit(':tell', 'You have bust, the dealer wins. Would you like to play again?')
  // }

  /*dealersChoice () {
    if (dealerDecision.theDealersTotal() > 21) {
      this.handler.state = states.STOPPED;
      this.emit(':tell', 'The dealer has bust, you win. Would you like to play again?');
    } else if (dealerDecision.theDealersTotal() >= 17) {

      if (dealerDecision.playerStandId() === 1) {
        if (dealerDecision.theDealersTotal() > dealerDecision.thePlayerTotal()) {
          this.handler.state = states.STOPPED;
          this.emit(':tell', `The dealer has won. Beating your total of ${dealerDecision.thePlayerTotal()}, with her ${dealerDecision.theDealersTotal()}.` +
                             ` Would you like to play again?`);
        } else if (dealerDecision.theDealersTotal() === dealerDecision.thePlayerTotal()) {
          this.handler.state = states.STOPPED;
          this.emit('tell', 'You have the same total as the dealer however in this house the dealer wins all ties!' +
                            ' Would you like to play again?');
        } else if (dealerDecision.theDealersTotal() < dealerDecision.thePlayerTotal()) {
          this.handler.state = states.STOPPED;
          this.emit('tell', `You have won! Beating the dealers total of ${dealerDecision.theDealersTotal()}, with your ${dealerDecision.thePlayerTotal()}` +
                            ' Would you like to play again?');
        }
      }

      this.handler.state = states.PLAYING;
      this.emit(':tell', `The dealer stands with ${dealerDecision.dealerHand()}`);
    }
    this.handler.state = states.PLAYING;
    this.emit(':tell', `The dealer hits and now has ${dealerDecision.dealerHand()}`);
  }*/
}));
