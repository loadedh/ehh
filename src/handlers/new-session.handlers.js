'use strict';

const GAME_STATES = require('../enums').GAME_STATES;

const setStateAndInvokeEntryIntent = function() {
  this.handler.state = GAME_STATES.STARTNEW;

  this.emitWithState('StartTheGame');
};

module.exports = {
  NewSession() {
    setStateAndInvokeEntryIntent.call(this);
  },
  LaunchRequest() {
    setStateAndInvokeEntryIntent.call(this);
  },
  Unhandled() {
    console.log('unhandled');
  },
};
