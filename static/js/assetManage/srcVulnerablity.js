var srcVulnerabilityChart = echarts.init(document.getElementById('srcVulnerability'));


var srcVulnerabilityOption = {
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
        data: ['河北', '河南', '天津', '广东', '山东'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 5// only the largest 3 bars will be displayed
    },
    series: [{
        realtimeSort: true,
        name: 'X',
        color: 'white',
        type: 'bar',
        data: [],
        itemStyle:{
        color:'#90EE90'
        },
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

srcVulnerabilityChart.setOption(srcVulnerabilityOption);
