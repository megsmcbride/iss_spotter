// requires and runs out main fetch function

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTime } = require('./iss');
const retrievedIP = '174.119.130.207';
const retrievedCoor =  { latitude: '45.44422912597656', longitude: '-75.69277954101562' };

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log("It worked! Returned IP: ", ip);
});


fetchCoordsByIP(retrievedIP, (err, coordinates) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log("It worked! Returned coordinates: ", coordinates);
});

fetchISSFlyoverTime(retrievedCoor, (err, passTimes) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log("It worked! Returned coordinates: ", passTimes);
});