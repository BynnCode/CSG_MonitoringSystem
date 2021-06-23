# -*- codeing = utf-8 -*-
from flask import Blueprint, render_template, jsonify
from apps.controller import utils

asset_bp = Blueprint('asset',__name__)

# 页面路由转发
@asset_bp.route('/assetManage')
def assetManage():
    return render_template("assetManage.html")

# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据
@asset_bp.route('/specialInventory', methods=['get', 'post'])
def specialInventory():
    specialInventoryData = utils.get_SpecialInventory()
    return jsonify({"data":specialInventoryData})

@asset_bp.route('/assetEvaluate', methods=['get', 'post'])
def assetEvaluate():
    assetEvaluateData = utils.get_assetEvaluate()
    return jsonify({"data":assetEvaluateData})

@asset_bp.route('/srcVulnerability', methods=['get', 'post'])
def srcVulnerability():
    srcVulnerabilityData = utils.get_srcVulnerability()
    return jsonify({"data":srcVulnerabilityData})