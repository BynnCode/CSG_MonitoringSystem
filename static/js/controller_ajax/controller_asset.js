function get_SpecialInventory(){
    $.ajax({
        url: "/specialInventory",
        success:function (data){
            $(".Num h1").eq(0).text(data.data.router);
            $(".Num h1").eq(1).text(data.data.web);
            $(".Num h1").eq(2).text(data.data.ips);
            $(".Num h1").eq(3).text(data.data.ids);
            $(".Num h1").eq(4).text(data.data.firewall);
            $(".Num h1").eq(5).text(data.data.virtual);
        },
        error:function (){

        }
    })
}

function get_assetEvaluate(){
    $.ajax({
        url: "/assetEvaluate",
        success:function (data){
            assetEvaluateOption.series[0].data =data.data[0];
            assetEvaluateChart.setOption(assetEvaluateOption);

            safeDeviceOption.series[0].data =data.data[1];
            safeDeviceChart.setOption(safeDeviceOption);

            softwareTypeOption.series[0].data =data.data[2];
            softwareTypeChart.setOption(softwareTypeOption);

            deviceTypeChartOption.series[0].data =data.data[1];
            deviceTypeChart.setOption(deviceTypeChartOption);
        },
        error:function (){

        }
    })
}

function get_srcVulnerability(){
    $.ajax({
        url: "/srcVulnerability",
        success:function (data){
            srcVulnerabilityOption.yAxis.data =data.data[0];
            srcVulnerabilityOption.series[0].data =data.data[1];
            srcVulnerabilityChart.setOption(srcVulnerabilityOption);

        },
        error:function (){

        }
    })
}

function get_assetVulnerability(){
    $.ajax({
        url: "/assetVulnerability",
        success:function (data){
            assetVulnerabilityOption.yAxis.data =data.data[0];
            assetVulnerabilityOption.series[0].data =data.data[1];
            assetVulnerabilityChart.setOption(assetVulnerabilityOption);

        },
        error:function (){

        }
    })
}

function get_localAsset(){
    $.ajax({
        url: "/localAsset",
        success:function (data){
            LocalOption.yAxis.data =data.data[0];
            LocalOption.series[0].data =data.data[1];
            LocalChart.setOption(LocalOption);

        },
        error:function (){

        }
    })
}



get_SpecialInventory();
get_assetEvaluate();
get_srcVulnerability();
get_assetVulnerability();
get_localAsset();


