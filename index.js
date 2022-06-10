// requires and runs out main fetch function

const { nextISSTimesForMyLocations } = require('./iss');
const retrievedIP = '174.119.130.207';
const retrievedCoor = { latitude: '45.44422912597656', longitude: '-75.69277954101562' };

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);
// });


// fetchCoordsByIP(retrievedIP, (err, coordinates) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log("It worked! Returned coordinates: ", coordinates);
// });

// fetchISSFlyoverTime(retrievedCoor, (err, passTimes) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }
//   console.log("It worked! Returned coordinates: ", passTimes);
// });

const printPassTimes = (passTimes => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration}`);
  }
});

nextISSTimesForMyLocations((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  printPassTimes(passTimes);
});