let cityInputEL = document.querySelector('#cityInput');
let searchBtnEL = document.querySelector('#searchBtn');
let loadingEl = document.querySelector('#loading');
let errorEl = document.querySelector('#error');
let weatherCardEl = document.querySelector('.weather-card');
let cityNameEl = document.querySelector('#cityName');
let tempEl = document.querySelector('#temp');
let humidityEl = document.querySelector('#humidity');
let conditionEl = document.querySelector('#condition');
let sunEl = document.querySelector('.sun');

async function weatherFatch(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bee21bcb40eee19046561a80dda06f75&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return { response, data };
    } catch (error) {
        console.log("Error fetching API", error);
    }
}


async function searchWeather() {
    const city = cityInputEL.value.trim();

    if (city === "") {
        errorEl.classList.remove("hidden");
        errorEl.textContent = "Please enter a city";
        return;
    }


    loadingEl.style.display = "inline-block";
    errorEl.textContent = "";
    weatherCardEl.classList.add("hidden");

    const loadingAnim = gsap.to(loadingEl, {
        rotation: 360,
        repeat: -1,
        duration: 1,
        ease: "linear"
    });

    const { response, data } = await weatherFatch(city);

    loadingAnim.kill();
    loadingEl.style.display = "none";

    if (!response.ok) {
        errorEl.classList.remove("hidden");
        errorEl.textContent = "City not found";
        return;
    }

    weatherCardEl.classList.remove("hidden");
    cityNameEl.textContent = `City: ${data.name}`;
    tempEl.textContent = `${data.main.temp}`;
    humidityEl.textContent = `${data.main.humidity}`;
    conditionEl.textContent = `${data.weather[0].description}`;
    cityInputEL.value = "";

    gsap.fromTo(weatherCardEl,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(tempEl,
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    gsap.fromTo(conditionEl,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.5 }
    );

    gsap.to(".sun", {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut"
    });
}

searchBtnEL.addEventListener("click", searchWeather);

cityInputEL.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchWeather();
    }
});


sunEl.addEventListener("click", () => {
    const body = document.body;

    if(body.classList.contains("dark")){
        body.classList.remove("dark");
        sunEl.style.boxShadow = " 0 5px 60px rgb(255, 68, 0)";
        sunEl.style.background = "radial-gradient(yellow, orange, red)";
    } else {
        body.classList.add("dark");
        sunEl.style.background = "radial-gradient(rgba(161, 159, 159, 1), rgba(110, 109, 109, 1), rgba(41, 40, 40, 1))";
        sunEl.style.boxShadow = "0 5px 60px rgb(24, 24, 24)";
    }
});
