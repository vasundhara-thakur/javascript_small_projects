let cityInputEL = document.querySelector('#cityInput');
let searchBtnEL = document.querySelector('#searchBtn');
let loadingEl = document.querySelector('#loading');
let errorEl = document.querySelector('#error');
let weatherCardEl = document.querySelector('.weather-card');
let cityNameEl = document.querySelector('#cityName');
let countryEl = document.querySelector('#country');
let tempEl = document.querySelector('#temp');
let humidityEl = document.querySelector('#humidity');
let conditionEl = document.querySelector('#condition');
let sunEl = document.querySelector('.sun');

async function weatherFetch(city) {
    const myKey = "bee21bcb40eee19046561a80dda06f75";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            return { error: true };
        }

        return { response, data };

    } catch (err) {
        return { error: true };
    }
}

async function searchWeather() {
    
    const city = cityInputEL.value.trim();

    if (city === "" || !isNaN(city)) {
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

    const { response, data } = await weatherFetch(city);
    console.log(data)

    loadingAnim.kill();
    loadingEl.style.display = "none";

    /* ✅ Only correction: Proper error handling */
    if (!data || data.cod != 200) {
        errorEl.classList.remove("hidden");
        errorEl.textContent = `${city} is not a city name`;
        return;
    }

    if (data.name.toLowerCase() !== city.toLowerCase()) {
    errorEl.classList.remove("hidden");
    errorEl.textContent = `${city} is not a valid city`;
    return;
}
    /* ✅ End correction */

    weatherCardEl.classList.remove("hidden");
    cityNameEl.textContent = `City: ${data.name}`;
    countryEl.textContent = `${data.sys.country}`
    tempEl.textContent = `${data.main.temp}`;
    humidityEl.textContent = `${data.main.humidity}`;
    conditionEl.textContent = `${data.weather[0].description}`;
    cityInputEL.value = "";

    gsap.fromTo(weatherCardEl, { opacity: 0, y: 50 },{ opacity: 1, y: 0, duration: 1, ease: "power2.out" });
    gsap.fromTo(tempEl,{ scale: 0 },{ scale: 1, duration: 0.5, ease: "back.out(1.7)" });
    gsap.fromTo(conditionEl, { opacity: 0 },{ opacity: 1, duration: 1, delay: 0.5 });

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
