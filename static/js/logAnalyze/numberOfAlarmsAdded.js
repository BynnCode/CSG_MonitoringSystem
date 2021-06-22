var numberOfAlarmAddChart = echarts.init(document.getElementById('numberOfAlarmsAdded'));

var numberOfAlarmAddOption = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        bottom: 'bottom',
        data: ['warning', 'error','crit'],
        textStyle:{
            color: '#fff',
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        top: '10%',
        bottom: '13%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel:{
                color: 'white'
        },
        data: []
    },
    yAxis: {
        type: 'value',
        axisLabel:{
                color: 'white'
        },
        splitLine: {
                show: false
        }
    },
    series: [
        {
            name: 'warning',
            type: 'line',
            data: []
        },
        {
            name: 'error',
            type: 'line',
            data: []
        },
        {
            name: 'crit',
            type: 'line',
            data: []
        }
    ]
};

numberOfAlarmAddChart.setOption(numberOfAlarmAddOption);