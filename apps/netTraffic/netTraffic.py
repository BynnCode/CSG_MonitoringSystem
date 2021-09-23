from flask import Blueprint,render_template,jsonify
from apps.controller import utils
import random


netTraffic_bp = Blueprint('netTraffic',__name__)




@netTraffic_bp.route('/networkTraffic')
def netStatus():
    return render_template("networkTraffic.html")

@netTraffic_bp.route('/netRate', methods=['get', 'post'])
def get_netTotalStats():
    uplinkrate = format(random.uniform(10,60),".2f")
    downlinkrate = format(random.uniform(10,100),".2f")
    # uplinkrate,downlinkrate,warnflow,localhost,remotehost,onlinenum,offline,activeflow

    temp = {"uplinkrate":uplinkrate,"downlinkrate":downlinkrate}


    return jsonify({"data":temp})

@netTraffic_bp.route('/totalStatics',methods=['get', 'post'])
def get_netStats():

    warnFlow = random.randint(0,20)
    localHost = random.randint(20,80)
    remoteHost = random.randint(100,300)
    onlineNum = random.randint(0,100)
    offline = random.randint(0,40)
    activeFlow = random.randint(1000,10000)

    temp = {"warnflow":warnFlow,"localhost":localHost,"remotehost":remoteHost,"onlineNum":onlineNum,"offline":offline,"activeFlow":activeFlow}

    return jsonify({"data":temp})


