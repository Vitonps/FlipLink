const button = document.querySelector('.login__button');

const handleButtonClick = () => {
  window.location = 'pages/game.html';
}

button.addEventListener('click', handleButtonClick);