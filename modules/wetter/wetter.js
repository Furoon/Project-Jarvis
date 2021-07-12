var loaded = new Function(console.log("module wetter was loaded"));

// TODO: Abrufen von tagesaktueller Wetterdaten
// TODO: Bereitstellen der Daten
// TODO: speichern der Daten

const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();

  console.log(respData);

  addWeatherToPage(respData);
}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

module.exports;
