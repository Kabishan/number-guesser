const UIgame = document.getElementById('game'),
  UISelect = document.getElementById('select'),
  UIInst = document.getElementById('inst'),
  UIInput = document.getElementById('guess-input'),
  UISelMin = document.getElementById('min'),
  UISelMax = document.getElementById('max'),
  UISelBtn = document.getElementById('sel-btn'),
  UIBtn = document.getElementById('guess-btn'),
  UIMin = document.querySelector('.min-num'),
  UIMax = document.querySelector('.max-num'),
  message = document.querySelector('.message');

UISelBtn.addEventListener('click', prePlay);

var min, max, num, guessesLeft;

function prePlay() {
  min = parseInt(UISelMin.value);
  max = parseInt(UISelMax.value);

  if (!isNaN(min) && !isNaN(max) && min < max) {
    UISelect.style.display = 'none';
    UISelMin.style.display = 'none';
    UISelMax.style.display = 'none';
    UISelBtn.style.display = 'none';

    UIInst.style.display = 'block';
    UIInput.style.display = 'inline';
    UIBtn.style.display = 'inline';

    /* Clear message in case invalid 
    boundaries were entered previously */
    message.textContent = '';
  } else {
    setMessage(`Please enter a valid boundaries.`, 'red');
  }

  UIMin.textContent = min;
  UIMax.textContent = max;
  num = getNum(min, max);
  guessesLeft = 3;
}

game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

UIBtn.addEventListener('click', gamePlay);

function gamePlay() {
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

  UIBtn.value = 'Play Again';
  UIBtn.className += 'play-again';
}

function getNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
