let xArticle=function () {
    var con= {
        template: `<div><i-button type="info" ghost @click="addArticle()">发布文章</i-button><br><Divider />
                   <Table border :columns="columns" :data="list">
                        <template slot-scope="{ row, index  }" slot="id">
                            <span>{{ row.id }}</span>
                        </template>
                        <template slot-scope="{ row, index  }" slot="title">                           
                            <span>{{ row.title }}</span>
                        </template>
                        <template slot-scope="{ row, index  }" slot="likecount">                          
                            <div><span>{{ row.likecount }}</span></div>
                        </template>
                        <template slot-scope="{ row, index  }" slot="readcount">                            
                            <span>{{ row.readcount }}</span>
                        </template>                       
                        <template slot-scope="{ row, index  }" slot="createtime">
                            <span>{{ row.createtime }}</span>
                        </template>
                        <template slot-scope="{ row, index  }" slot="updatetime">
                            <span>{{ row.updatetime }}</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                           <div>
                              <Button type="info" size="small" ghost style="margin-right: 5px" @click="editArticle(index)">编辑</Button>
                              <Button type="error" size="small"  ghost @click="delArticle(index)">删除</Button>
                           </div>
                        </template>
                </Table>
                <Divider />
                <Page :total="nPageCount" :current="nCurrentPage" :page-size="nPageSize" show-sizer @on-change="getPageData" @on-page-size-change='getPageData'/>
                </div>`,
        data () {
            return {
                columns:[
                    {
                        title: 'ID',
                        slot: 'id',
                    },
                    {
                        title: '标题',
                        slot: 'title',
                    },
                    {
                        title: '点赞数',
                        slot: 'likecount',
                    },
                    {
                        title: '阅读量',
                        slot: 'readcount',
                    },
                    {
                        title: '发布时间',
                        slot: 'createtime',
                    },
                    {
                        title: '更新时间',
                        slot: 'updatetime',
                    },
                    /*   {
                        title: '封面',
                        slot: 'coverimg',
                    },*/
                    {
                        title: '操作',
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
                list: [
                ],
                nPageSize:10,
                nCurrentPage:1,
                nPageCount:1,
                airticle:{
                    id:0,
                    title:'',
                    content:'',
                    readcount:'',
                    likecount:'',
                    createtime:'',
                    updatetime:'',
                    coverimg:'',
                },
            }
        },
        created (){
            this.getPageData();//初始化加载数据
        },
        methods: {
            updateArticle (index){
                var self=this
                axios.get("/ops/task/updateTask?lId=" +this.list[index].lId+
                    "&strName=" +self.task.strName+
                    "&strTargetUrl=" +self.task.strTargetUrl+
                    "&strCron=" +self.task.strCron+
                    "&strRemark=" +self.task.strRemark)
                    .then(function (res) {
                        console.log(res.data)
                        if(res.data.code == 0){
                            self.list[index].strName = self.task.strName
                            self.list[index].strCron = self.task.strCron
                            self.list[index].strRemark = self.task.strRemark
                            self.list[index].strTargetUrl = self.task.strTargetUrl
                            self.editIndex = -1
                            self.$Modal.success({
                                title: '提示',
                                width: '300px',
                                content: '保存成功'
                            })
                        }else{
                            self.$Modal.error({
                                title: '提示',
                                width: '300px',
                                content: res.data.msg
                            })
                        }
                    }).catch(function (error) {console.log(error) });
            },
            delArticle (index) {
                var self=this
                axios.post("/api/delArticle?id=" +this.list[index].id)
                    .then(function (res) {
                        console.log(res.data)
                        if(res.data.code == 0){
                            self.$Message.success({
                                content: '已删除',
                                duration: 2
                            })
                            self.list.splice(index, 1);
                        }else{
                            self.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            })
                        }
                    }).catch(function (error) {console.log(error) });
            },
            addArticle(){
                g_vue.componentName='comArticleEdit'
            },
            editArticle(index){
                g_vue.aid=this.list[index].id
                g_vue.componentName='comArticleEdit'
            },
            getPageData(){
                var self=this
                axios.post("/api/getArticles?start=" + this.nCurrentPage+"&size="+this.nPageSize)
                    .then(function (res) {
                        console.log(res.data);
                        if (res.data.code == 0){
                            self.nPageCount=res.data.data.nPageCount
                            self.list=res.data.data.list
                        } else{
                            self.$Message.error({
                                content: res.data.msg,
                                duration: 2
                            })
                        }
                    }).catch(function (error) {console.log(error) });
            }
        }
    }
    return con
}
