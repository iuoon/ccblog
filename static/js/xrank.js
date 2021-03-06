let rankContent=function () {
    var content= {
        template: `<div>
                      <div class="card_head"><span class="span">热门文章</span></div>
                      <div v-for="(article,index) in list" class="card">
                        <div style="float: left">
                           <img :src="article.coverimg" style="width: 100px;height: 60px;float: left">
                        </div>
                        <div style="margin-left: 110px;">
                          <div style="float:left;"><a class="link_1" @click="view(index)" style="color: #ffadd2">{{article.title}}</a></div>
                          <div ><Icon type="ios-eye-outline"></Icon><span>{{article.readcount}}</span><span style="float: right;">{{article.createtime}}</span></div>
                        </div>
                      </div>
                      <div style="margin-top: 40px;"><i-button type="success" size="large" style="width: 340px;" @click="viewLiuyan">留言</i-button></div>
                   </div>`,
        data () {
            return {
                list:[{
                    title: '',
                    icon: '',
                    likecount: 0,
                    readcount:0,
                    createtime:'',
                    coverimg:'',
                }]
            }
        },
        created (){
            this.getHotArticles()
        },
        methods: {
            getHotArticles(){
                var self=this
                axios.post("/api/getHotArticles?size=5")
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
            viewLiuyan(){
                sys.componentContent='xLiuyan'
            },
            view(index){
                sys.aid=this.list[index].id
                console.log(this.list[index].id);
                sys.componentContent='xartWhite'
                this.$nextTick(() => (sys.componentContent='xartDetail'))
            }
        }

    }
    return content
}
