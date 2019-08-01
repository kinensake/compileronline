let btn = document.getElementById("run");
let board = document.getElementById("board");
let dummy = document.getElementById("dummy");
let result = document.getElementById("result");
let lang = document.getElementById("lang");

let cExample = 
`#include <iostream>

int main() {
 std::cout << "Hello World";
 return 0;
}
`;

board.value = cExample;
dummy.innerHTML = addHighlight(board.value);

//add highlight keyword
board.addEventListener("keydown", function(){
	setTimeout(function(){
		dummy.innerHTML = addHighlight(board.value);
	}, 0);
});

//chang language
lang.addEventListener("change", function(){
  switch(lang.value.toLowerCase()){
    case "javascript":
      board.value = `console.log("hello world")`;
			dummy.innerHTML = addHighlight(board.value);
      break;
    default:
      board.value = cExample;
			dummy.innerHTML = addHighlight(board.value);
  }
});

//post code to server
btn.addEventListener("click",function(){
  if(board.value.trim() == ""){
    return alert("Please type your code");
  }
	
  axios.post("/", {content: board.value, lang: lang.value})
  .then(function(kq){
    let a = kq.request.responseText;
    a = a.replace(/^({"kq":")|("})$/g, "");
    a = a.replace(/ /g, "&nbsp;");
    a = a.replace(/\\n/g, "<br>");
    result.innerHTML = a;
  });
});

//functions 

function addHighlight(content) {
	const keyword = ["function", "var", "let", "const", "new", "class", "for", 
									 "return", "switch", "if", "for", "else", "while", "do", "case", 
									 "default", "int", "string", "float", "double", "long", "short",
									"void", "unsigned", "char", "#include"];
	
	content = content.replace(/</g, "&lt;");
	content = content.replace(/>/g, "&gt;");
	content = content.replace(/\n/g, "<br>");
	content = content.replace(/\s/g, "&nbsp;");
	
	content = content.replace(new RegExp(keyword.join("|"), "g"), function(str){
		return "<span class=keyword>" + str + "</span>";
	});
	
	content = content.replace(/[0-9]/g, function(str) {
		return "<span class=number>" +  str + "</span>";
	});
	
	content = content.replace(/(?<=\w+\.)\w+/g, function(str) {
		return "<span class=method>" + str + "</span>";
	});
	
	content = content.replace(/(".*")|('.*')|(`.*`)/g, function(str) {
		return "<span class=string>" + str + "</span>";
	});
	
	return content;
}