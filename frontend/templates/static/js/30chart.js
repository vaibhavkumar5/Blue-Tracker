var data = [12, 19, 3];
var ctx = document.getElementById('my_Chart').getContext('2d');
var my_Chart = new Chart(ctx, {
 type: 'line' ,
    data: {
        labels: ['Savings', 'Expenses', 'Transaction'],
        datasets: [{
            label: 'Monthly Tracker',
            data: data,
            // backgroundColor: [
            //     'blue',
            //     'blue',
            //     'rgb(255, 206, 86)',
            //     'rgb(75, 192, 192)',
            //     'rgba153, 102, 255)',
            //     'rgb(255, 159, 64)'
            // ],
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
               
