let headContent=function () {
   var content= {
       template: `<div  style="height: 50px;"><a class="a_head_title" href="/index">景区旅游</a>
                  <!--<i-button type="info" ghost @click="onclick()">Primary</i-button>-->
                    <div><a class="homepage" href="/index">首页</a></div>
                  </div>`,
       methods: {
           onclick(){
               console.log(sys)
           }
       }
   }
   return content
}
