const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");
let myArr = []; //Local storage속 이전의 myArr도 기억하고 싶기 때문에 const 말고 let으로 배열을 선언해준다. 


function saveTodos() { // 로컬 스토리지에 저장
    localStorage.setItem("todos", JSON.stringify(myArr));
    // arr 값을 string으로 저장하고 싶을 때, JSON.stringify()를 사용한다.
}

function deleteTodo(event) { // 작성된 할 일을 삭제하는 기능
    const li = event.target.parentElement;
    const todoText = li.querySelector("span").innerText;
    myArr = myArr.filter(todo => todo!== todoText);
    saveTodos(); // 로컬 스토리지에서 업데이트된 배열 저장
    li.remove();
} /* target은 클릭된 HTML element이다. parentElement는 말 그대로 부모 element로 button의
부모 태그인 <li></li>를 말한다. */

function paintTodo(newTodo) { // item을 화면에 출력해주는 기능
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newTodo;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo)
    li.appendChild(span); // append는 항상 뒤에 마지막에 나와야한다.
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleToSubmit(event) { // click에 대한 event
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = ""; // 입력 칸 다시 비워주기

    myArr.push(newTodo); // submit => 배열에 넣고 화면에 출력해주고 로컬 스토리지에 넣는다.
    paintTodo(newTodo);
    saveTodos();
}

todoForm.addEventListener("submit", handleToSubmit);

const savedTodos = localStorage.getItem("todos");

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos) // 로컬 스토리지에서 가져온 string을 배열로 바꿔준다.
    parsedTodos.forEach(todo => {
        myArr.push(todo); // 로컬 스토리지에서 불러온 todo들을 myArr에 추가
        paintTodo(todo); // 화면에 추가
    });
}