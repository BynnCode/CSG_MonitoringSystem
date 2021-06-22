function get_normalAndAbnormal(){
    $.ajax({
        url: "/normalAndAbnormalFlow",
        success:function (data){
            normalAndAbnormalFlowOption.series[0].data = data.data;
            normalAndAbnormalFlowChart.setOption(normalAndAbnormalFlowOption);
        },
        error:function (){

        }
    })
}

function get_attackType(){
    $.ajax({
        url: "/attackType",
        success:function (data){
            $(".num h1").eq(0).text(data.data.dos);
            $(".num h1").eq(1).text(data.data.brute_force);
            $(".num h1").eq(2).text(data.data.info_detection);
            $(".num h1").eq(3).text(data.data.virus_trojan);
            $(".num h1").eq(4).text(data.data.application_attacks);
            $(".num h1").eq(5).text(data.data.others);
        },
        error:function (){

        }
    })
}

function get_flowTrend(){
    $.ajax({
        url: "/flowTrend",
        success:function (data){
            flowTrendOption.xAxis[0].data = data.data[0];
            flowTrendOption.series[0].data = data.data[1];

            flowTrendChart.setOption(flowTrendOption);
        },
        error:function (){

        }
    })
}

get_normalAndAbnormal()
get_attackType()
get_flowTrend()
