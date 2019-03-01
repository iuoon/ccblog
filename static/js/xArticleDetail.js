let xArtDetail=function () {
    var con= {
        template: `<div>
                      <div class="card_head"><span class="span">热门文章</span></div>
                      <div class="card">
                        <div>
                           <img src="http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg" style="width: 100px;height: 60px;float: left">
                        </div>
                        <div style="margin-left: 110px;">
                          <div><a class="link_1" @click="viewArticle(1)">我的文章</a></div>
                          <div style="margin-top: 20px;"><span>11</span><span style="float: right;">2018-09-11</span></div>
                        </div>
                      </div>
                   </div>`,
        data () {
            return {
                list:[{
                    name: 'The Shawshank Redemption',
                    url: 'https://movie.douban.com/subject/1292052/',
                    rate: 9.6
                },
                    {
                        name: 'Leon:The Professional',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 9.4
                    },]
            }
        },
        methods: {
            onclick(){
                console.log(sys)
            },
            viewAirtcle(id){
                console.log(sys)
            }
        }
    }
    return con
}