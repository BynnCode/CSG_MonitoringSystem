# -*- codeing = utf-8 -*-
from flask import Flask
from apps import settings
from apps.asset.asset import asset_bp
from apps.controller import utils
from apps.flow.flow import flow_bp
from apps.log.log import log_bp
from apps.monitor.monitor import monitor_bp
from apps.suricata.suricata import suricata_bp
from flask_cors import CORS


def create_app():
    app = Flask(__name__,template_folder='../templates',static_folder='../static')  #flask创建对象
    CORS(app,supports_credentials=True)     //解决跨域
    app.config.from_object(settings)    #加载配置
    # app.config.from_pyfile('settings.py')

    # 注册蓝图
    app.register_blueprint(flow_bp)
    app.register_blueprint(suricata_bp)
    app.register_blueprint(asset_bp)
    app.register_blueprint(log_bp)
    app.register_blueprint(monitor_bp)

    return app