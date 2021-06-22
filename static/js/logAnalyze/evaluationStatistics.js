var evaluationStatisticsChart = echarts.init(document.getElementById('evaluationStatistics'));

var evaluationStatisticsOption = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        bottom: 'bottom',
        data: ['告警数量', '安全事件数量'],
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
            name: '告警数量',
            type: 'line',
            data: []
        },
        {
            name: '安全事件数量',
            type: 'line',
            data: []
        }
    ]
};

evaluationStatisticsChart.setOption(evaluationStatisticsOption);