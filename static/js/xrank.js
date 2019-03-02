let rankContent=function () {
    var content= {
        template: `<div>
                      <div class="card_head"><span class="span">热门文章</span></div>
                      <div v-for="(article,index) in list" class="card">
                        <div style="float: left">
                           <img src="http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg" style="width: 100px;height: 60px;float: left">
                        </div>
                        <div style="margin-left: 110px;">
                          <div style="float:left;"><a class="link_1" @click="view(index)" style="color: #ffadd2">{{article.title}}</a></div>
                          <div ><i-icon type="ios-eye-outline"></i-icon><span>11</span><span style="float: right;">{{article.createtime}}</span></div>
                        </div>
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
            this.getHotArticles()
        },
        methods: {
            getHotArticles(){
                console.log(1111)
                var self=this
                axios.get("/api/getHotArticles?size=5")
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
    return content
}
