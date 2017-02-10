'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').GAME_STATES;
const coreHandlers = require('./core.handlers');
const mixinHandlers = require('../modules/utils').mixinHandlers;
const dealerDecision = require('../modules/dealer-player-hands');

module.exports = Alexa.CreateStateHandler(states.DEALSPLIT, mixinHandlers(coreHandlers, {

  // if (dealerDecision.splitTotal1() === 21 || dealerDecision.splitTotal2() === 21 ) {
  //   this.handler.state = STOPPED;
  //   this.emit(':tell', 'you have won against the dealer, congratulations! Would you like to play again?') ;
  // } else if (dealerDecision.splitTotal1() >= 21 || dealerDecision.splitTotal2() >= 21 ) {
  //   this.handler.state = STOPPED;
  //   this.emit(':tell', 'You have bust, the dealer wins this hand. Would you like to play again?');
  // }

  /*SplitIntent() {
    if (dealerDecision.theDealersTotal() > 21) {
      this.handler.state = states.STOPPED;
      this.emit(':tell', 'The dealer has bust, you win. Would you like to play again?');
    } else if (dealerDecision.theDealersTotal() >= 17) {

        if (dealerDecision.playerStandIdSplit1() === 1 || dealerDecision.playerStandIdSplit2() === 1) {
          if (dealerDecision.theDealersTotal() > dealerDecision.thePlayerTotal()) {
            this.handler.state = states.STOPPED;
            this.emit(':tell', `The dealer has won. Beating your total of ${dealerDecision.thePlayerTotal()}, with her ${dealerDecision.theDealersTotal()}.` +
                               ' Would you like to play again?');
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

      this.handler.state = states.SPLIT;
      dealerDecision.dealerStandIdSplit1() + 1;
      this.emit(':tell', 'The dealer stands');
    }
    this.handler.state = states.SPLIT;
    this.emit(':tell', `The dealer hits and now has a ${dealerDecision.cardsViewableByPlayer()}, and one card face down!`);
  }*/

}));
