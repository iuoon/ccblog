let xArticleEdit=function () {
    var content= {
        template: `<div>
                     <div ref="contentEditor">
                         <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
                     </div>
                  </div>`,
        created(){
            this.init()
        },
        methods: {
            init(){
                console.log('init edit')
                console.log(g_vue.$refs)
                var editor = new E(g_vue.$refs.contentEditor)
                editor.create()
            }
        }
    }
    return content
}
