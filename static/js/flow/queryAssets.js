var queryAssetChart = echarts.init(document.getElementById('queryAssets'));
var queryAssetOption = {
	 tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '8%',
        left: 'left',
        orient: 'vertical',
        top:'7%',
        left:'2%',
        textStyle:{
            color:'#FFF8DC',
            fontSize:12
        }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['55%', '70%'],
            center:['70%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '10',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [

            ]
        }
    ]
}

queryAssetChart.setOption(queryAssetOption);