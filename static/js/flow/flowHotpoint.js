var flowHotpointChart = echarts.init(document.getElementById('flow_hotpoint'));
var colorList = [[
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
    '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
    ],
    [
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
    ],
    [
    '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
    '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51', 
    '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe', 
    '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
    ]][2];
var flowHotpointOption = {
	// 图表标题
    
    backgroundColor: '#070b12',
    tooltip: {},
    animationDurationUpdate: function(idx) {
        // 越往后的数据延迟越大
        return idx * 100;
    },
    animationEasingUpdate: 'bounceIn',
    color: ['#fff', '#fff', '#fff'],
    series: [{
        type: 'graph',
        layout: 'force',
        force: {
            repulsion: 300,
            edgeLength: 10
        },
        roam: true,
        label: {
            normal: {
                show: true
            }
        },
        data: [{
            "name": "",
            "value": 2373,
            "symbolSize": 148,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[0],
                    "color": colorList[0]
                }
            }
        }, {
            "name": "",
            "value": 5449,
            "symbolSize": 137,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[1],
                    "color": colorList[2]
                }
            }
        }, {
            "name": "",
            "value": 2289,
            "symbolSize": 121,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[2],
                    "color": colorList[4]
                }
            }
        }, {
            "name": "",
            "value": 2518,
            "symbolSize": 109,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[3],
                    "color": colorList[5]
                }
            }
        }, {
            "name": "",
            "value": 4730,
            "symbolSize": 88,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[4],
                    "color": colorList[8]
                }
            }
        }, {
            "name": "",
            "value": 1952,
            "symbolSize": 77,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[5],
                    "color": colorList[11]
                }
            }
        }, {
            "name": "",
            "value": 926,
            "symbolSize": 64,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[6],
                    "color": colorList[12]
                }
            }
        }, {
            "name": "",
            "value": 5668,
            "symbolSize": 55,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[13],
                    "color": colorList[15]
                }
            }
        }, {
            "name": "",
            "value": 339,
            "symbolSize": 48,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[14],
                    "color": colorList[17]
                }
            }
        }, {
            "name": "",
            "value": 671,
            "symbolSize": 40,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    // "shadowColor": colorList[15],
                    "color": colorList[19]
                }
            }
        }]
    }]
}
flowHotpointChart.setOption(flowHotpointOption);