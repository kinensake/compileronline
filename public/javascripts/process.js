let btn = document.getElementById("run");
let code = document.getElementById("code");
let result = document.getElementById("result");

btn.addEventListener("click",function(){
  if(code.value.trim() == ""){
    return alert("Please type your code");
  }

  axios.post("/", `content=${code.value}`)
  .then(function(kq){
    console.log(kq);
    let a = kq.request.responseText;
    a = a.replace(/^({"kq":")|("})$/g, "");
    a = a.replace(/ /g, "&nbsp;");
    a = a.replace(/\\n/g, "<br>");
    result.innerHTML = a;
  })
})
