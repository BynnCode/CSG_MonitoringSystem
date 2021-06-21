# -*- codeing = utf-8 -*-
from flask import Blueprint, render_template

asset_bp = Blueprint('asset',__name__)

# 页面路由转发
@asset_bp.route('/assetManage')
def assetManage():
    return render_template("assetManage.html")

# 后台通过调用utils的函数，实现和TDengine数据库的交互，返回相应页面的表格数据
