const startPage        = document.querySelector('#ty-start-page');
const typingGame       = document.querySelector('#ty-game');
const titleTime        = document.querySelector('#ty-title-time');
const timer            = document.querySelector('#ty-timer');
const timeSelectEl     = document.querySelector('.ty-time-select');
const typing           = document.querySelector('#typing');
const backToStart      = document.querySelector('#ty-back-to-start');
const resultContainer  = document.querySelector('#ty-result-container');
const textarea         = document.querySelector('#ty-textarea');
const quote            = document.querySelector('#ty-quote');
const author           = document.querySelector('#ty-author-name');

// 制限時間
let timelimit = 30;
// 残り時間
let remainingTime;
let isActive   = false;
let isPlaying  = false;
let intervalId = null;
let quotes;

timeSelectEl.addEventListener('change', () => {
  // 選択が変わるごとにタイムリミットの値が変わる
  timelimit = timeSelectEl.value;
})

window.addEventListener('keypress', e => {
  isActive = typing.classList.contains('active');

  // ENTERキーが押されたらゲームを開始
  if(e.key === 'Enter' && isActive && !isPlaying) {
    start();
    isActive  = false;
    isPlaying = true;
  }
  return;
})

function start() {

  startPage.classList.remove('show');
  typingGame.classList.add('show');

  titleTime.textContent = timelimit;
  remainingTime         = timelimit
  timer.textContent     = remainingTime;

  await fetchAndRenderQuotes();
  textarea.focus();
  textarea.disabled = false;

  intervalId = setInterval(() => {
    remainingTime -= 1;
    timer.textContent = remainingTime;
    if(remainingTime <= 0) {
      showResult();
    }
  }, 1000)
}

backToStart.addEventListener('click', () => {
  typingGame.classList.remove('show');
  startPage.classList.add('show');
  resultContainer.classList.remove('show');
  isPlaying = false;
})

function showResult() {
  textarea.disabled = true
  clearInterval(intervalId);
  setTimeout(() => {
    resultContainer.classList.add('show')
  }, 1000)
}

async function fetchAndRenderQuotes() {
  const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
  const responce = await fetch(RANDOM_QUOTE_API_URL);
  const data     = await responce.json();
  console.log(responce);
  console.log(data);

  quotes = { quote: data.content, author: data.author};
  console.log(quotes);

  quotes.quote.split('').forEach(letter => {
    const span = document.cleateElement('span');
    span.textContent = letter;
    quote.appendChild(span);
  }) 
  author.textContent = quotes.author;
  console.log(quote);
  console.log(author);
}

textarea.addEventListener('input', () => {
  let inputArray = textarea.value.split('');
  let spans      = quote.querySelectorAll('span');

  inputArray.forEach((letter, index) => {
    if(letter === spans[index].textContent) {
      spans[index].classList.add('correct');
    } else {
      spans[index].classList.add('wrong');
      if(spans[index].textContent === '') {
        spans[index].classList.add('bar');
      }
    }
  })
})