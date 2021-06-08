var normalAndAbnormalFlowChart = echarts.init(document.getElementById('suricata_normalAndAbnormalFlow'));
var normalAndAbnormalFlowOption;

normalAndAbnormalFlowOption = {
    color: ['#5C7BD9', '#FF7070'],
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        orient: 'vertical',
        left: 'left',
        left:'5%',
        textStyle:{
            color: '#fff',
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '70%'],
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

normalAndAbnormalFlowOption && normalAndAbnormalFlowChart.setOption(normalAndAbnormalFlowOption);