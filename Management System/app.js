const UserNameContent=document.querySelector("#UserName");
const userD=JSON.parse(localStorage.getItem("CurrentUser"));

function FirstFunction(){
    UserNameContent.textContent=userD.username;

}



function removeUser(){
    localStorage.removeItem("CurrentUser");
    
    window.location.href ="/Login/index.html";
}