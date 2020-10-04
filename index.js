const fifa = require("./fifa.js");

const fifaData = require("./fifa.js").fifaData;

// ⚽️ M  V P ⚽️ //

// Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data

let fifa2014 = fifaData.find((e) => {
  return e.Year === 2014 && e.Stage.toLowerCase() === "final";
});
// (a) Home Team name for 2014 world cup final
console.log(fifa2014["Home Team Name"]);
// (b) Away Team name for 2014 world cup final
console.log(fifa2014["Away Team Name"]);
// (c) Home Team goals for 2014 world cup final
let homeGoals2014 = fifa2014["Home Team Goals"];
console.log(homeGoals2014);
// (d) Away Team goals for 2014 world cup final
let awayGoals2014 = fifa2014["Away Team Goals"];
console.log(awayGoals2014);
// (e) Winner of 2014 world cup final
let string = " won the 2014 world cup final";
console.log(
  homeGoals2014 > awayGoals2014
    ? fifa2014["Home Team Name"] + string
    : fifa2014["Away Team Name"] + string
);

//  Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(arr) {
  return arr.filter((e) => {
    return e.Stage.toLowerCase() === "final";
  });
}

let finalGames = getFinals(fifaData);

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

function returnTeams(data) {
  let intSet = new Set(
    data
      .map((en) => {
        return en["Home Team Initials"];
      })
      .sort()
  );
  let arr = Array.from(intSet);
  return arr;
}
let allTeams = returnTeams(fifaData);

function getCountryWins(data, initials) {
  let init = initials.toUpperCase();

  let teamGames = (team) => {
    return data
      .filter((e) => {
        return e.Stage.toLowerCase() === "final";
      })
      .filter((el) => {
        return (
          el["Home Team Initials"] == team || el["Away Team Initials"] == team
        );
      });
  };
  let teamGamesByInit = teamGames(init);

  return (
    init +
    " won " +
    teamGamesByInit.reduce((t, e, i) => {
      if (teamGamesByInit[i]["Home Team Initials"] === init) {
        if (
          teamGamesByInit[i]["Home Team Goals"] >
          teamGamesByInit[i]["Away Team Goals"]
        ) {
          return t + 1;
        } else {
          return t + 0;
        }
      } else {
        if (e["Away Team Goals"] > e["Home Team Goals"]) {
          return t + 1;
        } else {
          return t + 0;
        }
      }
    }, 0) +
    " Fifa World Cup(s)."
  );
}

// console.log(getCountryWins(fifaData, "arg"));

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
  let wcGames = getFinals(data);

  let points = [];

  for (let team in allTeams) {
    let goals = wcGames
      .filter((el) => {
        return (
          el["Home Team Initials"] === allTeams[team] ||
          el["Away Team Initials"] === allTeams[team]
        );
      })
      .reduce((t, e) => {
        if (e["Home Team Initials"] === allTeams[team]) {
          return t + e["Home Team Goals"];
        } else {
          return t + e["Away Team Goals"];
        }
      }, 0);
    let games = wcGames.filter((el) => {
      return (
        el["Home Team Initials"] === allTeams[team] ||
        el["Away Team Initials"] === allTeams[team]
      );
    }).length;

    let check = goals / games;
    if (check > 0) {
      points.push([allTeams[team], check, goals, games]);
    } else {
      [allTeams[team], 0];
    }
  }

  points.sort((a, b) => {
    return b[1] - a[1];
  });

  return points
    .filter((el) => el[1] === points[0][1])
    .map((el, i) => {
      let teamName = data.find((e) => {
        return e["Home Team Initials"] === points[i][0];
      })["Home Team Name"];
      return `${i + 1}. ${teamName} has an average of ${
        points[i][1]
      } point(s) per apperance with a total ${points[i][2]} point(s) in ${
        points[i][3]
      } apperence(s).`;
    });
}

// console.log(getGoals(fifaData));

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
  let wcGames = getFinals(data);

  let points = [];

  for (let team in allTeams) {
    let goals = wcGames
      .filter((el) => {
        return (
          el["Home Team Initials"] === allTeams[team] ||
          el["Away Team Initials"] === allTeams[team]
        );
      })
      .reduce((t, e) => {
        if (e["Home Team Initials"] === allTeams[team]) {
          return t + e["Away Team Goals"];
        } else {
          return t + e["Home Team Goals"];
        }
      }, 0);
    let games = wcGames.filter((el) => {
      return (
        el["Home Team Initials"] === allTeams[team] ||
        el["Away Team Initials"] === allTeams[team]
      );
    }).length;

    let check = goals / games;
    if (check > 0) {
      points.push([allTeams[team], check, goals, games]);
    } else {
      [allTeams[team], 0];
    }
  }

  points.sort((a, b) => {
    return b[1] - a[1];
  });
  console.log(points);
  return points
    .filter((el) => el[1] === points[0][1])
    .map((el, i) => {
      let teamName = data.find((e) => {
        return e["Home Team Initials"] === points[i][0];
      })["Home Team Name"];
      return `${i + 1}. ${teamName} has an average of ${
        points[i][1]
      } point(s) scored against them per apperance with a total ${
        points[i][2]
      } point(s) in ${points[i][3]} apperence(s).`;
    });
}

console.log(badDefense(fifaData));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
