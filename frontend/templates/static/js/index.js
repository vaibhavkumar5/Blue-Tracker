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
		        labels: ['Savings', 'Expenses', 'Transaction'],
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
			user_name_containers[i].innerHTML = response.data.user.username;
		}
		var income = response.data.income;
		var spendings = response.data.expenses + response.data.transactions;
		var savings = response.data.savings;

		spendings = (spendings/income)*100;
		spendings += "%";
		savings = (savings/income)*100;
		savings += "%";

		document.getElementById("budget-spendings").innerHTML = spendings;
		document.getElementById("budget-spendings").style.width = spendings;
		document.getElementById("budget-savings").innerHTML = savings;
		document.getElementById("budget-savings").style.width = savings;
	})
	.catch(function(error){ delCookie('Authorization'); window.reload(); });
}
get_current_month_data();