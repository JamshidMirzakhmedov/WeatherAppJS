"use strict";
const api = {
  key: "37da2de9de37d2f31b5fcb0cbc814635",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  let icon = document.querySelector("img");
  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  console.log(icon);
  let weatherEi = document.querySelector(".weatherDescr");
  weatherEi.innerHTML = weather.weather[0].main;
  let highLow = document.querySelector(".high-low");
  highLow.innerHTML = `${Math.round(
    weather.main.temp_min
  )} <span>°c</span> / ${Math.round(weather.main.temp_max)}<span>°C</span>`;
}

function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
