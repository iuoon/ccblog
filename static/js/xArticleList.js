let xArtList=function () {
    var con= {
        template: `<div style="text-align: center;">
                      <div v-for="(article,index) in list" class="cardArticle">
                        <Card dis-hover style="border-radius: 2px;height: 130px;">
                            <div style="float: left">
                                <img :src="article.coverimg" width="200px" height="100px" >                                
                            </div>
                            <div style="margin-left: 210px">           
                               <div style="float:left;margin-top: -80px;"><a href="javascript:void(0)" @click="view(index)"  style="color: #2db7f5;">{{article.title}}</a></div>
                               <div style="margin-top: 80px;">                                    
                                    <span><Icon type="ios-eye-outline" size="24"></Icon></span><span>({{article.readcount}})</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span><Icon type="ios-heart-outline" size="20"></Icon></span><span><span>({{article.likecount}})</span>                               
                               </div>                              
                               <div style="float: right;margin-top: -16px;"><span>{{article.createtime}}</span></div>
                               
                            </div>
                            
                        </Card>
                      </div>
                      <div class="indexPageData">
                         <i-button type="warning" ghost @click="prePage()" :disabled="predisabled">上一页</i-button>
                         <i-button type="warning" ghost @click="nextPage()" style="margin-left: 40px;" :disabled="nextdisabled">下一页</i-button>
                      </div>
                   </div>`,
        data () {
            return {
                list:[{
                    title: '',
                    icon: '',
                    likecount: 0,
                    readcount:0,
                    createtime:'',
                    }],
                predisabled:true,
                nextdisabled:true,
                currentPage:1,
                totalPage:0,
            }
        },
        created (){
           this.getArticles()
        },
        methods: {
            getArticles(){
                console.log(1111)
                var self=this
                axios.post("/api/getArticles?start="+self.currentPage)
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
                this.getArticles()
            },
            nextPage(){
                this.currentPage+=1
                this.getArticles()
            }
        }
    }
    return con
}
