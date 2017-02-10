'use strict';

const produceRandomCard = () => {
  const randomElement = Math.random() * 11;
  return Math.ceil(randomElement);
}

const totalOfHand = (hand) => {
  let total = 0;
  for (let i=0; i < hand.length; i++) {
    total += hand[i];
  }

  return total;
};

let playersHand = [produceRandomCard(), produceRandomCard()];
let dealersHand = [produceRandomCard(), produceRandomCard()];

let playerStandId = 0;
let playerStandIdSplit1 = 0;
let playerStandIdSplit2 = 0;

let dealerStandId = 0;
let dealerStandIdSplit1 = 0;
let dealerStandIdSplit2 = 0;

let playerSplitHand1 = [playersHand[0], produceRandomCard()];
let playerSplitHand2 = [playersHand[1], produceRandomCard()];

const playerSplitTotal1 = totalOfHand(playerSplitHand1);
const playerSplitTotal2 = totalOfHand(playerSplitHand2);

const playersTotal = totalOfHand(playersHand);
const dealersTotal = totalOfHand(dealersHand);

const faceUpCards = dealersHand[1];

module.exports.dealtCard = () =>
  produceRandomCard();

const playerHits1 = () =>
  playersHand.concat(produceRandomCard());

const playerBustAfterHit = (playersHand) => {
  if (playersHand > 21) {
    return 'Player has bust, the dealer wins!';
  }
  return;
};

module.exports.playerHits = () =>
  playerHits1();

module.exports.playersBustAfterHit = () =>
  playerBustAfterHit(playerHits);

module.exports.playerHand = () =>
  `${playersHand[0]} and ${playersHand[1]}. The dealers face up card is ${faceUpCards}. What would you like to do next?`;

module.exports.thePlayerTotal = () =>
  playersTotal;

module.exports.playerStands = () =>
  `You stand with a hand of ${playersHand} and a total of ${playersTotal}`

module.exports.playerStandId = () =>
  playerStandId;

module.exports.playerStandIdSplit1 = () =>
  playerStandIdSplit1;

module.exports.playerStandIdSplit2 = () =>
  playerStandIdSplit2;

module.exports.SplitHand1 = () =>
  playerSplitHand1;

module.exports.SplitHand2 = () =>
  playerSplitHand2;

module.exports.splitTotal1 = () =>
  playerSplitTotal1;

module.exports.splitTotal2 = () =>
  playerSplitTotal2;

module.exports.dealerHand = () =>
  dealersHand;

module.exports.cardsViewableByPlayer = () =>
  faceUpCards;

module.exports.theDealersTotal = () =>
  dealersTotal;

module.exports.dealerStands = () =>
  `The dealer stands, with a hand of ${dealersHand} and a total of ${dealersTotal}`;

module.exports.dealerHasBust = () =>
  `The dealer has bust, with a total of ${dealersTotal}, you win!`

module.exports.dealerStandId = () =>
  dealerStandId;

module.exports.dealerStandIdSplit1 = () =>
  dealerStandIdSplit1;

module.exports.dealerStandIdSplit2 = () =>
    dealerStandIdSplit2;
