var flowTrendChart = echarts.init(document.getElementById('suricata_flowTrend'));

var flowTrendOption = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['攻击流量'],
        textStyle:{
            color: '#fff',
        }
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            axisLabel:{
                color: 'white'
            },
            boundaryGap: false,
            data: ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel:{
                color: 'white'
            },
            splitLine: {
                show: false
            }
        }
    ],
    series: [
        {
            name: '攻击流量',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(4, 106, 183)'
                }, {
                    offset: 1,
                    color: 'rgba(4, 106, 183)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
        }

    ]
};

flowTrendChart.setOption(flowTrendOption);
