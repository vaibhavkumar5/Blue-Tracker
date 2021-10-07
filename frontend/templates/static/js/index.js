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
	})
	.catch(function(error){ console.log(error); });
}
get_current_month_data();