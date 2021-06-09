var chartDom = document.getElementById('terminalPastHours_05');
var myChart = echarts.init(chartDom);
var option;

option = {
    color: ['#00DDFF', '#37A2FF', '#FFBF00'],
    title: {
            text: '过去1小时内终端221.15.124.15的行为',
            textStyle: {
                color: '#fff',
            },
     },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    // toolbox: {
    //     feature: {
    //         dataView: {show: true, readOnly: false},
    //         magicType: {show: true, type: ['line', 'bar']},
    //         restore: {show: true},
    //         saveAsImage: {show: true}
    //     }
    // },
    legend: {
        data: ['time']
    },
    xAxis: [
        {
            type: 'category',
            axisLabel:{
                color: 'white'
            },
            data: ['18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:50', '19:00'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'label取值',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} ',
                color: 'white'
            },
            splitLine: {
                show: false
            }
        },
    ],
    series: [
        {
            // name: 'time',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },

        {
            // name: 'time',
            type: 'line',
            yAxisIndex:0,
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }
    ]
};

option && myChart.setOption(option);
