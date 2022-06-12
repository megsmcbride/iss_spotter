const request = require('request-promise-native');


const fetchMyIP = () => {
  return request('https://api64.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyoverTime = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(` https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyoverTime)
    .then((data) => {
      const { response } = JSON.parse(data);
      console.log(response)
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };