# -*- codeing = utf-8 -*-
from flask import Blueprint, render_template, jsonify
from apps.controller import utils

flow_bp = Blueprint('flow',__name__)

# 页面路由转发
@flow_bp.route('/')
def index():
    testMapData = utils.tesMapDataJson()
    return render_template("flow.html", testMapData=testMapData)

@flow_bp.route('/flow')
def flow():
    return index()


# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据
@flow_bp.route('/queryAssets', methods=['get', 'post'])
def queryAssets():
    viewAssetData = []
    res_queryAsset = utils.get_queryAssetProportionData()
    for i in range(len(res_queryAsset)):
        if (i == 0):
            continue
        temp = {"value": res_queryAsset[i][2], "name": res_queryAsset[i][1]}
        viewAssetData.append(temp)
    return jsonify({"data": viewAssetData})

@flow_bp.route('/flowTimeRank', methods=['get', 'post'])
def flowTimeRank():
    flowTimeRankData = []
    for re in utils.get_flowTimeRankData():
        temp = list(re)
        temp[0] = str(temp[0])
        flowTimeRankData.append(temp)
    return jsonify({"data": flowTimeRankData})

@flow_bp.route('/flowHotpoint', methods=['get', 'post'])
def flowHotpoint():
    flowHotpointData = utils.get_flowHotpoint()
    return jsonify({"data": flowHotpointData})
