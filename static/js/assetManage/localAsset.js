var LocalChart = echarts.init(document.getElementById('Local'));

var data = [];
for (let i = 0; i < 23; ++i) {
    data.push(Math.round(Math.random() * 200));
}

var LocalOption = {
    xAxis: {
        max: 'dataMax',
        axisLabel:{
            color: 'white'
        },
        splitLine:{show:false}
    },
    yAxis: {
        type: 'category',
        axisLabel:{
            color: 'white'
        },
        data: ['北京','天津','上海','重庆','河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','四川','贵州','云南'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 23// only the largest 3 bars will be displayed
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        itemStyle:{
            color:'#98FB98'
                  },
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
    var data = LocalOption.series[0].data;
    for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000);
        }
        else {
            data[i] += Math.round(Math.random() * 200);
        }
    }
    LocalChart.setOption(LocalOption);
}

setTimeout(function() {
    run();
}, 0);
setInterval(function () {
    run();
}, 3000);

LocalChart.setOption(LocalOption);
