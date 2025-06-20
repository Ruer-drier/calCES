const display = document.getElementById("display");
function appendToDisplay(input){
    display.value += input;
}
function calculate(){
    try{
       display.value = eval(display.value) 
    } catch(error) {
        display.value="Syntax error";
    }
}
const clear = document.getElementById("clear")
clear.addEventListener("click", function(e){
    display.value = ""
})
console.log("Hello world")