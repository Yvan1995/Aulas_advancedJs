'use strict';
/**
 * 
 console.log(document.querySelector('.message').textContent);
 document.querySelector('.message').textContent = 'Correct number!';
 // console.log(document.querySelector('.message').textContent);
 
 document.querySelector('.number').textContent = 15;
 document.querySelector('.score').textContent = 30;
 
 document.querySelector('.guess').value = 23;
 console.log(document.querySelector('.guess').value);
 */

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
// document.querySelector('.number').textContent = secretNumber;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//geralmente campos de entrada(inputs) da interface do usuario, são strings(sempre se atentar a isso)
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  //nessa condição de negação (!guess),caso o valor seja 0, que é um valor falso, o operador de negação o torna 'true',
  //executando assim o bloco if/else
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number ⛔';
    displayMessage('No number ⛔');
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct number!';
    displayMessage('Correct number!!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    //when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? 'Too High!' : 'Too low!';
      // score--;
      displayMessage(guess > secretNumber ? 'Too High!' : 'Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You lose!';
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }

  //   else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too High!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You lose!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   } else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too low!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You lose!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   }
  // });
  /**
 * Coding Challenge #1
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input
fields
4. Also restore the original background color (#222) and number width (15rem)
GOOD LUCK 😀
const btn = document.querySelector('#refresh')

btn.addEventListener('click', () => {
  location.reload()
})// essa alternativa que encontrei funciona muito bem para recarregar a pagina, entretanto isso zera o 'highscore', na vdd isso ocorre 
// pois o jogo é totalmente cliente side, imagino que uma alternativa para esse bloco de codigo funcionar seria a implementação de um pequeno banco de dados.
document.querySelector('.again').addEventListener('click', function () {
  location.reload();
  */
});
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
