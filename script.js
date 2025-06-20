const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function calculate(){
    try {
        // Check if the expression contains a division by zero
        if (display.value.includes('÷') || display.value.includes('/')) {
            let parts = display.value.split(/[\÷\/]/); // Split by ÷ or /
            if (parts.length > 1 && parseFloat(parts[1]) === 0) {
                throw new Error("Cannot divide by zero");
            }
        }
        
        // Evaluate the expression safely
        display.value = eval(display.value);
    } catch (error) {
        if (error.message === "Cannot divide by zero") {
            display.value = "Cannot divide by zero"; // Show a specific message for divide by zero
        } else {
            display.value = "Syntax error"; // General syntax error
        }
    }
}

const clear = document.getElementById("clear");
clear.addEventListener("click", function(e){
    display.value = "";
});

// Add backspace functionality to the "Del" button
const del = document.getElementById("del");
del.addEventListener("click", function(e){
    display.value = display.value.slice(0, -1); // Remove the last character
});

console.log("Hello world");
