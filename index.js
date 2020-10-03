const fifa = require("./fifa.js");

const fifaData = require("./fifa.js").fifaData;

// ⚽️ M  V P ⚽️ //

// Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data

let fifa2014 = fifaData.find((e) => {
  return e.Year === 2014;
});
// (a) Home Team name for 2014 world cup final
console.log(fifa2014["Home Team Name"]);
// (b) Away Team name for 2014 world cup final
console.log(fifa2014["Away Team Name"]);
// (c) Home Team goals for 2014 world cup final
let brazil = fifa2014["Home Team Goals"];
console.log(brazil);
// (d) Away Team goals for 2014 world cup final
let croatia = fifa2014["Away Team Goals"];
console.log(croatia);
// (e) Winner of 2014 world cup final
let string = " won the 2014 world cup final";
console.log(brazil > croatia ? "Brazil" + string : "Croatia" + string);

//  Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(arr) {
  return arr.filter((e) => {
    return e.Stage.toLowerCase() === "final";
  });
}

// console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(fun, arr) {
  return fun(arr).map((e) => {
    return e.Year;
  });
}

let fifaYears = getYears(getFinals, fifaData);

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

function getWinners(fun, arr) {
  return fun(arr).map((e) => {
    return e["Home Team Goals"] > e["Away Team Goals"]
      ? e["Home Team Name"]
      : e["Away Team Name"];
  });
}

let fifaWinners = getWinners(getFinals, fifaData);

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(winFun, yearFun) {
  let winYears = new Set();
  winFun.map((w, i) => {
    winYears.add(`In ${yearFun[i]}, ${w} won the world cup!`);
  });
  return winYears;
}

// console.log(getWinnersByYear(fifaWinners, fifaYears));

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
  return {
    "Average Home Goals in World Cup": Math.round(
      data.reduce((t, e) => {
        return t + e["Home Team Goals"];
      }, 0) / data.length
    ),
    "Average Away Goals in World Cup": Math.round(
      data.reduce((t, e) => {
        return t + e["Away Team Goals"];
      }, 0) / data.length
    ),
  };
}

// console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {
  /* code here */
}

getCountryWins();

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

getGoals();

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
