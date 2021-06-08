# -*- codeing = utf-8 -*-
import taos
import random
#配置TDengine的全局主机名
hostname = "td1"

#连接数据库
def get_conn():
    conn = taos.connect(host=hostname, user="root", password="taosdata", config="C:\\TDengine\\cfg")
    cursor = conn.cursor()
    return conn,cursor
#关闭数据库
def close_conn(conn,cursor):
    if cursor:
        cursor.close()
    if conn:
        conn.close()
#数据库查询
def query(database,sql):
    conn, cursor = get_conn()
    try:
        cursor.execute(database)
        cursor.execute(sql)
    except Exception as err:
        cursor.close()
        conn.close()
        raise (err)
    datalist = cursor.fetchall()
    close_conn(conn, cursor)
    return datalist

def get_queryAssetProportionData():
    database = 'use suricata'
    sql = 'select * from suricata.t_bfwzc'
    res = query(database,sql)
    return res

def get_flowTimeRankData():
    database = 'use suricata'
    sql = 'select * from suricata.t_dqllqs'
    res = query(database,sql)
    return res

def get_testMapData():
    database = 'use suricata'
    sql = 'select * from suricata.t_lldqfb'
    res = query(database, sql)
    return res

def tesMapDataJson():
    res = get_testMapData()
    testMapData = []
    d1, d2, d3, d4, d5, d6, d7 = {}, {}, {}, {}, {}, {}, {}
    for re in res:
        d1[re[1]] = re[2]
        d2[re[1]] = re[3]
        d3[re[1]] = re[4]
        d4[re[1]] = re[5]
        d5[re[1]] = re[6]
        d6[re[1]] = re[7]
        d7[re[1]] = re[8]
    testMapData.append(d1)
    testMapData.append(d2)
    testMapData.append(d3)
    testMapData.append(d4)
    testMapData.append(d5)
    testMapData.append(d6)
    testMapData.append(d7)
    return testMapData


def get_flowHotpoint():
    database = 'use suricata'
    sql = 'select city,d1 from suricata.t_lldqfb'
    res = query(database, sql)
    res = sorted(res, key=(lambda x: x[1]))
    res.reverse()
    return res[0:10]

def get_normalAndAbnormalFlow():
    database = 'use suricata'
    sql = 'select * from suricata.t_zcyclltj'
    temp = query(database, sql)
    res = []
    res.append({"value":temp[0][1],"name":'正常流量'})
    res.append({"value":temp[0][2],"name":'异常流量'})
    return res

if __name__ == '__main__':

    print(get_normalAndAbnormalFlow())
    # print(res[0:10])
    # viewAssetData = []
    # res_queryAsset = get_queryAssetProportionData()
    # for i in range(len(res_queryAsset)):
    #     if (i == 0):
    #         continue
    #     temp = {"value": res_queryAsset[i][2], "name": res_queryAsset[i][1]}
    #     viewAssetData.append(temp)
    # print(viewAssetData)