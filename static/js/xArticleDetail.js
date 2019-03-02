let xArtDetail=function () {
    var con= {
        template: `<div style="background-color: #fff;">                     
                      <div class="card">
                        <div>
                           <img src="http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg" style="width: 500px;height: 300px;float: left">
                        </div>
                        <div style="margin-left: 110px;">
                          <div><a class="link_1" @click="viewArticle(1)">我的文章</a></div>
                          <div style="margin-top: 20px;"><span>11</span><span style="float: right;">2018-09-11</span></div>
                        </div>
                      </div>
                   </div>`,
        data () {
            return {
                article:{
                    id:'',
                    title:'',
                    content:'',
                }
            }
        },
        created (){
            this.getArticleDetail()
        },
        methods: {
            getArticleDetail(){
                var self=this
                axios.get("/api/getHotArticles1?id="+sys.aid)
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
        }
    }
    return con
}
