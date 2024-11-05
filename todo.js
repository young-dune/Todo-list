const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");
const myArr = [];

function saveTodos(){
    localStorage.setItem("todos",JSON.stringify(myArr));
}

function deleteTodo(event){ //작성된 할 일을 삭제하는 기능
    const li = event.target.parentElement;
    li.remove();
    //target은 클릭된 HTML element이다.
    /*parentElement는 말 그대로 부모 element로 button의 
    부모 태그인 <li></li>를 말한다. */
}

function paintTodo(newTodo){ //할 일이 입력될 때마다 작성되는 기능
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