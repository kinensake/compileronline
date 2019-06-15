let btn = document.getElementById("run");
let code = document.getElementById("code");
let result = document.getElementById("result");
let lang = document.getElementById("lang");

lang.addEventListener("change", function(){
  switch(lang.value.toLowerCase()){
    case "javascript":
      code.innerHTML = 'console.log("Hello World")';
      break;
    default:
      code.innerHTML = '#include &lt;iostream&gt; \
      \nusing namespace std; \
      \n\nint main(){ \
        \n\tcout << "Hello, World!"; \
        \n\t<br>return 0; \
      \n}'
  }
})

btn.addEventListener("click",function(){
  if(code.value.trim() == ""){
    return alert("Please type your code");
  }

  axios.post("/", `content=${code.value}&lang=${lang.value}`)
  .then(function(kq){
    console.log(kq);
    let a = kq.request.responseText;
    a = a.replace(/^({"kq":")|("})$/g, "");
    a = a.replace(/ /g, "&nbsp;");
    a = a.replace(/\\n/g, "<br>");
    result.innerHTML = a;
  })
})
