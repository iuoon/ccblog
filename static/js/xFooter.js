let footerContent=function () {
   var content= {
       template: `<div  style="height: 50px;background-color: #dce3ea;text-align: center;">
                     <div style="padding-top: 12px;"><span>关于本站</span></div>
                  </div>`,
       methods: {
           onclick(){
               console.log(sys)
           }
       }
   }
   return content
}
