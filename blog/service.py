from flask import Flask, request
from blog import control,dbConn,des
import urllib.parse
import os,sys

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
    mysql.dispose()
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
    start=int(start)
    size=int(size)
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
    mysql.dispose()
    if ret:
        print(ret)
        for row in ret:
            article ={"id":row[0],"title":row[1],"content":row[2],"likecount":row[3],"readcount":row[4],"updatetime":str(row[6])[0:10],"createtime":str(row[7])[0:10],"coverimg":row[10]}
            list.append(article)
        data['list']=list
        data['start']=start
        data['size']=size
        data['total']=total
        ys=total % size
        if ys == 0:
            data['totalPage']=int(total / size)
        else:
            data['totalPage']=int(total / size) +1
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
        mysql.dispose()
        return control.okData(data)
    # 查询列表
    sql = "SELECT a.*,(likecount+readcount) as nsort FROM article a ORDER BY a.createtime DESC,nsort DESC LIMIT %(start)s,%(size)s;"
    page={"start":start,"size":size}
    ret = mysql.getAll(sql, page)
    mysql.dispose()
    if ret:
        print(ret)
        for row in ret:
            title=row[1]
            if len(title)>36:
                title=str(row[1])[0:36]
            article ={"id":row[0],"title":title,"content":row[2],"likecount":row[3],"readcount":row[4],"updatetime":str(row[6])[0:10],"createtime":str(row[7])[0:10],"coverimg":row[10]}
            list.append(article)
        data['list']=list
        data['start']=start
        data['size']=size
        data['total']=total
        ys=total % size
        if ys == 0:
            data['totalPage']=int(total / size)
        else:
            data['totalPage']=int(total / size) +1
        return control.okData(data)
    else:
        print(ret)
    return control.error()

# 获取文章详情
def getArticleDetail():
    args = request.args
    id =args.get('id')
    if id == None:
        return control.errorMsg('请输入文章id')
    id=int(id)
    data ={}
    # 查询列表
    sql = "SELECT * FROM article WHERE id=%(id)s;"
    param={"id":id}
    mysql = dbConn.Mysql()
    ret = mysql.getOne(sql, param)
    if ret:
        print(ret)
        data['id']=ret[0]
        data['title']=ret[1]
        data['content']=ret[2]
        data['likecount']=ret[3]
        data['likecount']=ret[4]
        data['createtime']=str(ret[7])[0:10]
        data['coverimg']=ret[10]
        sql2="update article set readcount=readcount+1 where id=%(id)s;"
        ret2 = mysql.update(sql2,param)
        mysql.dispose()
        return control.okData(data)
    else:
        print(ret)
    mysql.dispose()
    return control.error()

# 获取评论
def getComments():
    args = request.args
    start =args.get('start')
    size = args.get('size')
    id =args.get('id')
    if id == None:
        return control.errorMsg('请输入文章id')
    id=int(id)
    if start == None:
        start = 1
    if size == None:
        size = 5
    start=int(start)
    start = (start-1)*size
    total=0
    data ={}
    list =[]
    # 查询总条数
    mysql = dbConn.Mysql()
    sql0 = "SELECT count(1) FROM comment WHERE articleid=%(id)s AND parentid=0;"
    param={"id":id}
    ret0 = mysql.getOne(sql0, param)
    if ret0:
        print(ret0)
        total=ret0[0]
    if total == 0:
        data['list']=list
        data['start']=start
        data['size']=size
        data['totalCount']=total
        data['totalPage']=0
        mysql.dispose()
        return control.okData(data)
    # 查询列表
    sql = "SELECT * FROM comment WHERE articleid=%(id)s AND parentid=0 ORDER BY createtime DESC LIMIT %(start)s,%(size)s;"
    page = {"id": id, "start": start, "size": size}
    ret = mysql.getAll(sql, page)
    if ret:
        print(ret)
        for row in ret:
            comm={"id":row[0],"username":row[2],"content":row[4],"createtime":str(row[8])}
            list.append(comm)
        data['list']=list
        data['start']=start
        data['size']=size
        data['total']=total
        ys=total % size
        if ys == 0:
            data['totalPage']=int(total / size)
        else:
            data['totalPage']=int(total / size) +1
        mysql.dispose()
        return control.okData(data)
    else:
        print(ret)
    mysql.dispose()
    return control.error()

def register():
    args = request.args
    name =args.get('name')
    pwd = args.get('pwd')
    if name == None:
        return control.errorMsg('请输入姓名')
    if pwd == None:
        return control.errorMsg('请输入密码')
    user={"name":name,"pwd":pwd}
    mysql = dbConn.Mysql()
    sql0 = "SELECT count(1) FROM comment WHERE articleid=%(id)s AND parentid=0;"
    ret0 = mysql.getOne(sql0, None)
    taotal=0
    if ret0:
        total=ret0[0]
    if taotal== 0:
        sql="insert into user(name,pwd,createtime,updatetime) values (%(name)s,%(pwd)s,NOW(),NOW());"
        ret=mysql.insertOne(sql,user)
        mysql.dispose()
        if ret:
            # 注册成功自动登录
            user2={"uid":ret[0],"name":name}
            blogid = des.enc(user2)
            return control.okAndSetCookie(blogid)
        else:
            return control.errorMsg('注册失败')
    else:
        mysql.dispose()
        return control.errorMsg('用户已存在')

def saveArticle():
    args = request.args
    title = request.form['title']
    content =  request.form['content']
    coverimg = request.form['coverimg']
    id =args.get('id')
    if title == None:
        return control.errorMsg('请输入标题')
    if content == None:
        return control.errorMsg('请输入内容')
    if coverimg == None:
        return control.errorMsg('请输入封面')
    if id != None:
       id=int(id)
    article={"id":id,"title":title,"content":content,'authorname':'管理员',"coverimg":coverimg}
    mysql = dbConn.Mysql()
    sql="insert into article(title,content,authorid,authorname,createtime,updatetime,coverimg) values (%(title)s,%(content)s,1,%(authorname)s,NOW(),NOW(),%(coverimg)s);"
    if id != None:
        sql="update article set title=%(title)s,content=%(content)s,updatetime=NOW(),coverimg=%(coverimg)s where id=%(id)s;"
    print(sql)
    ret=mysql.update(sql,article)
    mysql.dispose()
    if ret:
        return control.ok()
    else:
        return control.errorMsg('保存失败')

def saveComment():
    args = request.args
    articleid =args.get('articleid')
    content = args.get('content')
    if articleid == None:
        return control.errorMsg('请输入文章ID')
    if content == None:
        return control.errorMsg('请输入内容')
    content=urllib.parse.unquote(content)
    articleid=int(articleid)
    username='网友'
    mysql = dbConn.Mysql()
    sql="insert into comment(articleid,content,userid,username,parentid,createtime,updatetime) value(%s,'%s',0,'%s',0,NOW(),NOW());" % (articleid,content,username)
    print(sql)
    ret=mysql.insertOne(sql)
    mysql.dispose()
    if ret:
        return control.ok()
    else:
        return control.errorMsg('回复失败')


def likeArticle():
    args = request.args
    id =args.get('id')
    if id == None:
        return control.errorMsg('请输入文章ID')
    id=int(id)
    mysql = dbConn.Mysql()
    param={"id":id}
    sql="update article set likecount=likecount+1 where id=%(id)s;"
    print(sql)
    ret=mysql.update(sql,param)
    mysql.dispose()
    if ret:
        return control.ok()
    else:
        return control.errorMsg('回复失败')

def upload():
    images = request.files.get('file')
    # 得到upload的路径
    upload_dir = os.path.join(os.path.join(sys.path[0],'static'), 'upload')
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    url = os.path.join(upload_dir,images.filename)
    print(url)
    images.save(url)
    realurl=os.path.join(request.host_url,'static/upload/'+images.filename)
    data={"url":realurl}
    return control.okData(data)

def delArticle():
    args = request.args
    id =args.get('id')
    if id == None:
        return control.errorMsg('请输入文章ID')
    id=int(id)
    mysql = dbConn.Mysql()
    param={"id":id}
    sql="delete from article where id=%(id)s;"
    print(sql)
    ret=mysql.update(sql,param)
    mysql.dispose()
    if ret:
        return control.ok()
    else:
        return control.errorMsg('操作失败')


# 获取最新列表
def getLiuyans():
    args = request.args
    start =args.get('start')
    size = args.get('size')
    if start == None:
        start = 1
    if size == None:
        size = 10
    start=int(start)
    size=int(size)
    start = (start-1)*size
    total=0
    data ={}
    list =[]
    # 查询总条数
    mysql = dbConn.Mysql()
    sql0 = "SELECT count(1) FROM liuyan;"
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
    sql = "SELECT id,content,reply,createtime,replytime FROM liuyan ORDER BY createtime DESC LIMIT %(start)s,%(size)s;"
    page={"start":start,"size":size}
    ret = mysql.getAll(sql, page)
    mysql.dispose()
    if ret:
        print(ret)
        for row in ret:
            replytime=''
            if row[4] !=None:
                replytime=str(row[4])[0:10]
            liuyan ={"id":row[0],"content":row[1],"reply":row[2],"createtime":str(row[3])[0:10],"replytime":replytime}
            list.append(liuyan)
        data['list']=list
        data['start']=start
        data['size']=size
        data['total']=total
        ys=total % size
        if ys == 0:
            data['totalPage']=int(total / size)
        else:
            data['totalPage']=int(total / size) +1
        return control.okData(data)
    else:
        print(ret)
    return control.error()

def saveLiuyan():
    print(111)
    args = request.args
    content = request.form['content']
    reply = request.form['reply']
    id = args.get('id')
    if id != None:
        id = int(id)
    article = {"id": id, "content": content}
    mysql = dbConn.Mysql()
    sql = "insert into liuyan(content,createtime) values (%(content)s,NOW());"
    if id != None:
        article = {"id": id, "reply": reply}
        sql = "update liuyan set reply=%(reply)s,replytime=NOW() where id=%(id)s;"
    print(sql)
    ret = mysql.update(sql, article)
    mysql.dispose()
    if ret:
        return control.ok()
    else:
        return control.errorMsg('保存失败')


def delLiuyan():
    args = request.args
    id =args.get('id')
    if id == None:
        return control.errorMsg('请输入ID')
    id=int(id)
    mysql = dbConn.Mysql()
    param={"id":id}
    sql="delete from liuyan where id=%(id)s;"
    print(sql)
    ret=mysql.update(sql,param)
    mysql.dispose()
    if ret:
        return control.ok()
    else:
        return control.errorMsg('操作失败')
