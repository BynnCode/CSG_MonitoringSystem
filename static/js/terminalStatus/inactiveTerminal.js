var leftInactiveChart = echarts.init(document.getElementById('left-inactive'));

var leftInactiveOption = {
    color: ['#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
        text: '离\n线\n终\n端\n数\n量\n',
        // subtext: '(kbit/s)',
        textStyle: {
        fontSize: 12,
        fontWeight: 'bolder',
        color: '#F8F8FF'                             // 主标题文字颜色
        },
        subtextStyle: {//副标题的属性
          color: '#F8F8FF',
        },
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['']
    },
    grid: {
        left: '5.5%',
        right: '4%',
        bottom: '3%',
        width:'92%',  // 调整折线图大小
        height:'100%',
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#F8F8FF',//左边线的颜色
                    }
                },
        data: ['8:00', '8:10', '8:20', '8:30', '8:40', '8:50', '9:00',
                '9:10', '9:20', '9:30', '9:40', '9:50', '10:00', '10:10',
                '10:20', '10:30', '10:40', '10:50', '11:00', '11:10', '11:20',
                '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30']
    },
    yAxis: {
        type: 'value',
        axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#F8F8FF',//左边线的颜色
                        width:'2'//坐标线的宽度
                    }
                },
        splitLine:{
　　　　            show:false
　　              }
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210,
                    120, 132, 101, 134, 90, 230, 210,
                    120, 132, 101, 134, 90, 230, 210,
                    120, 132, 101, 134, 90, 230, 210]
        },

    ]
};

leftInactiveChart.setOption(leftInactiveOption);
