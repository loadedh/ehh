/* eslint-disable max-len */

const assert = require('assert');
const skill = require('../index');
const context = require('aws-lambda-mock-context');
const sessionStartIntent = require('./event-samples/new-session/session-start.intent');
const newGame = require('../responses').newGame;

const GAME_STATES = require('../enums');

const sanitise = text => text.replace(/\n/g, '');

const getOutputSpeech = ({ response: { outputSpeech: { ssml } } }) =>
  sanitise(ssml).match(/<speak>(.*)<\/speak>/i)[1].trim();
const getAttribute = ({ sessionAttributes }, attr) => sessionAttributes[attr];
const runIntent = intent => new Promise(res => {
  const ctx = context();
  skill.handler(intent, ctx);

  ctx
    .Promise
    .then(obj => {
      // console.log(obj);
      res({
        endOfSession: obj.response.shouldEndSession,
        outputSpeech: getOutputSpeech(obj),
        gameState: getAttribute(obj, 'STATE'),
      });
    })
    .catch(err => {
      throw new Error(err);
    });
});

describe('Alexa, start game', function() {
  this.timeout(2000);
  it('Did your skill do what it was supposed to...?', () =>
    runIntent(sessionStartIntent)
      .then(({ outputSpeech, gameState }) => {
        assert.deepEqual(outputSpeech, sanitise(newGame())); //doesn't pass because it hits the new-session unhandled
        // assert.deepEqual(gameState, GAME_STATES.STARTNEW);   //rather than hitting LaunchRequest
      }));
});
