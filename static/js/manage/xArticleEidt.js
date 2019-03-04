let xArticleEdit=function () {
    var editor;
    var content= {
        template: `<div>                     
                     <div>   
                        <i-button type="success" ghost @click="openUpload">上传封面</i-button>                     
                        <input ref="coverimg" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="upload" style="opacity:0;"/>
                     </div>
                     <div style="width: 600px;height: 300px;border: 1px dashed #ccc;border-radius: 2px;">
                        <img :src="article.coverimg" style="width: 600px;height: 300px;">
                     </div>
                     <br>
                     <Input v-model="article.title" placeholder="输入标题" clearable  />
                     <br>
                     <div ref="contentEditor">
                         <p>编辑内容</p>
                     </div>
                     <div style="margin-top: 20px;"><i-button type="success" ghost @click="saveArticle">保存</i-button></div>
                  </div>`,
        data(){
            return{
                article:{
                    id:'',
                    title:'',
                    content:'',
                    coverimg:'',
                },
            }
        },
        created(){

        },
        mounted() {
            // this.$refs 必须在mounted里调用后才能取到
            this.init();
        },
        methods: {
            init(){
                editor = new E(this.$refs.contentEditor)
                editor.create()
                var self =this;
                if(g_vue.aid != -1){
                    axios.post("/api/getArticleDetail?id="+g_vue.aid)
                        .then(function (res) {
                            console.log(res.data)
                            if (res.data.code == 0){
                                self.article= res.data.data
                                editor.txt.html(self.article.content)
                            } else{
                                console.log(res)
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
                }
            },
            upload(e){
                var self=this;
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                param.append('file',file);//通过append向form对象添加数据
                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }; //添加请求头
                axios.post('/api/upload',param,config)
                    .then(res=>{
                        console.log(res.data);
                        self.article.coverimg=res.data.data.url;
                    }).catch(function (error) {
                        console.log(error)
                    });
            },
            openUpload(){
                this.$refs.coverimg.click();
            },
            saveArticle(){
                var self=this;
                let param = new FormData(); //创建form对象
                param.append('content',editor.txt.html());//通过append向form对象添加数据
                param.append('title',self.article.title);
                param.append('coverimg',self.article.coverimg);
                let config = {
                    headers:{'Content-Type':'x-www-form-urlencoded'}
                }; //添加请求头
                axios.post("/api/saveArticle?id="+self.article.id,param,config)
                    .then(function (res) {
                        console.log(res.data)
                        if (res.data.code == 0){
                            self.$Message.success({
                                content: '保存成功',
                                duration: 2
                            });
                        } else{
                            self.$Message.error({
                                content: '保存失败',
                                duration: 2
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }
    return content
}
