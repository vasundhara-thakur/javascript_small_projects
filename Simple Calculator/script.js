let display = document.getElementById("display");
 display.innerText = "0";

function appendValue(val){
    if(display.innerText === "0") {
        display.innerText = val;
        
    }
    else{
        display.innerText += val;
    }
}

function calculateResult() {
    try {
        display.innerText = eval(display.innerText);
    } catch (error) {
        display.innerText = 'Error';
    }
}

function clearValue(){
    display.innerText = display.innerText.slice(0, -1);
    
    if(display.innerText === ""){
        display.innerText = "0";
    }
}

function clearDisplay() {
    display.innerText = 0;
}