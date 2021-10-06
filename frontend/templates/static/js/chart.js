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
                'rgb(75, 192, 192)',
                'rgba153, 102, 255)',
                'rgb(255, 159, 64)'
            ],
            // borderColor: [
            //     'rgb(255, 99, 132)',
            //     'rgb(54, 162, 235)',
            //     'rgb(255, 206, 86)',
            //     'rgb(75, 192, 192)',
            //     'rgba153, 102, 255)',
            //     'rgb(255, 159, 64)'
            // ],
            borderWidth: 2},
            {
            // label: 'Second Data Set',
            // data: [10, 12, 7, 4, 16, 13],
            // backgroundColor: [
            //     'rgb(255, 99, 132)',
            //     'rgb(54, 162, 235)',
            //     'rgb(255, 206, 86)',
            //     'rgb(75, 192, 192)',
            //     'rgba153, 102, 255)',
            //     'rgb(255, 159, 64)'
            // ],
            // borderColor: [
            //     'rgb(255, 99, 132)',
            //     'rgb(54, 162, 235)',
            //     'rgb(255, 206, 86)',
            //     'rgb(75, 192, 192)',
            //     'rgba153, 102, 255)',
            //     'rgb(255, 159, 64)'
            // ],
            borderWidth: 2,
        }]
    },
    options: {}
   
});
               