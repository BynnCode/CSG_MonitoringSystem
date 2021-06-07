var flowMaxChart = echarts.init(document.getElementById('flowMax'));
var dataBJ = [
	[1, 55, 9, 56, 0.46, 18, 6, "良"],
	[2, 25, 11, 21, 0.65, 34, 9, "优"],
	[3, 56, 7, 63, 0.3, 14, 5, "良"],
	[4, 33, 7, 29, 0.33, 16, 6, "优"],
	[5, 42, 24, 44, 0.76, 40, 16, "优"],
	[6, 82, 58, 90, 1.77, 68, 33, "良"],
	[7, 74, 49, 77, 1.46, 48, 27, "良"],

];

var dataGZ = [
	[1, 26, 37, 27, 1.163, 27, 13, "优"],
	[2, 85, 62, 71, 1.195, 60, 8, "良"],
	[3, 78, 38, 74, 1.363, 37, 7, "良"],
	[4, 21, 21, 36, 0.634, 40, 9, "优"],
	[5, 41, 42, 46, 0.915, 81, 13, "优"],
	[6, 56, 52, 69, 1.067, 92, 16, "良"],
	[7, 64, 30, 28, 0.924, 51, 2, "良"],
];

var dataSH = [
	[1, 91, 45, 125, 0.82, 34, 23, "良"],
	[2, 65, 27, 78, 0.86, 45, 29, "良"],
	[3, 83, 60, 84, 1.09, 73, 27, "良"],
	[4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
	[5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
	[6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
	[7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
];

var schema = [{
		name: 'date',
		index: 0,
		text: '日'
	},
	{
		name: 'AQIindex',
		index: 1,
		text: 'AQI指数'
	},
	{
		name: 'PM25',
		index: 2,
		text: 'PM2.5'
	},
	{
		name: 'PM10',
		index: 3,
		text: 'PM10'
	},
	{
		name: 'CO',
		index: 4,
		text: '一氧化碳（CO）'
	},
	{
		name: 'NO2',
		index: 5,
		text: '二氧化氮（NO2）'
	},
	{
		name: 'SO2',
		index: 6,
		text: '二氧化硫（SO2）'
	}
];


var itemStyle = {
	opacity: 0.8,
	shadowBlur: 10,
	shadowOffsetX: 0,
	shadowOffsetY: 0,
	shadowColor: 'rgba(0,0,0,0.3)'
};

var flowMaxoption = {
	color: [
		'#dd4444', '#fec42c', '#80F1BE'
	],
	
	grid: {
		left: '7%',
		right: 100,
		top: '20%',
		bottom: '10%'
	},
	tooltip: {
		backgroundColor: ['rgba(255,255,255,0.7)'],
		formatter: function(obj) {
			var value = obj.value;
			return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
				obj.seriesName + ' ' + value[0] + '日：' +
				value[7] +
				'</div>' +
				schema[1].text + '：' + value[1] + '<br>' +
				schema[2].text + '：' + value[2] + '<br>' +
				schema[3].text + '：' + value[3] + '<br>' +
				schema[4].text + '：' + value[4] + '<br>' +
				schema[5].text + '：' + value[5] + '<br>' +
				schema[6].text + '：' + value[6] + '<br>';
		}
	},
	xAxis: {
		type: 'value',
		name: '时间',
		axisLabel:{
            color: 'white'
        },
		nameGap: 10,
		nameTextStyle: {
			fontSize: 10,
			color:'white'
		},
		max: 7,
		splitLine: {
			show: false
		},
	},
	yAxis: {
		type: 'value',
		name: '流量数',
		nameLocation: 'end',
		nameGap: 10,
		axisLabel:{
            color: 'white'
        },
		nameTextStyle: {
			fontSize: 10,
			color: 'white'
		},
		splitLine: {
			show: false
		}
	},
	visualMap: [{
			left: 'right',
			top: '10%',
			dimension: 2,
			min: 0,
			max: 250,
			itemWidth: 10,
			itemHeight: 40,
			
			precision: 0.1,
		
			textGap: 30,
			inRange: {
				symbolSize: [10, 70]
			},
			outOfRange: {
				symbolSize: [10, 70],
				color: ['rgba(255,255,255,0.4)']
			},
			controller: {
				inRange: {
					color: ['#c23531']
				},
				outOfRange: {
					color: ['#999']
				}
			}
		},
		],
	series: [{
			name: '北京',
			type: 'scatter',
			itemStyle: itemStyle,
			data: dataBJ
		},
		{
			name: '上海',
			type: 'scatter',
			itemStyle: itemStyle,
			data: dataSH
		},
		{
			name: '广州',
			type: 'scatter',
			itemStyle: itemStyle,
			data: dataGZ
		}
	]
};

flowMaxChart.setOption(flowMaxoption);
