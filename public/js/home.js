

let orderPage=document.querySelector("#setting");
let upArrow=document.querySelector("#upArrow");
orderPage.addEventListener("click",()=>{
    setting.style.display="none";
    order.style.display="block";
    upArrow.style.display="block"

})
upArrow.addEventListener("click",()=>{
    setting.style.display="block";
    order.style.display="none";
    upArrow.style.display="none"
})

function change(){
    useru.style.display="block"
    

}
function cancle(){
    useru.style.display="none"
}
function del(){
    window.location.href="/api/user/d/delete"

}
function createuser(){
   regdiv.style.display="block"


}


function loginf(){
    regform.style.transform="translateX(300px)"
    loginform.style.transform="translateX(300px)"
    indicator.style.transform="translateX(0px)"
    
 
 
 }
 function regf(){
    regform.style.transform="translateX(0px)"
    loginform.style.transform="translateX(0px)"
    indicator.style.transform="translateX(100px)"
 
 
 }


