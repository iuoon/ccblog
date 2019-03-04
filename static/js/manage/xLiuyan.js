let xLiuyan=function () {
    var con= {
        template: `<div>
                   <Table border :columns="columns" :data="list">
                        <template slot-scope="{ row, index  }" slot="id">
                            <span>{{ row.id }}</span>
                        </template>
                        <template slot-scope="{ row, index  }" slot="content">                           
                            <span>{{ row.content }}</span>
                        </template>                                             
                        <template slot-scope="{ row, index  }" slot="createtime">
                            <span>{{ row.createtime }}</span>
                        </template>
                        <template slot-scope="{ row, index  }" slot="reply">                          
                            <div><span>{{ row.reply }}</span></div>
                        </template>
                        <template slot-scope="{ row, index  }" slot="replytime">
                            <span>{{ row.replytime }}</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                           <div>
                              <Button type="info" size="small" ghost style="margin-right: 5px" @click="reply(index)">回复</Button>
                              <Button type="error" size="small"  ghost @click="delLiuyan(index)">删除</Button>
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
                        title: '留言内容',
                        slot: 'content',
                    },
                    {
                        title: '留言时间',
                        slot: 'createtime',
                    },
                    {
                        title: '回复内容',
                        slot: 'reply',
                    },
                    {
                        title: '回复时间',
                        slot: 'replytime',
                    },
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
                liuyan:{
                    id:0,
                    content:'',
                    reply:'',
                    createtime:'',
                    replytime:'',
                },
            }
        },
        created (){
            this.getPageData();//初始化加载数据
        },
        methods: {
            delLiuyan (index) {
                var self=this
                axios.post("/api/delLiuyan?id=" +this.list[index].id)
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
            reply(index){
                var self=this;
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '回复内容',
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        if(this.value.length<2){
                            self.$Message.warning({
                                content: '长度不少于2位',
                                duration: 2
                            })
                            return true;
                        }
                        let param = new FormData(); //创建form对象
                        param.append('reply',this.value);//通过append向form对象添加数据
                        param.append('content',self.list[index].content);
                        let config = {
                            headers:{'Content-Type':'x-www-form-urlencoded'}
                        }; //添加请求头
                        axios.post("/api/saveLiuyan?id=" +self.list[index].id,param,config)
                            .then(function (res) {
                                console.log(res.data)
                                self.list[index].reply=this.value;
                                if(res.data.code == 0){
                                    self.$Message.success({
                                        content: '保存成功',
                                        duration: 2
                                    })

                                }else{
                                    self.$Message.error({
                                        content: res.data.msg,
                                        duration: 2
                                    })
                                }
                            }).catch(function (error) {console.log(error) });
                    },
                    onCancel: () => {

                    }
                });

            },
            getPageData(){
                var self=this
                axios.post("/api/getLiuyans?start=" + this.nCurrentPage+"&size="+this.nPageSize)
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
