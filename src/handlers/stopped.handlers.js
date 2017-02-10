'use strict';

const Alexa = require('alexa-sdk');
const states = require('../enums').GAME_STATES;
const response = require('../responses');

module.exports = Alexa.CreateStateHandler(states.STOPPED, {
  'AMAZON.YesIntent': function() {
    // updates
    this.handler.state = states.STARTNEW;
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', response.goodbye());
  },
  Unhandled() {
    this.emit(':ask', response.yesOrNo());
  },
  SessionEndedRequest() {
    console.log(`${states.STOPPED} ended: ${this.event.request.reason}`);
  },
});
