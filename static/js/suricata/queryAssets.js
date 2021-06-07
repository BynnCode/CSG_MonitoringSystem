var queryAssetChart = echarts.init(document.getElementById('queryAssets'));
var queryAssetOption = {
	 tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '8%',
        
        left: 'right',
        orient: 'vertical',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
            ]
        }
    ]
}

queryAssetChart.setOption(queryAssetOption);