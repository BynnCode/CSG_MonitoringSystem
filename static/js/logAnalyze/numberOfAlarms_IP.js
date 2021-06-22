var numberOfAlarmIPChart = echarts.init(document.getElementById('numberOfAlarms_IP'));

// var data = [];
// for (let i = 0; i < 20; ++i) {
//     data.push(Math.round(Math.random() * 200));
// }

var numberOfAlarmIPOption = {
    xAxis: {
        max: 'dataMax',
        axisLabel:{
            color: 'white'
        },
        splitLine: {
                show: false
        }
    },
    yAxis: {
        type: 'category',
        axisLabel:{
            color: 'white'
        },
        data: [],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 20 // only the largest 3 bars will be displayed
    },
    grid: {
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '0%',
        containLabel: true
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        color: 'white',
        type: 'bar',
        data: [],
        label: {
            show: true,
            position: 'right',
            valueAnimation: true,
        }
    }],
    legend: {
        show: false,
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};

// function run () {
//     var data = numberOfAlarmIPOption.series[0].data;
//     for (var i = 0; i < data.length; ++i) {
//         if (Math.random() > 0.9) {
//             data[i] += Math.round(Math.random() * 2000);
//         }
//         else {
//             data[i] += Math.round(Math.random() * 200);
//         }
//     }
//     numberOfAlarmIPChart.setOption(numberOfAlarmIPOption);
// }
//
// // setInterval(function () {
// //     run();
// // }, 3000);

numberOfAlarmIPChart.setOption(numberOfAlarmIPOption);
