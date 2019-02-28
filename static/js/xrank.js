let rankContent=function () {
    var content= {
        template: `<div>
                      <Card style="width:300px">
                        <p slot="title">
                            热门文章
                        </p>
                        <ul>
                            <li v-for="item in list">
                                <a :href="item.url" target="_blank">{{ item.name }}</a>                                
                            </li>
                        </ul>
                    </Card>
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
            }
        }
    }
    return content
}