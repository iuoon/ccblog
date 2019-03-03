let xArticleEdit=function () {
    var content= {
        template: `<div>
                     <div id="contentEditor">
                         <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
                     </div>
                  </div>`,
        created(){
            this.init()
        },
        methods: {
            init(){
                console.log('init edit')
                var editor = new E("#contentEditor")
                editor.create()
            }
        }
    }
    return content
}
