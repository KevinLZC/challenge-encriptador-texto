// Selección de elementos del DOM
const btnEncrypt = document.getElementById('encrypt');
const btnDecrypt = document.getElementById('decrypt');
let processedText = null;

const letterEquivalence = {
  "e": "enter",
  "i": "imes",
  "a": "ai",
  "o": "ober",
  "u": "ufat"
};

function createMessageElements() {
  const messageResult = document.getElementById('output');

  const img = document.createElement('img');
  img.src = 'public/doll.png';
  img.alt = 'Imagen de una persona examinando un diamante';

  const h2 = document.createElement('h2');
  h2.textContent = 'Ningún mensaje fue encontrado';

  const p = document.createElement('p');
  p.textContent = 'Ingresa el texto que desees encriptar o desencriptar.';
  p.style.fontSize = '16px';

  messageResult.innerHTML = ''; 
  messageResult.appendChild(img);
  messageResult.appendChild(h2);
  messageResult.appendChild(p);
  messageResult.style.justifyContent = 'center';
}

function setMessageOutput() {
  const messageResult = document.getElementById('output');
  if (processedText === null) {
    createMessageElements();
  } else {
    messageResult.innerHTML = '';
    messageResult.style.justifyContent = 'space-between';
    messageResult.style.alignItems = 'start';
    messageResult.style.textAlign = 'left';
    messageResult.style.fontSize = '24px';

    const p = document.createElement('p');
    p.textContent = processedText;
    messageResult.appendChild(p);

    const btnCopy = document.createElement('button');
    btnCopy.textContent = 'Copiar';
    btnCopy.id = 'copy';
    btnCopy.className = 'decrypt';
    btnCopy.addEventListener('click', copyText);
    messageResult.appendChild(btnCopy);
  }
}

function copyText() {
  const text = document.querySelector('#output p').textContent;
  navigator.clipboard.writeText(text)
    .then(() => {
      const btnCopy = document.getElementById('copy');
      btnCopy.textContent = 'Copiado!';
      btnCopy.classList.add('copied');
      setTimeout(() => {
        btnCopy.classList.remove('copied');
        btnCopy.textContent = 'Copiar';
      }, 1500);
    })
    .catch(err => console.error('Error al copiar el texto: ', err));
}

function encrypt(text) {
  return text.split('').map(letter => letterEquivalence[letter] || letter).join('');
}

function decrypt(text) {
  return text.replace(/enter/g, 'e')
    .replace(/imes/g, 'i')
    .replace(/ai/g, 'a')
    .replace(/ober/g, 'o')
    .replace(/ufat/g, 'u');
}

btnEncrypt.addEventListener('click', () => {
  const text = document.getElementById('text').value;
  if (text.trim() === '') {
    processedText = null;
  } else {
    processedText = encrypt(text);
  }
  setMessageOutput();
});

btnDecrypt.addEventListener('click', () => {
  const text = document.getElementById('text').value;
  if(text.trim() === '') {
    processedText = null;
  } else {
    processedText = decrypt(text);
  }
  setMessageOutput();
});

setMessageOutput();