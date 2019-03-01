let xArtList=function () {
    var con= {
        template: `<div>
                      <div class="cardArticle">
                        <Card dis-hover style="border-radius: 2px;">
                            <div>
                                <img src="http://su.semmv.com/wp-content/uploads/2016/06/2016062810005687.jpg" width="200px" height="100px" >
                                <span>文章文章文章文章文章文章文章文章</span>
                            </div>
                        </Card>
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
