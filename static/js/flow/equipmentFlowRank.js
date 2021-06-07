var equipmentChart = echarts.init(document.getElementById('r1Internal'));
var equipmentOption;

var data = [];
for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
}

equipmentOption = {
    xAxis: {
        max: 'dataMax',
        axisLabel:{
            color: 'white'
        },
    },
    yAxis: {
        type: 'category',
        axisLabel:{
            color: 'white'
        },
        data: ['河北', '河南', '天津', '广东', '山东'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 5 // only the largest 3 bars will be displayed
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        color: 'white',
        type: 'bar',
        data: data,
        label: {
            show: true,
            position: 'right',
            valueAnimation: true,
        }
    }],
    legend: {
        show: false
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
};

function run () {
    var data = equipmentOption.series[0].data;
    for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000);
        }
        else {
            data[i] += Math.round(Math.random() * 200);
        }
    }
    equipmentChart.setOption(equipmentOption);
}

setTimeout(function() {
    run();
}, 0);
setInterval(function () {
    run();
}, 3000);

equipmentOption && equipmentChart.setOption(equipmentOption);
