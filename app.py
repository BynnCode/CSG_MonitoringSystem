# -*- codeing = utf-8 -*-
from flask import Flask,render_template,jsonify
import utils

app = Flask(__name__)

# 页面路由转发
@app.route('/')
def index():
    testMapData = utils.tesMapDataJson()
    return render_template("flow.html", testMapData=testMapData)

@app.route('/flow')
def flow():
    return index()

@app.route('/suricata')
def suricata():
    attackDisplayData = utils.get_attackDisplay()
    return render_template("suricata.html",attackDisplayData=attackDisplayData)

@app.route('/assetManage')
def assetManage():
    return render_template("assetManage.html")

@app.route('/logAnalyze')
def logAnalyze():
    return render_template("logAnalyze.html")

@app.route('/monitor')
def monitor():
    return render_template("monitor.html")

# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据

@app.route('/queryAssets',methods=['get','post'])
def queryAssets():
    viewAssetData = []
    res_queryAsset = utils.get_queryAssetProportionData()
    for i in range(len(res_queryAsset)):
        if (i == 0):
            continue
        temp = {"value": res_queryAsset[i][2], "name": res_queryAsset[i][1]}
        viewAssetData.append(temp)
    return jsonify({"data":viewAssetData})

@app.route('/flowTimeRank',methods=['get','post'])
def flowTimeRank():
    flowTimeRankData = []
    for re in utils.get_flowTimeRankData():
        temp = list(re)
        temp[0] = str(temp[0])
        flowTimeRankData.append(temp)
    return jsonify({"data": flowTimeRankData})

@app.route('/flowHotpoint',methods=['get','post'])
def flowHotpoint():
    flowHotpointData = utils.get_flowHotpoint()
    return jsonify({"data": flowHotpointData})

@app.route('/normalAndAbnormalFlow',methods=['get','post'])
def normalAndAbnormalFlow():
    normalAndAbnormalFlowData = utils.get_normalAndAbnormalFlow()
    return jsonify({"data":normalAndAbnormalFlowData})

@app.route('/attackType',methods=['get','post'])
def attackType():
    attackTypeData = utils.get_attackType()
    return jsonify({"data":attackTypeData})

if __name__ == '__main__':
    app.run()
