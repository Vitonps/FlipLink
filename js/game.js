const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'Cachorro',
  'Gato',
  'Coruja',
  'Passaro',
  'Casa',
  'Arvore',
  'Carro',
  'Sol',
  'Lua',
  'Dinossauro',
  'Maca',
  'Vaca',
  
];

let firstCard = null;
let secondCard = null;
let canFlip = true;
let pairsCounter = 0;

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 24 && pairsCounter === 12) {
    clearInterval(this.loop);
    alert(`Parabéns! Você acertou todos os pares!`);
    redirectToIndex();
  }
};

const redirectToIndex = () => {
  window.location.href = '../index.html';
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.classList.add('disabled-card');
    secondCard.classList.add('disabled-card');
    firstCard = null;
    secondCard = null;
    canFlip = true; // Habilitar cliques novamente

    // Atualizar o contador de pares acertados
    pairsCounter++;
    document.querySelector('.pairs-counter').innerHTML = `Pares Acertados: ${pairsCounter}`;

    // Verificar se todas as cartas foram viradas após desabilitar um par
    if (pairsCounter === 10) {
      checkEndGame();
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = null;
      secondCard = null;
      canFlip = true; // Habilitar cliques novamente
    }, 500);
  }
};

const revealCard = (card, character) => {
  if (!canFlip || card.classList.contains('reveal-card') || card.classList.contains('disabled-card')) return;

  card.classList.add('reveal-card');
  
  const audio = new Audio(`../sounds/${character}.mp3`);
  audio.play();

  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    canFlip = false; // Desabilitar cliques enquanto verifica as cartas
    setTimeout(() => {
      checkCards();
    }, 500);
  }

  // Verificar se todas as cartas foram viradas após virar uma carta
  setTimeout(() => {
    checkEndGame();
  }, 1000);
};

const createCard = (character) => {
  const card = document.createElement('div');
  card.className = 'card';
  const front = document.createElement('div');
  front.className = 'face front';
  front.style.backgroundImage = `url('../images/${character}.svg')`;
  const back = document.createElement('div');
  back.className = 'face back';

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', () => {
    revealCard(card, character);
  });

  card.setAttribute('data-character', character);

  return card;
};



const loadGame = () => {
  const shuffledCharacters = shuffle(characters).slice(0, 20); // Embaralhar os personagens e limitar a 10 cartas
  const shuffledCards = shuffledCharacters.flatMap(character => [createCard(character), createCard(character)]);

  const shuffledIndexes = shuffle(Array.from(Array(shuffledCards.length).keys()));

  shuffledIndexes.forEach(index => {
    grid.appendChild(shuffledCards[index]);
  });
};

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

const restartGame = () => {
  clearInterval(this.loop);
  grid.innerHTML = '';
  pairsCounter = 0;
  document.querySelector('.pairs-counter').innerHTML = 'Pares Acertados: 0'; // Resetar o contador no HTML
  loadGame();
  timer.innerHTML = '0';
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();

  const restartButton = document.querySelector('#restart-button');
  restartButton.addEventListener('click', restartGame);
};

const redirectToHome = () => {
  window.location.href = '../index.html';
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();

  const restartButton = document.querySelector('#restart-button');
  restartButton.addEventListener('click', restartGame);

  const homeButton = document.querySelector('#home-button');
  homeButton.addEventListener('click', redirectToHome);
};
