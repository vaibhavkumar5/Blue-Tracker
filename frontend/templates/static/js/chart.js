var data = [12, 19, 3];
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
 type: 'doughnut' ,
    data: {
        labels: ['Savings', 'Expenses', 'Transaction'],
        datasets: [{
            label: 'First Data Set',
            data: data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
            ], borderWidth: 2}
            ]
    },
    options: {}
   
});
               