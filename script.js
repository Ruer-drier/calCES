// JavaScript enhancements
const display = document.getElementById("display");

function appendToDisplay(input) {
  // Prevent multiple decimal points
  if (input === '.' && display.value.includes('.')) {
    return;
  }
  // Prevent consecutive operators
  if (['+', '-', '*', '/'].includes(input) && ['+', '-', '*', '/'].includes(display.value.slice(-1))) {
    return;
  }
  display.value += input;
}

function calculate() {
  try {
    let expression = display.value.replace('÷', '/').replace('×', '*');
    // Check for division by zero
    if (expression.includes('/')) {
      let parts = expression.split('/');
      if (parts.length > 1 && parseFloat(parts[1]) === 0) {
        throw new Error("Cannot divide by zero");
      }
    }
    // Evaluate the expression safely
    display.value = eval(expression);
  } catch (error) {
    if (error.message === "Cannot divide by zero") {
      display.value = "Cannot divide by zero";
    } else {
      display.value = "Syntax error";
    }
  }
}

const clear = document.getElementById("clear");
clear.addEventListener("click", function(e) {
  display.value = "";
});

const del = document.getElementById("del");
del.addEventListener("click", function(e) {
  display.value = display.value.slice(0, -1);
});