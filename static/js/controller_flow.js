//该js文件用来ajax局部刷新表格数据，通过app.py里后台返回的数据，通过相同的url进行接受后台返回的数据，然后利用ajax局部更新到对应的表格dom上
function get_viewQueryAssets(){
    $.ajax({
        url: "/queryAssets",
        success:function (data){
            queryAssetOption.series[0].data =data.data;

            queryAssetChart.setOption(queryAssetOption);
        },
        error:function (){

        }
    })
}

function get_flowTimeRank(){
    $.ajax({
        url: "/flowTimeRank",
        success:function (data){
            flowTimeChartOption.series[0].data =data.data;

            flowTimeChart.setOption(flowTimeChartOption);
        },
        error:function (){

        }
    })
}

function get_flowHotpoint(){
    $.ajax({
        url: "/flowHotpoint",
        success:function (data){
            //先加载默认1min的数据
            for (var i = 0; i<10; i++){
                flowHotpointOption.series[0].data[i].name =data.data[0][i][0];
                flowHotpointOption.series[0].data[i].value =data.data[0][i][1];
            }
            flowHotpointChart.setOption(flowHotpointOption);
            //通过下拉选项选择对应时间内的数据
            $(".timeid1").on('click',function (){
                var value = $(".timeid1").val();
                if (value == 1){
                    for (var i = 0; i<10; i++){
                        flowHotpointOption.series[0].data[i].name =data.data[0][i][0];
                        flowHotpointOption.series[0].data[i].value =data.data[0][i][1];
                    }
                    flowHotpointChart.setOption(flowHotpointOption);
                }
                else if(value == 2){
                    for (var i = 0; i<10; i++){
                        flowHotpointOption.series[0].data[i].name =data.data[1][i][0];
                        flowHotpointOption.series[0].data[i].value =data.data[1][i][1];
                    }
                    flowHotpointChart.setOption(flowHotpointOption);
                }
                else if (value == 3){
                    for (var i = 0; i<10; i++){
                        flowHotpointOption.series[0].data[i].name =data.data[2][i][0];
                        flowHotpointOption.series[0].data[i].value =data.data[2][i][1];
                    }
                    flowHotpointChart.setOption(flowHotpointOption);
                }
                else if (value == 4){
                    for (var i = 0; i<10; i++){
                        flowHotpointOption.series[0].data[i].name =data.data[3][i][0];
                        flowHotpointOption.series[0].data[i].value =data.data[3][i][1];
                    }
                    flowHotpointChart.setOption(flowHotpointOption);
                }
                else if (value == 5){
                    for (var i = 0; i<10; i++){
                        flowHotpointOption.series[0].data[i].name =data.data[4][i][0];
                        flowHotpointOption.series[0].data[i].value =data.data[4][i][1];
                    }
                    flowHotpointChart.setOption(flowHotpointOption);
                }
                else if (value == 6){
                    for (var i = 0; i<10; i++){
                        flowHotpointOption.series[0].data[i].name =data.data[5][i][0];
                        flowHotpointOption.series[0].data[i].value =data.data[5][i][1];
                    }
                    flowHotpointChart.setOption(flowHotpointOption);
                }
                else if (value == 7){
                    for (var i = 0; i<10; i++){
                        flowHotpointOption.series[0].data[i].name =data.data[6][i][0];
                        flowHotpointOption.series[0].data[i].value =data.data[6][i][1];
                    }
                    flowHotpointChart.setOption(flowHotpointOption);
                }
                else{
                    flowHotpointChart.clear();
                }
            })

        },
        error:function (){

        }
    })
}




get_viewQueryAssets();
get_flowTimeRank();
get_flowHotpoint();
