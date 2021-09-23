
function get_netTotalStats(){
    $.ajax({
        url:'/netRate',
        success: function (data) {
            $(".Num h1").eq(0).text(data.data.uplinkrate)
            $(".Num h1").eq(2).text(data.data.downlinkrate)
            // $(".Num h1").eq(2).text(data.data.uplinkrate)
        },
        error: function () {

        }
    })
}

function get_netStats(){
    $.ajax({
        url:'/totalStatics',
        success: function (data) {
            $(".Num h1").eq(4).text(data.data.warnflow)
            $(".Num h1").eq(5).text(data.data.localhost)
            $(".Num h1").eq(6).text(data.data.remotehost)
            $(".Num h1").eq(7).text(data.data.onlineNum)
            $(".Num h1").eq(8).text(data.data.offline)
            $(".Num h1").eq(9).text(data.data.activeFlow)
        },
        error: function () {

        }
    })
}


// get_netTotalStats()
// get_netStats()


setInterval(get_netTotalStats,1000)
setInterval(get_netStats,1000 * 5)