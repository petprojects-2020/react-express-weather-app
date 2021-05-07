const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/cities', (req, res) => {
  const city = req.query.cityName;
  axios.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=b5e209e1901bfaaab9cdbef5ec123106`)
  .then(response => {
    res.send(response.data);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.get('/api/cityId', (req, res) => {
  const cityId = req.query.cityId;
  axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&lang=ru&exclude=minutely,daily,alerts&units=metric&appid=b5e209e1901bfaaab9cdbef5ec123106`)
  .then(response => {
    res.send(response.data);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.get('/api/cityCoord', (req, res) => {
  const cityLat = req.query.cityLat;
  const cityLon = req.query.cityLon;
  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&lang=ru&exclude=minutely,daily,alerts&units=metric&appid=b5e209e1901bfaaab9cdbef5ec123106`)
  .then(response => {
    res.send(response.data);
  })
  .catch((err) => {
    res.send(err);
  });
});

app.listen(port, () => console.log(`Server has started on port ${port}`));