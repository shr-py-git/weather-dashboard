```markdown
# Weather Dashboard

A tiny weather dashboard that fetches current weather from OpenWeatherMap and shows temperature, description, and icon.

## How to get an API key (OpenWeatherMap)
1. Go to https://openweathermap.org/ and sign up (free plan is fine).
2. After signing in, go to "API keys" and create/copy your key.

## Setup (very simple)
1. Put the project files in a folder (e.g., `weather-dashboard`).
2. Open `app.js` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your API key.

## Run locally
It's best to run via a local static server to avoid any browser local-file fetch issues.

- If you have Python 3:
  - Open a terminal in the project folder and run:
    - `python3 -m http.server 8000`
  - Open: `http://localhost:8000` in your browser.

- Or you can just open `index.html` in your browser (may work, but server is recommended).

## Git / GitHub (optional)
If you want to upload this project to GitHub:

1. Create a new repository on GitHub (e.g., `weather-dashboard`) — do NOT initialize with a README (you already have one).
2. In your terminal inside the project folder run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/weather-dashboard.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

Note: avoid committing your API key to a public repository. If you must publish the code publicly, use environment variables or a server-side proxy and keep the key secret.

## Improvements you can add later
- Search history list
- Forecast for 5 days (OpenWeatherMap has a forecast API)
- Use a small build tool or framework (React, Vue) if you want to expand
- Save and load favorite cities
```"# weather-dashboard" 
