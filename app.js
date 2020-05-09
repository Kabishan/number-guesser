let min = 1,
  max = 10,
  num = 2,
  guessesLeft = 3;

const UIgame = document.getElementById('game'),
  UIInput = document.getElementById('guess-input'),
  UIBtn = document.getElementById('guess-btn'),
  UImin = document.querySelector('.min-num'),
  UImax = document.querySelector('.max-num'),
  message = document.querySelector('.message');

UImin.textContent = min;
UImax.textContent = max;

UIBtn.addEventListener('click', validator);

function validator() {
  let guess = parseInt(UIInput.value);

  if (isNaN(guess) || guess < min || guess > max)
    setMessage(`Please enter a value between ${min} and ${max}.`, 'red');
  else {
    if (guess === num)
      gameOver(true, `${num} is correct! Congrats...`, 'green');
    else {
      guessesLeft--;
      if (guessesLeft === 0)
        gameOver(false, `You lost, the number was ${num}.`);
      else {
        UIInput.style.borderColor = 'red';
        UIInput.value = '';
        setMessage(
          `${guess} is incorrect, you have ${guessesLeft} guesses left.`,
          'red'
        );
      }
    }
  }
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  UIInput.disabled = true;
  UIInput.style.borderColor = color;

  setMessage(msg, color);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
