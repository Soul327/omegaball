function selectTeam(args) {
  // Select one and unselect all of the others
  selectedTeam = args["teamIndex"];

  let team = data["teams"][selectedTeam];

  let teamEle = document.getElementById("team");
  let playerEle = document.getElementById("player");
  teamEle.style.display = "block";
  playerEle.style.display = "none";

  // Clear element
  teamEle.innerHTML = "";

  // Display team name
  let header = document.createElement("h2");
  header.innerHTML = team["teamName"].toUpperCase();
  header.style.color = team["teamColor"];
  teamEle.appendChild(header);

  // Display team stats
  let statsDiv = document.createElement("div");
  statsDiv.classList.add("indent");
  statsDiv.appendChild(mkEle("p", "RECORD: (0-0)"));
  statsDiv.appendChild(mkEle("p", "CHAMPIONSHIPS: 0"));
  statsDiv.appendChild(mkEle("p", "TIES: 0"));
  teamEle.appendChild(statsDiv);

  // Display players
  let playerHeader = document.createElement("h3");
  playerHeader.innerHTML = "PLAYERS";
  teamEle.appendChild(playerHeader);

  let playersDiv = document.createElement("div");
  playersDiv.classList.add("indent");
  playersDiv.id = "playerList";

  // Draw all players
  for(let playerName in team["players"]) {
    let player = team["players"][playerName];

    let wraper = document.createElement("p");

    let playerEle = document.createElement("span");
    playerEle.style.color = team["teamColor"];
    playerEle.style.cursor = "pointer";
    playerEle.onclick = function() {
      drawPlayer(this, selectedTeam, playerName);
    };
    playerEle.innerHTML = player["playerName"];

    wraper.appendChild(playerEle);
    playersDiv.appendChild(wraper);
  }

  teamEle.appendChild(playersDiv);
}

function drawPlayer(ele, teamIndex, playerIndex) {
  // Select one and unselect all of the others
  toggleHighlight( ele, document.getElementById("playerList") );
  let player = data["teams"][teamIndex]["players"][playerIndex];
  let playerEle = document.getElementById("player");
  playerEle.style.display = "block";
  playerEle.innerHTML = "";

  let nameEle = document.createElement("h2");
  nameEle.style.color = data["teams"][teamIndex]["teamColor"];
  nameEle.innerHTML = playerIndex.toUpperCase();
  playerEle.appendChild( nameEle );

  let statsEle = document.createElement("div");
  statsEle.classList.add("indent");
  playerEle.appendChild(statsEle);

  statsEle.appendChild(mkEle("p", getStatString(
    "POW: ",
    player,
    ["tendons", "animus", "cruelty"]
  )));

  statsEle.appendChild(mkEle("p", getStatString(
    "ACC: ",
    player,
    ["foresight", "grandeur", "markovianism", "cruelty"]
  )));

  statsEle.appendChild(mkEle("p", getStatString(
    "DEF: ",
    player,
    ["authority", "endurance", "mystique", "pluckiness"]
  )));

  statsEle.appendChild(mkEle("p", getStatString(
    "FIN: ",
    player,
    ["celerity", "hustle", "incorporeality", "poise"]
  )));

  statsEle.appendChild(mkEle("p", getStatString(
    "CHM: ",
    player,
    []
  )));

  statsEle.appendChild(mkEle("p", getStatString(
    "RAT: ",
    player,
    []
  )));

  let str, outOf = 10;
  str = "ENTROPY: <span style='color: green'>";
  for(let x=1;x<=10;x++) {
    if( x > player["entropy"] * outOf )
      str += "</span>";
    str += "/";
  }
  playerEle.appendChild( mkEle("p", str) );
}


/**
 * Calculates the display stat number from the stats of the player
 *
 * @param {string} str
 * @param {object} player
 * @param {array} substats
 * @returns
 */
function getStatString(str, player, substats = []) {
  // Calculate average
  let amount = 0;
  let avg = 0;
  for(index in substats) {
    let substatName = substats[index];

    // If the stat isnt found, skip it
    if( !Object.hasOwn( player, substatName ) )
      continue;

    avg += parseFloat( player[ substatName ] );
    amount += 1;
  }

  if( amount == 0 ) return str + "NULL";

  avg = avg / amount;

  avg *= 5;

  for(let x=1;x<=avg;x++)
    str += "*";
  if(avg % 1 > .5)
    str += "~";

  return str;
}

onWindowLoad(function() {
  fetchData(function() {
    let divisionContent = getDivisionElement({"noColumns":true, "onClickTeam":selectTeam});
    divisionContent.style.width = "unset";
    let divisionElement = document.getElementById("division");
    divisionElement.appendChild(divisionContent);
    divisionElement.style.display = "block";
  });
});

var selectedTeam = null;
var selectedPlayer = null;