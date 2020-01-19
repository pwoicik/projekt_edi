"use strict"

export function drawChart(chartName,names,playcount){
    let createChart =  document.createElement("canvas");
    createChart.id = chartName;
    $("#overlay").append(createChart);
    var ctx = document.getElementById(chartName);
    ctx.style.backgroundColor = 'rgb(245,245,220, 1)';

            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [names[0], names[1], names[2], names[3], names[4], names[5]],
                    datasets: [{
                        label: '# of total plays on Last.fm',
                        data: [playcount[0], playcount[1], playcount[2], playcount[3], playcount[4], playcount[5]],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    responsive: true,
                    maintainAspectRatio: true,
                    title:{
                        display:true,
                        text: chartName,
                      },
                }
            });
}

