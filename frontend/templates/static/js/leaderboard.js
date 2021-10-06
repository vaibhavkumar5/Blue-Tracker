const leaderboard = document.getElementById("leaderboard");
var scores = [
  {
    rank: 1,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 2,
    user_name: "udit berma",
    index: 0.69,
  },
  {
    rank: 3,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 4,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
  {
    rank: 5,
    user_name: "ayush berma",
    index: 0.69,
  },
];

for (i = 0; i < scores.length; i++) {
  var row = document.createElement("tr");

  var rank = document.createElement("td");
  var user_name = document.createElement("td");
  var index = document.createElement("td");

  rank.innerHTML = scores[i].rank;
  user_name.innerHTML = scores[i].user_name;
  index.innerHTML = scores[i].index;

  row.appendChild(rank);
  row.appendChild(user_name);
  row.appendChild(index);

  leaderboard.appendChild(row);
}
