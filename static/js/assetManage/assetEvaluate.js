//图1-资产评估表
var assetEvaluateChart = echarts.init(document.getElementById('assetEvaluate'));

var assetEvaluateOption = {
    color:['#FC6E6E','#FAC858','#91CC75','#5C7BD9','#73C0DE','#FFDEAD',
            '#F0FFFF','#E6E6FA','#87CEFA','#7FFFD4','#FFFF00','#FF8C00',
            '#A020F0','#00BFFF','#76EEC6','#90EE90','#CAFF70','#FF7256',
            '#FF82AB','#912CEE'],
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            center:['40%', '50%'],
            avoidLabelOverlap: false,

            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: '评估1'},
                {value: 735, name: '评估2'},
                {value: 580, name: '评估3'},
                {value: 484, name: '评估4'},
                {value: 300, name: '评估5'}
            ]
        }
    ]
};

assetEvaluateChart.setOption(assetEvaluateOption);


//图2-安全设备表
var safeDeviceChart = echarts.init(document.getElementById('safeDevice'));

var safeDeviceOption = {
    color:['#FC6E6E','#FAC858','#91CC75','#5C7BD9','#73C0DE','#FFDEAD',
            '#F0FFFF','#E6E6FA','#87CEFA','#7FFFD4','#FFFF00','#FF8C00',
            '#A020F0','#00BFFF','#76EEC6','#90EE90','#CAFF70','#FF7256',
            '#FF82AB','#912CEE'],
    tooltip: {
        trigger: 'item'
    },

    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            center:['45%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                // borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'safe1'},
                {value: 735, name: 'safe2'},
                {value: 580, name: 'safe3'},
                {value: 484, name: 'safe4'},
                {value: 300, name: 'safe5'}
            ]
        }
    ]
};

safeDeviceChart.setOption(safeDeviceOption);


//图3-软件类型表
var softwareTypeChart = echarts.init(document.getElementById('softwareType'));

var softwareTypeOption = {
    color:['#FC6E6E','#FAC858','#91CC75','#5C7BD9','#73C0DE','#FFDEAD',
            '#F0FFFF','#E6E6FA','#87CEFA','#7FFFD4','#FFFF00','#FF8C00',
            '#A020F0','#00BFFF','#76EEC6','#90EE90','#CAFF70','#FF7256',
            '#FF82AB','#912CEE'],
    tooltip: {
        trigger: 'item'
    },

    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            center:['45%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 12,
                // borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'soft1'},
                {value: 735, name: 'soft2'},
                {value: 580, name: 'soft3'},
                {value: 484, name: 'soft4'},
                {value: 300, name: 'soft5'}
            ]
        }
    ]
};

softwareTypeChart.setOption(softwareTypeOption);


//图4-资产设备类型表
var deviceTypeChart = echarts.init(document.getElementById('deviceType'));

var deviceTypeChartOption = {
    color:['#FC6E6E','#FAC858','#91CC75','#5C7BD9','#73C0DE','#FFDEAD',
            '#F0FFFF','#E6E6FA','#87CEFA','#7FFFD4','#FFFF00','#FF8C00',
            '#A020F0','#00BFFF','#76EEC6','#90EE90','#CAFF70','#FF7256',
            '#FF82AB','#912CEE'],
    tooltip: {
        trigger: 'item'
    },

    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            center:['45%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                // borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'type1'},
                {value: 735, name: 'type2'},
                {value: 580, name: 'type3'},
                {value: 484, name: 'type4'},
                {value: 300, name: 'type5'}
            ]
        }
    ]
};

deviceTypeChart.setOption(deviceTypeChartOption);


