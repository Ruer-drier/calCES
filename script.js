const display = document.getElementById("display");
const errorDiv = document.getElementById("error");

function appendToDisplay(input) {
  if (input === '.' && display.value.slice(-1) === '.') return;
  if (['+', '-', '×', '÷'].includes(input) && display.value === '') return;
  if (['+', '-', '×', '÷'].includes(input) && ['+', '-', '×', '÷'].includes(display.value.slice(-1))) return;
  display.value += input;
  errorDiv.textContent = "";
}

function calculate() {
  try {
    let expression = display.value
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/%/g, '*0.01');

    if (/\/0(?!\d)/.test(expression)) throw new Error("Cannot divide by zero");

    display.value = eval(expression);
    errorDiv.textContent = "";
  } catch (error) {
    display.value = "";
    errorDiv.textContent = error.message === "Cannot divide by zero" ? error.message : "Syntax error";
  }
}

document.getElementById("clear").addEventListener("click", () => display.value = "");
document.getElementById("del").addEventListener("click", () => display.value = display.value.slice(0, -1));
document.getElementById("themeToggle").addEventListener("click", () => document.body.classList.toggle("dark-mode"));

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%', 'Enter', 'Backspace', 'Delete'].includes(key)) {
    event.preventDefault();
    if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      display.value = display.value.slice(0, -1);
    } else if (key === 'Delete') {
      display.value = '';
    } else {
      appendToDisplay(key.replace('*', '×').replace('/', '÷'));
    }
  }
});
