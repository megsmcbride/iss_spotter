const request = require('request');


const fetchMyIP = (callback => {
  const url = 'https://api64.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    console.log(ip);
    if (ip === undefined) callback("ip not found");
    if (ip) callback(null, ip);

  });

});

const fetchCoordsByIP = ((ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
});

const fetchISSFlyoverTime = ((retrievedCoor, callback) => {
  console.log("coordinates", retrievedCoor.latitude, retrievedCoor.longitude);
  const url = ` https://iss-pass.herokuapp.com/json/?lat=${retrievedCoor.latitude}&lon=${retrievedCoor.latitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
});

const nextISSTimesForMyLocations = (callback => {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) return callback(error, null);
      fetchISSFlyoverTime(coordinates, (error, passTimes) => {
        if (error) return callback(error, null);
        callback(null, passTimes);
      });
    });
  });
});

module.exports = { nextISSTimesForMyLocations };




