const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");
let myArr = []; //Local storage속 이전의 myArr도 기억하고 싶기 때문에 const 말고 let으로 배열을 선언해준다. 

function saveTodos(){
    localStorage.setItem("todos",JSON.stringify(myArr));
    //arr 값을 string으로 저장하고 싶을 때, JSON.stringify()를 사용한다.
}

function deleteTodo(event){ //작성된 할 일을 삭제하는 기능
    const li = event.target.parentElement;
    li.remove();
    //target은 클릭된 HTML element이다.
    /*parentElement는 말 그대로 부모 element로 button의 
    부모 태그인 <li></li>를 말한다. */
}

function paintTodo(newTodo){ //item을 화면에 출력해주는 함수
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newTodo;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteTodo)
    li.appendChild(span); //append는 항상 뒤에 마지막에 나와야한다.
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleToSubmit(event){ //click에 대한 event
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    myArr.push(newTodo);
    paintTodo(newTodo);
    saveTodos();
}

todoForm.addEventListener("submit",handleToSubmit);

const savedTodos = localStorage.getItem("todos");

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos) //local storage에서 가져온 string을 arr로 바꿔준다.
    myArr = parsedTodos; //새로 입력된 배열을 myArr 배열에 덮어씌운다.
    parsedTodos.forEach(paintTodo);
    //arrow function
}