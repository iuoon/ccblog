from flask import Flask, request
from blog import control,dbConn,des
from datetime import datetime

def login():
    args = request.args
    name =args.get('name')
    pwd = args.get('pwd')
    if name == None:
        return control.errorMsg('请输入姓名')
    if pwd == None:
        return control.errorMsg('请输入密码')
    sql = "SELECT * FROM user WHERE name=%(name)s AND pwd =%(pwd)s;"
    user={"name":name,"pwd":pwd}
    mysql = dbConn.Mysql()
    ret = mysql.getOne(sql, user)
    if ret:
        user2={"uid":ret[0],"name":ret[1]}
        blogid = des.enc(user2)
        return control.okAndSetCookie(blogid)
    else:
        print(ret)
    return control.errorMsg("登录失败")

# 获取最新列表
def getArticles():
    args = request.args
    start =args.get('start')
    size = args.get('size')
    if start == None:
        start = 1
    if size == None:
        size = 10
    start = (start-1)*size
    total=0
    data ={}
    list =[]
    # 查询总条数
    mysql = dbConn.Mysql()
    sql0 = "SELECT count(1) FROM article;"
    ret0 = mysql.getOne(sql0, None)
    if ret0:
        total=ret0[0]
    if total == 0:
        data['list']=list
        data['start']=start
        data['size']=size
        data['totalCount']=total
        data['totalPage']=0
        return control.okData(data)
    # 查询列表
    sql = "SELECT * FROM article ORDER BY createtime DESC LIMIT %(start)s,%(size)s;"
    page={"start":start,"size":size}
    ret = mysql.getAll(sql, page)
    if ret:
        print(ret)
        for row in ret:
            article ={"id":row[0],"title":row[1],"content":row[2],"likecount":row[3],"readcount":row[4],"createtime":str(row[6])[0:10]}
            list.append(article)
        data['list']=list
        data['start']=start
        data['size']=size
        data['total']=total
        return control.okData(data)
    else:
        print(ret)
    return control.error()

def getHotArticles():
    args = request.args
    start =args.get('start')
    size = args.get('size')
    if start == None:
        start = 1
    if size == None:
        size = 10
    size=int(size)
    start = (start-1)*size
    total=0
    data ={}
    list =[]
    mysql = dbConn.Mysql()
    # 查询总条数
    sql0 = "SELECT count(1) FROM article;"
    ret0 = mysql.getOne(sql0, None)
    if ret0:
        total=ret0[0]
    if total == 0:
        data['list']=list
        data['start']=start
        data['size']=size
        data['totalCount']=total
        data['totalPage']=0
        return control.okData(data)
    # 查询列表
    sql = "SELECT a.*,(likecount+readcount) as nsort FROM article a ORDER BY a.createtime DESC,nsort DESC LIMIT %(start)s,%(size)s;"
    page={"start":start,"size":size}
    ret = mysql.getAll(sql, page)
    if ret:
        for row in ret:
            title=row[1]
            if len(title)>36:
                title=str(row[1])[0:36]
            article ={"id":row[0],"title":title,"content":row[2],"likecount":row[3],"readcount":row[4],"createtime":str(row[6])[0:10]}
            list.append(article)
        data['list']=list
        data['start']=start
        data['size']=size
        data['total']=total
        return control.okData(data)
    else:
        print(ret)
    return control.error()
