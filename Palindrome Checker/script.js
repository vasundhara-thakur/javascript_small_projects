document.getElementById("check-btn").addEventListener("click", () => {
    let userInput = document.getElementById("text-input").value;
    let result = document.getElementById("result");


    const cleanTxt = userInput.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reverseTxt = cleanTxt.split("").reverse("").join("");

    if(userInput === ""){
        result.textContent = "Please enter a word or phrase";
        
    }
    else if(cleanTxt === reverseTxt){
        result.textContent = `✅ ${userInput} is a palindrome.`;
        result.style.color = "green";
    }
    else{
        result.textContent = `❌ ${userInput} is not a palindrome.`;
        result.style.color = "red";
    }

    
})