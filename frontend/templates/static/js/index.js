var user_name_containers = document.getElementsByClassName('user-name');
var donut_chart_data = null;

function get_current_month_data(){
	axios({
		method: "get",
		url: BASE_API_URL+"current_month/",
		headers: {"Authorization":authorization}
	})
	.then(function(response){
		donut_chart_data = [response.data.savings, response.data.expenses, response.data.transactions];
		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
		 type: 'doughnut' ,
		    data: {
		        labels: ['Savings', 'Expenses', 'Transactions'],
		        datasets: [{
		            label: 'First Data Set',
		            data: donut_chart_data,
		            backgroundColor: [
		                'rgb(255, 99, 132)',
		                'rgb(54, 162, 235)',
		                'rgb(255, 206, 86)',
		            ], borderWidth: 2}
		            ]
		    },
		    options: {}
		});
		for (var i = 0; i < user_name_containers.length; i++) {
			user_name_containers[i].innerHTML = ", " + response.data.user.username + "!";
		}
		var income = response.data.income;
		var savings = response.data.savings;
		var goal = response.data.goal;

		if(goal == 0){
			document.getElementById("month-progress").innerHTML = "Goal Not Set";
		}else{
			var achieved = Math.round((savings/goal)*100);
			if(achieved > 100){achieved = 100;}
			if(achieved > 60){
				document.getElementById("month-progress").innerHTML = "Good Progress";
				document.getElementById("budget-status").classList.add("text-light");
				document.getElementById("budget-status").classList.add("bg-success");
			}else if(achieved > 30){
				document.getElementById("month-progress").innerHTML = "Keep it up";
				document.getElementById("budget-status").classList.add("text-dark");
				document.getElementById("budget-status").classList.add("bg-warning");
			}else{
				document.getElementById("month-progress").innerHTML = "It seems you've to work hard";
				document.getElementById("budget-status").classList.add("text-light");
				document.getElementById("budget-status").classList.add("bg-danger");
			}
			achieved += "%";
		}

		document.getElementById("income").innerHTML = income;
		document.getElementById("goal").innerHTML = goal;
		document.getElementById("savings").innerHTML = savings;
		document.getElementById("achieved").innerHTML = achieved;

		savings = Math.floor((savings/income)*100);
		var spendings = 100 - savings;

		spendings += "%";
		savings += "%";
		document.getElementById("budget-spendings").innerHTML = spendings;
		document.getElementById("budget-spendings").style.width = spendings;
		document.getElementById("budget-savings").innerHTML = savings;
		document.getElementById("budget-savings").style.width = savings;
	})
	.catch(function(error){ delCookie('Authorization'); window.reload(); });
}
get_current_month_data();

var data = [];
var labels = [];

function get_current_year_data(){
        axios({
        method: "get",
        url: BASE_API_URL+"current_year/",
        headers: {"Authorization":authorization}
    })
    .then(function(response){
        for (var i = 0; i < response.data.length; i++) {
        	data.push(response.data[i].savings_index);
        	labels.push(response.data[i].month);
        }
		var ctx = document.getElementById('my_Chart').getContext('2d');
		var my_Chart = new Chart(ctx, {
		 type: 'line' ,
		    data: {
		        labels: labels,
		        datasets: [{
		            label: 'Monthly Tracker',
		            data: data,
		            borderColor: [
		                'rgb(255, 99, 132)',
		                'rgb(54, 162, 235)',
		                'rgb(255, 206, 86)',
		                'rgb(75, 192, 192)',
		                'rgba153, 102, 255)',
		                'rgb(255, 159, 64)'
		            ],
		            borderWidth: 2}
		        ]
		    },
		    options: {}
		});
    })
    .catch(function(error){ delCookie('Authorization'); window.reload(); });
}
get_current_year_data();