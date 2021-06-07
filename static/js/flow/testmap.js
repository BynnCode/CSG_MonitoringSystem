var mapChart = echarts.init(document.getElementById("china_map"));

var uploadedDataURL = "static/js/flow/data-1528971808162-BkOXf61WX.json"; //刚刚下载的json文件  我的文件是和这个html在同一个目录下的所以直接引用的，具体的需要看文件存放路径的

// 可视化配色
//线条的汇集点坐标

//geoCoordMap把所有可能出现的城市加到数组里面
var geoCoordMap = {
	"杭州": [119.5313, 29.8773],
	"苏州": [118.8062, 31.9208],
	'上海': [121.4648, 31.2891],
	"天津": [117.4219, 39.4189],
	'深圳': [114.072026, 22.552194],
	"成都": [103.9526, 30.7617],
	"郑州": [113.4668, 34.6234],
	"宁波": [121.640618, 29.86206],
	"合肥": [117.29, 32.0581],
	"重庆": [108.384366, 30.439702],
	"广州": [113.12244, 23.009505],
	"大连": [123.1238, 42.1216],
	"青岛": [117.1582, 36.8701],
	'北京': [116.4551, 40.2539],
	'义乌': [120.067209, 29.346921],
	'东莞': [113.764742, 23.02039],
	"长沙": [113.0823, 28.2568],
	"贵阳": [106.6992, 26.7682],
	'珠海': [113.556111, 22.250876],
	'威海': [122.109148, 37.516889],
	'南昌': [115.892151,28.676493],
	'西安': [109.948024,34.263161],
	'南京': [118.767413,32.041544],
	"海口": [110.35, 20.02],
	"厦门": [118.1, 24.46],
	'沈阳': [123.429096,41.796767],
	'无锡': [120.301663,31.574729],
	"哈尔滨": [126.63, 45.75],
	// '长春': [125.3245,43.886841],
	"呼和浩特": [111.65, 40.82],


};
//通过html文件头部获取的Server.Data传递过来，全局变量
var testMapData = Server.Data;
var d1 = testMapData[0];
var d2 = testMapData[1];
var d3 = testMapData[2];
var d4 = testMapData[3];
var d5 = testMapData[4];
var d6 = testMapData[5];
var d7 = testMapData[6];

var colors = [
	["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
	["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3",
		"#9D96F5", "#8378EA", "#8378EA"
	],
	["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C",
		"#F49F42"
	],
];
var colorIndex = 0;
$(function() {
	var day = ["1", "2", "3", "4", "5", "6", "7"];
	var mapData = [
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	];

	/*柱子Y名称*/
	var categoryData = [];
	var barData = [];

	for (var key in geoCoordMap) {
		mapData[0].push({
			"day": '1',
			"name": key,
			"value": d1[key],
		});
		mapData[1].push({
			"day": '2',
			"name": key,
			"value": d2[key],
		});
		mapData[2].push({
			"day": '3',
			"name": key,
			"value": d3[key],
		});
		mapData[3].push({
			"day": '4',
			"name": key,
			"value": d4[key],
		});
		mapData[4].push({
			"day": '5',
			"name": key,
			"value": d5[key],
		});
		mapData[5].push({
			"day": '6',
			"name": key,
			"value": d6[key],
		});
		mapData[6].push({
			"day": '7',
			"name": key,
			"value": d7[key],
		});
	}

	for (var i = 0; i < mapData.length; i++) {
		mapData[i].sort(function sortNumber(a, b) {
			return a.value - b.value
		});
		barData.push([]);
		categoryData.push([]);
		for (var j = 0; j < mapData[i].length; j++) {
			barData[i].push(mapData[i][j].value);
			categoryData[i].push(mapData[i][j].name);
		}
	}

	$.getJSON(uploadedDataURL, function(geoJson) {

		echarts.registerMap('china', geoJson);
		var convertData = function(data) {
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value)
					});
				}
			}
			return res;
		};

		optionXyMap01 = {
			timeline: {
				data: day,
				axisType: 'category',
				autoPlay: true,
				playInterval: 3000,
				left: '10%',
				right: '10%',
				bottom: '3%',
				width: '80%',
				label: {
					normal: {
						textStyle: {
							color: '#ddd'
						}
					},
					emphasis: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				symbolSize: 10,
				lineStyle: {
					color: '#555'
				},
				checkpointStyle: {
					borderColor: '#777',
					borderWidth: 2
				},
				controlStyle: {
					showNextBtn: true,
					showPrevBtn: true,
					normal: {
						color: '#666',
						borderColor: '#666'
					},
					emphasis: {
						color: '#aaa',
						borderColor: '#aaa'
					}
				},

			},
			baseOption: {
				animation: true,
				animationDuration: 1000,
				animationEasing: 'cubicInOut',
				animationDurationUpdate: 1000,
				animationEasingUpdate: 'cubicInOut',
				grid: {
					right: '1%',
					top: '15%',
					bottom: '15%',
					width: '20%'
				},
				tooltip: {
					trigger: 'axis', // hover触发器
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
						shadowStyle: {
							color: 'rgba(150,150,150,0.1)' //hover颜色
						}
					}
				},
				geo: {
					show: true,
					map: 'china',
					roam: true,
					zoom: 1,
					center: [113.83531246, 34.0267395887],
					label: {
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							borderColor: 'rgba(50, 180, 186, 1)',
							borderWidth: 1,
							areaColor: {
								type: 'radial',
								x: 0.5,
								y: 0.5,
								r: 0.8,
								colorStops: [{
									offset: 0,
									color: 'rgba(15, 60, 60, 0)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(15, 60, 60, .5)' // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							},
							shadowColor: 'rgba(128, 217, 248, 1)',
							// shadowColor: 'rgba(255, 255, 255, 1)',
							shadowOffsetX: -2,
							shadowOffsetY: 2,
							shadowBlur: 10
						},
						emphasis: {
							areaColor: 'rgba(100,220,226,0.8)',
							borderWidth: 0
						}
					}
				},
			},
			options: []

		};

		for (var n = 0; n < day.length; n++) {
			optionXyMap01.options.push({
				backgroundColor: '#031116',
				title: [{
						text: '流量分布(7min内)',
						left: '10%',
						top: '3%',
						textStyle: {
							color: '#fff',
							fontSize: 25
						}
					},
					{
						id: 'statistic',
						text: day[n] + "min前",
						left: '80%',
						top: '2%',
						textStyle: {
							color: '#fff',
							fontSize: 20
						}
					}
				],
				xAxis: {
					type: 'value',
					scale: true,
					position: 'top',
					min: 0,
					boundaryGap: false,
					splitLine: {
						show: false
					},
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						margin: 2,
						textStyle: {
							color: '#aaa',
							fontSize:8
						}
					},
				},
				yAxis: {
					type: 'category',
					//  name: 'TOP 20',
					nameGap: 16,
					axisLine: {
						show: true,
						lineStyle: {
							color: '#ddd'
						}
					},
					axisTick: {
						show: false,
						lineStyle: {
							color: '#ddd'
						}
					},
					axisLabel: {
						interval: 0,
						textStyle: {
							color: '#ddd',
							fontSize:7
						}
					},
					data: categoryData[n]
				},

				series: [
					//地图
					{
						type: 'map',
						map: 'china',
						geoIndex: 0,
						aspectScale: 0.75, //长宽比
						showLegendSymbol: false, // 存在legend时显示
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: false,
								textStyle: {
									color: '#fff'
								}
							}
						},
						roam: true,
						itemStyle: {
							normal: {
								areaColor: '#031525',
								borderColor: '#FFFFFF',
							},
							emphasis: {
								areaColor: '#2B91B7'
							}
						},
						animation: false,
						data: mapData
					},
					//地图中闪烁的点
					{
						//  name: 'Top 5',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: convertData(mapData[n].sort(function(a, b) {
							return b.value - a.value;
						}).slice(0, 20)),
						symbolSize: function(val) {
							return val[2] / 10;
						},
						showEffectOn: 'render',
						rippleEffect: {
							brushType: 'stroke'
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: true
							}
						},
						itemStyle: {
							normal: {
								color: colors[colorIndex][n],
								shadowBlur: 10,
								shadowColor: colors[colorIndex][n]
							}
						},
						zlevel: 1
					},
					//柱状图
					{
						zlevel: 1.5,
						type: 'bar',
						symbol: 'none',
						itemStyle: {
							normal: {
								color: colors[colorIndex][n]
							}
						},
						data: barData[n]
					}
				]
			})
		}
		mapChart.setOption(optionXyMap01);
	});
});
