const moment = require('moment');

const now = moment();

console.log("Now", now);
console.log("Now.month()", now.month());
console.log("Now.year()", now.year());

console.log(moment('Apr 20th 2022',"MMM Do YYYY").month());
