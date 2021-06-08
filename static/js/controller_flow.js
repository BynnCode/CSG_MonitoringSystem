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
            for (var i = 0; i<10; i++){
                flowHotpointOption.series[0].data[i].name =data.data[i][0];
                flowHotpointOption.series[0].data[i].value =data.data[i][1];
            }
            flowHotpointChart.setOption(flowHotpointOption);
        },
        error:function (){

        }
    })
}

get_viewQueryAssets();
get_flowTimeRank();
get_flowHotpoint();
