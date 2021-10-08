var month_id = null;

function create_pie_chart(id, savings, expenses, transactions){
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
	 type: 'doughnut' ,
	    data: {
	        labels: ['Savings', 'Expenses', 'Transactions'],
	        datasets: [{
	            label: 'First Data Set',
	            data: [savings, expenses, transactions],
	            backgroundColor: [
	                'rgb(255, 99, 132)',
	                'rgb(54, 162, 235)',
	                'rgb(255, 206, 86)',
	            ], borderWidth: 2}
	            ]
	    },
	    options: {}
	});
}

function get_current_month_data(){
	axios({
		method: "get",
		url: BASE_API_URL+"current_month/",
		headers: {"Authorization":authorization}
	})
	.then(function(response){
		document.getElementById("user-name").innerHTML = response.data.user.username;

		month_id = response.data.id;

		var current_month = response.data.month + "/" + response.data.year;

		var income = response.data.income;
		var savings = response.data.savings;
		var expenses = response.data.expenses;
		var transactions = response.data.transactions;
		var spendings = expenses + transactions;
		var goal = response.data.goal;

		create_pie_chart("current_month", savings, expenses, transactions);

		var achieved = Math.round((savings/goal)*100) + "%";
		var index = response.data.savings_index;

		document.getElementById("month").innerHTML = current_month;

		document.getElementById("income").value = income;
		document.getElementById("goal").value = goal;

		document.getElementById("expenses").innerHTML = expenses;
		document.getElementById("transactions").innerHTML = transactions;

		document.getElementById("savings").innerHTML = savings;
		document.getElementById("spendings").innerHTML = spendings;

		document.getElementById("achieved").innerHTML = achieved;
		document.getElementById("index").innerHTML = index;
	})
	.catch(function(error){ delCookie('Authorization'); location.reload(); });
}
get_current_month_data();

function get_last_month_data(){
	axios({
		method: "get",
		url: BASE_API_URL+"last_month/",
		headers: {"Authorization":authorization}
	})
	.then(function(response){
		var current_month = response.data.month + "/" + response.data.year;
		var savings = response.data.savings;
		var expenses = response.data.expenses;
		var transactions = response.data.transactions;
		create_pie_chart("last_month", savings, expenses, transactions);
	})
	.catch(function(error){ alert("Couldn't retrieve data for last month"); });
}
get_last_month_data();

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
		var ctx = document.getElementById('year_activity').getContext('2d');
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
    .catch(function(error){ delCookie('Authorization'); location.reload(); });
}
get_current_year_data();

function update_profile(){
	axios({
        method: "put",
        url: BASE_API_URL+"current_month/",
        headers: {"Authorization":authorization},
        data: {"id":month_id, "income":document.getElementById("income").value, "goal":document.getElementById("goal").value}
    })
    .then(function(response){
        alert("Profile Updated");
        location.reload();
    })
    .catch(function(error){ delCookie('Authorization'); location.reload(); });
}