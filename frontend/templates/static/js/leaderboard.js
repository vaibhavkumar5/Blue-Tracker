const leaderboard_container = document.getElementById("leaderboard");

function get_leaderboard(){
  axios({
    method: "get",
    url: BASE_API_URL+"leaderboard/",
    headers: {"Authorization":authorization}
  })
  .then(function(response){
    for (var i = 0; i < response.data.length; i++) {
      var row = document.createElement("tr");

      var rank = document.createElement("td");
      var user_name = document.createElement("td");
      var index = document.createElement("td");

      rank.innerHTML = i+1;
      user_name.innerHTML = response.data[i].user.username;
      index.innerHTML = response.data[i].savings_index;

      row.appendChild(rank);
      row.appendChild(user_name);
      row.appendChild(index);

      leaderboard_container.appendChild(row);
    }
  })
  .catch(function(error){ delCookie('Authorization'); location.reload(); });
}
get_leaderboard();