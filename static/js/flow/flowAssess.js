// 基于准备好的dom，初始化echarts实例
 var mapChart = echarts.init(document.getElementById('china_map'));

 var mapName = 'china'
 var data = []
 var toolTipData = [];

 /*获取地图数据*/
 mapChart.showLoading();
 var mapFeatures = echarts.getMap(mapName).geoJson.features;
 mapChart.hideLoading();
 var geoCoordMap = {
     '福州': [119.4543, 25.9222],
     '长春': [125.8154, 44.2584],
     '重庆': [107.7539, 30.1904],
     '西安': [109.1162, 34.2004],
     '成都': [103.9526, 30.7617],
     '常州': [119.4543, 31.5582],
     '北京': [116.4551, 40.2539],
     '北海': [109.314, 21.6211],
     '海口': [110.3893, 19.8516],
     '长沙': [113.019455,28.200103],
     '上海': [121.40, 31.73],
     '内蒙古': [106.82, 39.67],
     '青岛': [119.30,35.36],
     '杭州':[118.21,29.11],
     '广州':[113.10,23.21],
     '深圳':[114.05,22.32],
     '乌鲁木齐':[87.33,42.45],
     '海外':[112.0255,16.3313],
     '内网':[122.116,37.509]
 };

 var GZData = [
     [{
         name: '长沙'
     }, {
         name: '福州',
         value: 95
     }],
     [{
         name: '长沙'
     }, {
         name: '长春',
         value: 80
     }],
     [{
         name: '长沙'
     }, {
         name: '重庆',
         value: 70
     }],
     [{
         name: '海口'
     }, {
         name: '西安',
         value: 260
     }],
     [{
         name: '长沙'
     }, {
         name: '成都',
         value: 50
     }],
     [{
         name: '长沙'
     }, {
         name: '常州',
         value: 40
     }],
     [{
         name: '长沙'
     }, {
         name: '北京',
         value: 30
     }],
     [{
         name: '长沙'
     }, {
         name: '北海',
         value: 20
     }],
     [{
         name: '长沙'
     }, {
         name: '海口',
         value: 10
     }],
     [{
         name: '上海'
     }, {
         name: '青岛',
         value: 180
     }],
     [{
         name: '长沙'
     }, {
         name: '内蒙古',
         value: 80
     }],
     [{
         name: '福州'
     }, {
         name: '海外',
         value: 280
     }],
 ];

 var convertData = function (data) {
     var res = [];
     for (var i = 0; i < data.length; i++) {
         var dataItem = data[i];
         var fromCoord = geoCoordMap[dataItem[0].name];
         var toCoord = geoCoordMap[dataItem[1].name];
         if (fromCoord && toCoord) {
             res.push({
                 fromName: dataItem[0].name,
                 toName: dataItem[1].name,
                 coords: [fromCoord, toCoord]
             });
         }
     }
     return res;
 };

 var color = ['#c5f80e'];
 var series = [];

 [
     ['石家庄', GZData]
 ].forEach(function (item, i) {
     series.push({
         name: item[0],
         type: 'lines',
         zlevel: 2,
         symbol: ['none', 'arrow'],
         symbolSize: 10,
         effect: {
             show: true,
             period: 6,
             trailLength: 0,
             symbol: 'arrow',
             symbolSize: 5
         },
         lineStyle: {
             normal: {
                 color: color[i],
                 width: 1,
                 opacity: 0.6,
                 curveness: 0.2
             }
         },
         data: convertData(item[1])
     }, {
         name: item[0],
         type: 'effectScatter',
         coordinateSystem: 'geo',
         zlevel: 2,
         rippleEffect: {
             brushType: 'stroke'
         },
         label: {
             normal: {
                 show: true,
                 position: 'right',
                 formatter: '{b}'
             }
         },
         symbolSize: function (val) {
             return val[2] / 8;
         },
         itemStyle: {
             normal: {
                 color: color[i]
             }
         },
         data: item[1].map(function (dataItem) {
             return {
                 name: dataItem[1].name,
                 value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
             };
         })
     });
 });

 option = {
     tooltip: {
         trigger: 'item'
     },
     geo: {
         map: 'china',
         label: {
             emphasis: {
                 show: false
             }
         },
         roam: false,
         itemStyle: {
             normal: {
                 //          	color: '#ddd',
                 borderColor: 'rgba(147, 235, 248, 1)',
                 borderWidth: 1,
                 areaColor: {
                     type: 'radial',
                     x: 0.5,
                     y: 0.5,
                     r: 0.8,
                     colorStops: [{
                         offset: 0,
                         color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                     }, {
                         offset: 1,
                         color: 'rgba(	47,79,79, .1)' // 100% 处的颜色
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
                 areaColor: '#389BB7',
                 borderWidth: 0
             }
         }
     },
     series: series
 };

 // 使用刚指定的配置项和数据显示图表。
 mapChart.setOption(option);
 window.addEventListener("resize", function () {
     mapChart.resize();
 });