var centerFlowTimingDetailChart = echarts.init(document.getElementById('center-flowTiming-detail'));

var centerFlowTimingDetailOption = {
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
        // data: ['Line 1']
        data: ['']
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
            boundaryGap: false,
            data: ['21:00', '21:10', '21:20', '21:30', '21:40', '21:50', '22:00'],
            axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#F8F8FF',//左边线的颜色
                    }
                },
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#F8F8FF',//左边线的颜色
                    }
                },
            splitLine:{
　　　　            show:false
　　              }
        }
    ],
    series: [
        {
            name: 'Line 1',
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
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
        },
    ]
};

centerFlowTimingDetailChart.setOption(centerFlowTimingDetailOption);
