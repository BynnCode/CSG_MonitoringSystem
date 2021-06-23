var assetVulnerabilityChart = echarts.init(document.getElementById('assetVulnerability'));


var assetVulnerabilityOption = {
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
        data: ['IP1', 'IP2', 'IP3', 'IP4', 'IP5'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 5// only the largest 3 bars will be displayed
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        itemStyle:{
            color:'#98FB98'
                  },
        type: 'bar',
        data: [23,12,7,34,16],
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


assetVulnerabilityChart.setOption(assetVulnerabilityOption);

