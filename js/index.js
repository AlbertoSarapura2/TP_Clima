const url =
  "https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo ";

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((dataJSON) => {
    if (dataJSON.cod === "404") {
      showError("Ciudad no encontrada");
      return;
    }
    showWeather(dataJSON);

  });

  function showWeather(data) {
    const { longitude, latitude, timezone, daily, time } = data;
    const { temperature_2m, apparent_temperature, precipitation, windspeed_10m } =
      data.hourly;

    let fecha = moment().startOf("hour").format("YYYY-MM-DDTHH:mm");

    let posicion = getBuscarPosicion(data, fecha);

    let day = document.getElementById("day");
    day.innerHTML = `
      <b>${(data.hourly.time[posicion] = moment().format("LL"))}</b>
    `;

  let temperatura = document.getElementById("temperatura");

    temperatura.innerHTML = `
          <b>${data.hourly.temperature_2m[posicion]}°C</b>
      `;

   let valor = data.hourly.precipitation[posicion];

    let imagen = document.getElementById("imagen");
  if (valor < 1) {
      imagen.innerHTML = `
      <img src="https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/clear-day.svg" alt="" height="128" width="128">
    `;
      console.log("Soleado");
    } else if (valor < 2 && valor > 1) {
      imagen.innerHTML = `
    <img src="https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/hail.svg" alt="" height="128" width="128">
  `;
    }
    let precipitacion = document.getElementById("precipitacion");
    precipitacion.innerHTML = `
          <b>${data.hourly.precipitation[posicion]}mm</b>
      `;
  let viento = document.getElementById("viento");
    viento.innerHTML = `
          <b>${data.hourly.windspeed_10m[posicion]}km</b>
      `;

let tabla =document.getElementById("tabla");
for (let i = 0; i < data.hourly.time.length; i++) {
    data.hourly.time[i];
tabla.innerHTML= `<table class="table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>temperatura °C</th>
                                <th>precipitacion</th>
                                <th>Viento</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td style="color:white";>${data.hourly.time[posicion]}</td>
                                    <td style="color:white";>${data.hourly.temperature_2m[posicion]}°C</td>
                                    <td style="color:white";>${data.hourly.precipitation[posicion]} mm/h</td>
                                    <td style="color:white";>${data.hourly.windspeed_10m[posicion]} Km/h</td>
                                </tr>
                            </tbody>
                    </table>`;
    }
    
  }
  function getBuscarPosicion(data, fecha) {
    let pos = 0;
    let hora;
  for (i = 0; i < data.hourly.time.length; i++) {
      hora = data.hourly.time[i];
      if (hora == fecha) {
        pos = i;
      }
    }
    return pos;
  }
function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    
    var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}