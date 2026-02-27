const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");
const cityTags = document.querySelectorAll(".city-tag");

const indianCities = [
  "Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad","Chennai","Kolkata",
  "Surat","Pune","Jaipur","Lucknow","Kanpur","Nagpur","Indore","Thane","Bhopal",
  "Visakhapatnam","Pimpri-Chinchwad","Patna","Vadodara","Ghaziabad","Ludhiana",
  "Agra","Nashik","Faridabad","Meerut","Rajkot","Kalyan-Dombivali","Vasai-Virar",
  "Varanasi","Srinagar","Aurangabad","Dhanbad","Amritsar","Navi Mumbai",
  "Allahabad","Ranchi","Howrah","Coimbatore","Jabalpur","Gwalior","Vijayawada",
  "Jodhpur","Madurai","Raipur","Kota","Chandigarh","Guwahati","Solapur",
  "Hubli-Dharwad","Mysore","Tiruchirappalli","Bareilly","Aligarh","Tiruppur",
  "Moradabad","Jalandhar","Bhubaneswar","Salem","Warangal","Guntur","Bhiwandi",
  "Saharanpur","Gorakhpur","Bikaner","Amravati","Noida","Jamshedpur","Bhilai",
  "Cuttack","Firozabad","Kochi","Nellore","Bhavnagar","Dehradun","Durgapur",
  "Asansol","Rourkela","Nanded","Kolhapur","Ajmer","Akola","Gulbarga","Jamnagar",
  "Ujjain","Loni","Siliguri","Jhansi","Ulhasnagar","Jammu",
  "Sangli-Miraj & Kupwad","Mangalore","Erode","Belgaum","Ambattur",
  "Tirunelveli","Malegaon","Gaya","Jalgaon","Udaipur","Maheshtala"
];

const weatherIcons = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Haze: "🌫️",
  Mist: "🌫️",
  Fog: "🌁"
};

const weatherConditions = Object.keys(weatherIcons);

function getCurrentDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function generateWeather(city) {
  const condition =
    weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  const temp = Math.floor(Math.random() * 24) + 15;

  return {
    name: city,
    main: {
      temp,
      feels_like: temp + Math.floor(Math.random() * 5 - 2),
      humidity: Math.floor(Math.random() * 66) + 30,
      pressure: Math.floor(Math.random() * 41) + 990
    },
    weather: [{ main: condition }],
    wind: { speed: (Math.random() * 25 + 5).toFixed(1) },
    visibility: (Math.random() * 8 + 2) * 1000
  };
}

async function getWeather(city) {
  loading.classList.add("active");
  weatherCard.classList.remove("active");
  errorMsg.classList.remove("active");

  await new Promise((r) => setTimeout(r, 800));

  const isValidCity = indianCities.some(
    (c) => c.toLowerCase() === city.toLowerCase()
  );

  if (!isValidCity) {
    showError("City not found. Please enter a valid Indian city name.");
    loading.classList.remove("active");
    return;
  }

  displayWeather(generateWeather(city));
  loading.classList.remove("active");
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("currentDate").textContent = getCurrentDate();
  document.getElementById("temperature").textContent = Math.round(data.main.temp);
  document.getElementById("feelsLike").textContent = Math.round(data.main.feels_like);
  document.getElementById("condition").textContent = data.weather[0].main;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("windSpeed").textContent = data.wind.speed;
  document.getElementById("pressure").textContent = data.main.pressure;
  document.getElementById("visibility").textContent = (data.visibility / 1000).toFixed(1);
  document.getElementById("weatherIcon").textContent =
    weatherIcons[data.weather[0].main] || "🌤️";

  weatherCard.classList.add("active");
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add("active");
  weatherCard.classList.remove("active");
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  city ? getWeather(city) : showError("Please enter a city name");
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

cityTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    const city = tag.dataset.city;
    cityInput.value = city;
    getWeather(city);
  });
});

window.addEventListener("load", () => getWeather("Mumbai"));