// Debug version of app.js - adds console logging to help diagnose "Search does nothing"
// IMPORTANT: set your API key on the line below (replace 'YOUR_OPENWEATHERMAP_API_KEY')

const API_KEY = '3bf2227a775a27fdf885a505034a3d70'; // <- put your real key here

// Basic error capture for uncaught errors
window.addEventListener('error', (e) => {
  console.error('Uncaught error:', e.message, 'at', e.filename + ':' + e.lineno);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

console.log('app.js loaded');

// Cached DOM refs
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const message = document.getElementById('message');
const weatherCard = document.getElementById('weather');

const cityNameEl = document.getElementById('cityName');
const descriptionEl = document.getElementById('description');
const iconEl = document.getElementById('icon');
const tempEl = document.getElementById('temp');
const feelsEl = document.getElementById('feels');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

if (!searchBtn) console.error('searchBtn element not found');
if (!cityInput) console.error('cityInput element not found');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  console.log('Search clicked, city=', city);
  if (!city) {
    message.textContent = 'Please type a city name.';
    console.warn('Empty city input');
    return;
  }
  loadWeather(city);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    console.log('Enter pressed in input, triggering search');
    searchBtn.click();
  }
});

async function loadWeather(city) {
  message.textContent = 'Loading...';
  weatherCard.classList.add('hidden');

  try {
    const data = await fetchWeather(city);
    console.log('Weather data received:', data);
    showWeather(data);
    message.textContent = '';
  } catch (err) {
    console.error('loadWeather error:', err);
    message.textContent = err.message || 'Failed to get weather.';
  }
}

async function fetchWeather(city) {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    throw new Error('No API key set. Put your OpenWeatherMap API key in app.js.');
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  console.log('Requesting URL:', url);
  const res = await fetch(url);
  console.log('Fetch response status:', res.status);
  if (!res.ok) {
    if (res.status === 404) throw new Error('City not found. Check spelling.');
    if (res.status === 401) throw new Error('Unauthorized (invalid API key).');
    throw new Error(`Network response was not ok. Status: ${res.status}`);
  }
  return res.json();
}

function showWeather(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys?.country || ''}`;
  const desc = data.weather?.[0]?.description || '';
  descriptionEl.textContent = desc ? desc[0]?.toUpperCase() + desc.slice(1) : '';
  const iconCode = data.weather?.[0]?.icon;
  if (iconCode) {
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.style.display = '';
  } else {
    iconEl.style.display = 'none';
  }

  tempEl.textContent = Math.round(data.main.temp);
  feelsEl.textContent = Math.round(data.main.feels_like);
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = (data.wind.speed || 0).toFixed(1);

  weatherCard.classList.remove('hidden');
  console.log('showWeather rendered');
}
