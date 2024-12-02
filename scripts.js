const cards = document.querySelectorAll('.memory-card');   //A constante cards armazena uma NodeList de todos os elementos HTML que possuem a classe .memory-card.

var hasFlippedCard = false;   //hasFlippedCard: Controla se o jogador já virou uma carta.
var lockBoard = false;        //lockBoard: Evita que o jogador clique em outras cartas enquanto o jogo processa um movimento.
var firstCard, secondCard;   //firstCard e secondCard: Armazenam as duas cartas que o jogador virou para comparar.



function flipCard() {
  if (lockBoard) return;               // Impede virar mais cartas enquanto o tabuleiro está bloqueado.
  if (this === firstCard) return;     // Impede clicar duas vezes na mesma carta.

  this.classList.add('flip'); // Adiciona a classe 'flip', que geralmente aplica um estilo para mostrar o verso da carta.

  if (!hasFlippedCard) {
    hasFlippedCard = true;   // Armazena a primeira carta virada.
    firstCard = this;

    return;
  }

  secondCard = this;     // Armazena a segunda carta.
  checkForMatch();    // Verifica se as cartas combinam.
}

                     //Compara os valores armazenados no atributo data-framework das duas cartas viradas.
function checkForMatch() {
  var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();  //Se combinarem (isMatch): Chama disableCards para desativar as cartas.
}                                              //Se não combinarem: Chama unflipCards para desvirar as cartas

function disableCards() {
  firstCard.removeEventListener('click', flipCard);   //Remove o evento de clique das cartas combinadas para que elas permaneçam viradas.
  secondCard.removeEventListener('click', flipCard);

  resetBoard();    //Chama resetBoard para preparar para o próximo movimento.
}

function unflipCards() {
  lockBoard = true;           // Bloqueia o tabuleiro enquanto as cartas são desviradas

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);           //vira as cartas após um pequeno atraso (1,5 segundos).
}


                      //Reseta as variáveis globais para o próximo movimento.
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


       // Função shuffle (embaralhar)
(function shuffle() {
  cards.forEach(card => {
    var randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));