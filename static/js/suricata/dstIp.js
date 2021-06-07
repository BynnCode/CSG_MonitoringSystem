var chartDom = document.getElementById('dstIp');
var myChart = echarts.init(chartDom);
var option;

option = {
    // legend: {
    //     top: 'bottom'
    // },
    // toolbox: {
    //     show: true,
    //     feature: {
    //         mark: {show: true},
    //         dataView: {show: true, readOnly: false},
    //         restore: {show: true},
    //         saveAsImage: {show: true}
    //     }
    // },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: ['10%', '40%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                {value: 40, name: '175.24.84.198'},
                {value: 38, name: '172.17.0.16'},
                {value: 32, name: '173.24.56.72'},
                {value: 30, name: '178.35.84.125'},
                {value: 28, name: '176.56.32.164'},
                {value: 26, name: '172.78.95.152'},
                {value: 22, name: '175.25.75.168'},
                {value: 18, name: '176.64.68.142'}
            ]
        }
    ]
};

option && myChart.setOption(option);
