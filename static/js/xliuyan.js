let xLiuyanList=function () {
    var con= {
        template: `<div style="text-align: center;">
                      <div v-for="(liuyan,index) in list" class="cardLiuyan">
                        <Card dis-hover style="border-radius: 2px;height: 80px;">
                            <div style="margin-left: 10px">           
                               <div style="margin-top: -10px;"><span>留言:</span>&nbsp;&nbsp;<span style="color: #2db7f5;">{{liuyan.content}}</span></div>
                               <div v-if="liuyan.reply" style="margin-top: 10px;"><span>回复:</span>&nbsp;&nbsp;<span style="color: #2db7f5;">{{liuyan.reply}}</span></div>
                               <div v-else style="margin-top: 10px;"></div>                            
                               <div style="float: right;margin-top: -16px;"><span>{{liuyan.createtime}}</span></div>
                               
                            </div>
                            
                        </Card>
                      </div>
                      <div class="indexPageData">
                         <i-button type="warning" ghost @click="prePage()" :disabled="predisabled">上一页</i-button>
                         <i-button type="warning" ghost @click="nextPage()" style="margin-left: 40px;" :disabled="nextdisabled">下一页</i-button>
                      </div>
                      <div style="margin-left: 40px;margin-top: 40px;margin-right: 40px;">
                           <i-input v-model="content" type="textarea" :rows="4" placeholder="输入留言" />
                           <i-button type="success" size="large" style="width: 80px;" @click="saveLiuyan()" style="margin-top: 10px">发表留言</i-button>
                        </div>
                   </div>`,
        data () {
            return {
                list:[{
                    content: '',
                    reply: '',
                    createtime: '',
                    replytime: '',
                }],
                predisabled:true,
                nextdisabled:true,
                currentPage:1,
                totalPage:0,
                content:'',
            }
        },
        created (){
            this.getLiuyans()
        },
        methods: {
            getLiuyans(){
                var self=this
                axios.post("/api/getLiuyans?start="+self.currentPage)
                    .then(function (res) {
                        console.log(res.data)
                        if (res.data.code == 0){
                            self.list= res.data.data.list
                            self.totalPage=res.data.data.totalPage
                            if(self.totalPage>self.currentPage){
                                self.nextdisabled=false
                            }else{self.nextdisabled=true}

                            if(self.currentPage>1){
                                self.predisabled=false
                            }else{self.predisabled=true}
                        } else{
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            view(index){
                sys.aid=this.list[index].id
                sys.componentContent='xartDetail'
            },
            prePage(){
                this.currentPage-=1
                this.getLiuyans()
            },
            nextPage(){
                this.currentPage+=1
                this.getLiuyans()
            },
            saveLiuyan(){
                var self=this;
                let param = new FormData(); //创建form对象
                param.append('reply','');//通过append向form对象添加数据
                param.append('content',self.content);
                let config = {
                    headers:{'Content-Type':'x-www-form-urlencoded'}
                }; //添加请求头
                axios.post("/api/saveLiuyan",param,config)
                    .then(function (res) {
                        console.log(res.data)
                        if(res.data.code == 0){
                            self.$Message.success({
                                content: '保存成功',
                                duration: 2
                            })
                        self.getLiuyans();
                        }else{
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
