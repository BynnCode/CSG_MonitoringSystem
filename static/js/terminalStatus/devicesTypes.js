var devicesTypesChart = echarts.init(document.getElementById('devicesTypes'));

var devicesTypesOption = {
        color:['#FC6E6E','#FAC858','#91CC75','#5C7BD9','#73C0DE','#FFDEAD',
            '#F0FFFF','#E6E6FA','#87CEFA','#7FFFD4','#FFFF00','#FF8C00',
            '#A020F0','#00BFFF','#76EEC6','#90EE90','#CAFF70','#FF7256',
            '#FF82AB','#912CEE'],
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: '终端类型',
            type: 'pie',
            radius: ['50%', '90%'],
            center:['40%', '50%'],
            avoidLabelOverlap: false,

            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'MAC'},
                {value: 735, name: 'Linux'},
                {value: 580, name: 'Windows'},
                {value: 484, name: 'Mobile'}
            ]
        }
    ]
};

devicesTypesChart.setOption(devicesTypesOption);
$('.chart').resize(function(){
		myChartx.resize();
	});