var chartDom = document.getElementById('suricata_normalAndAbnormalFlow');
var myChart = echarts.init(chartDom);
var option;

option = {
    color: ['#5C7BD9', '#FF7070'],
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '0%',
        left: 'center',
        textStyle:{
            color: '#fff',
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 0
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '15',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: '正常流量'},
                {value: 735, name: '异常流量'},
            ]
        }
    ]
};

option && myChart.setOption(option);