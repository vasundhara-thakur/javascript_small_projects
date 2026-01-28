const body = document.body;

body.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const random = Math.floor(Math.random() *100);
    console.log(random);
    let spanEl = document.createElement("span");
    spanEl.style.left = x + "px";
    spanEl.style.top = y + "px";
    spanEl.style.height = random + "px";
    spanEl.style.width = random + "px";
    body.appendChild(spanEl);

    setTimeout(() => {
        spanEl.remove();
    }, 3000);
})
