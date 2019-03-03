let xArtDetail=function () {
    var con= {
        template: `<div class="detailContent">       
                        <br>                                  
                        <div style="color: #2db7f5;font-size: large;margin-top: 20px;">
                           <span style="">{{article.title}}</span>
                        </div>
                        <div>
                           <img src="http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg" style="width: 500px;height: 300px;margin-top: 30px;">
                        </div>
                        <div style="margin-left:10px;margin-top: 40px;">
                          <div style="font-size: medium">{{article.content}}</div>
                        </div>  
                        <div>
                           <i-button type="success" ghost size="large"  @click="likeArticle()" style="margin-top: 10px;width: 100px;"">点赞</i-button>
                        </div>
                        <div style="text-align: left;font-size: medium;margin-left: 40px;margin-top: 40px;margin-right: 40px;">
                           <div><span style="color: #2db7f5">评论：</span></div>
                           <div v-for="(comment,index) in list" style="border: 1px solid #9dcaea;border-radius: 4px;margin-top: 6px">
                               <div><span>{{comment.createtime}}</span>&nbsp;<span>{{comment.username}}：</span></div>
                               <div>
                                 <span>{{comment.content}}</span>
                               </div>
                           </div>
                        </div>  
                        <div style="margin-left: 40px;margin-top: 40px;margin-right: 40px;">
                           <i-input v-model="commentContent" type="textarea" :rows="4" placeholder="回复内容" />
                           <i-button type="success" size="large" style="width: 80px;" @click="saveComment()" style="margin-top: 10px">发表回复</i-button>
                        </div>                  
                   </div>`,
        data () {
            return {
                article:{
                    id:'',
                    title:'',
                    content:'',
                },
                list:[],
                totalPage:0,
                commentContent:''
            }
        },
        created (){
            this.getArticleDetail()
            this.getComments()
        },
        methods: {
            getArticleDetail(){
                var self=this
                axios.post("/api/getArticleDetail?id="+sys.aid)
                    .then(function (res) {
                        console.log(res.data)
                        if (res.data.code == 0){
                            self.article= res.data.data
                        } else{
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            getComments(){
                var self=this
                axios.post("/api/getComments?id="+sys.aid)
                    .then(function (res) {
                        console.log('getComments',res.data)
                        if (res.data.code == 0){
                            self.list= res.data.data.list
                            self.totalPage=res.data.data.totalPage
                        } else{
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            likeArticle(){
                var self=this
                axios.post("/api/likeArticle?id="+sys.aid)
                    .then(function (res) {
                        if (res.data.code == 0){
                            self.$Message.success({
                                content: '点赞成功',
                                duration: 2
                            });
                        } else{
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            saveComment(){
                var self=this
                if(self.commentContent.length<6){
                    this.$Message.warning({
                        content: '回复字数必须大于6个',
                        duration: 2
                    });
                    return
                }
                axios.post("/api/saveComment?articleid="+sys.aid+"&content="+self.commentContent)
                    .then(function (res) {
                        if (res.data.code == 0){
                            self.$Message.success({
                                content: '回复成功',
                                duration: 2
                            });
                            self.commentContent='';
                            self.getComments();
                        } else{
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }
    return con
}
