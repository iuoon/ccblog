let xArtList=function () {
    var con= {
        template: `<div>
                      <div v-for="(article,index) in list" class="cardArticle">
                        <Card dis-hover style="border-radius: 2px;height: 130px;">
                            <div style="float: left">
                                <img src="http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg" width="200px" height="100px" >                                
                            </div>
                            <div style="margin-left: 210px">           
                               <div style="float:left;margin-top: -80px;"><a href="javascript:void(0)" @click="view(index)"  style="color: #2db7f5;">{{article.title}}</a></div>
                               <div style="margin-top: 80px;color: #8b6cf5;">                                    
                                    <span>阅读</span><span>({{article.readcount}})</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>点赞</span><span><span>({{article.likecount}})</span>                               
                               </div>                              
                               <div style="float: right;margin-top: -16px;"><span>{{article.createtime}}</span></div>
                               
                            </div>
                            
                        </Card>
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
                    }]
            }
        },
        created (){
           this.getArticles()
        },
        methods: {
            getArticles(){
                console.log(1111)
                var self=this
                axios.get("/api/getArticles")
                    .then(function (res) {
                        console.log(res.data)
                        if (res.data.code == 0){
                            self.list= res.data.data.list
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
            like(id){

            }
        }
    }
    return con
}
