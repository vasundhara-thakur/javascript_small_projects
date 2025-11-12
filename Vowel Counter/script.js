let textInput = document.getElementById("text-input");
let result = document.getElementById("result");
let arr = ['a', 'e', 'i', 'o', 'u'];

function counter() {
    let input = textInput.value.toLowerCase();

    if(input === ""){
        result.textContent = "Please write something.";
    }
    else{
        let count = 0;
        for(let char of input){
            
            if(arr.includes(char)){
                count++;
            }
        }
        result.textContent = `Total Vowels: ${count}`;
        input.textContent = "";
    }
}