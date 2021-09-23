var centerTerminalDetailChart = echarts.init(document.getElementById('center-terminal-detail'));

var centerTerminalDetailOption = {

    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
        },
    series: {
        type: 'sankey',
        layout: 'none',
        left:'3%',
        right:'7%',
//        textStyle: {
//        color = "#fff"
//         },
        lineStyle: {
            color: 'source',
            curveness: 0.5
            },
        emphasis: {
            focus: 'adjacency'
        },

        data: [{
            name: '192.168.128.1',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#28cad8'
    	    }
        }, {
            name: 'Localhost',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#fc853e'
    	    }
        }, {
            name: '173.24.56.72',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#9564bf'
    	    }
        },{
            name: '192.168.1.2',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#bd407e'
    	    }
        }, {
            name: '192.168.1.4',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#37A2FF'
    	    }
        }, {
            name: '178.62.3.29',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#FFBF00'
    	    }
        }, {
            name: '178.35.84.125',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#FFBF00'
    	    }
        }, {
            name: '178.62.5.84',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#80FFA5'
    	    }
        }, {
            name: '175.24.84.198',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#80FFA5'
    	    }
        }, {
            name: '175.24.9.126',
            label:{
                color:'#fff'
            },
            itemStyle: {
    	        color: '#CAFF70'
    	    }
        }],


        links: [{
            source: '192.168.128.1',
            target: 'Localhost',
            value: 110
        },{
            source: 'Localhost',
            target: '173.24.56.72',
            value: 110
        }, {
            source: '192.168.1.2',
            target: '178.62.3.29',
            value: 3
        }, {
            source: '192.168.1.2',
            target: '175.24.84.198',
            value: 3
        }, {
            source: '192.168.1.4',
            target: '178.35.84.125',
            value: 3
        },{
            source: '192.168.1.4',
            target: '178.62.5.84',
            value: 3
        },{
            source: '178.62.3.29',
            target: '175.24.9.126',
            value: 3
        }, {
            source: '178.35.84.125',
            target: '175.24.84.198',
            value: 3
        }, {
            source: '178.62.5.84',
            target: '175.24.9.126',
            value: 3
        }]
    }
};

centerTerminalDetailChart.setOption(centerTerminalDetailOption);
