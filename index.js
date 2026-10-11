const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function clearCalculator() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function appendNumber(value) {
  if (shouldResetDisplay) {
    currentValue = value;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === '0' ? value : currentValue + value;
  }

  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

function deleteLastCharacter() {
  if (shouldResetDisplay) {
    currentValue = '0';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
  updateDisplay();
}

function setOperator(nextOperator) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }

  previousValue = currentValue;
  operator = nextOperator;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || previousValue === null) return;

  const a = Number(previousValue);
  const b = Number(currentValue);
  let result;

  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = b === 0 ? 'Error' : a / b;
      break;
    default:
      return;
  }

  currentValue = String(result);
  previousValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

buttons.forEach((button) => {
  const { action, value } = button.dataset;

  button.addEventListener('click', () => {
    if (button.classList.contains('number')) {
      appendNumber(value);
    }

    if (button.classList.contains('operator')) {
      setOperator(value);
    }

    if (button.classList.contains('decimal')) {
      appendDecimal();
    }

    if (action === 'clear') {
      clearCalculator();
    }

    if (action === 'delete') {
      deleteLastCharacter();
    }

    if (action === 'equals') {
      calculate();
    }
  });
});

updateDisplay();
