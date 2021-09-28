
const input = document.getElementById('task');
const ul = document.getElementById("list");
const button = document.getElementById("liveToastBtn");
const task = document.getElementsByTagName("li");



let todos = [];
let completedTodos = [];

window.onload = () => {
  
  // add delete Sign for existing task
  for (i = 0; i < task.length; i++) {

    let deleteSign = document.createElement("i");
    deleteSign.classList = "close fas fa-times";
    task[i].appendChild(deleteSign);   

  }

  todos = JSON.parse(localStorage.getItem("todos"));

  if (todos !== null) {
    todos.forEach(todo => {
      let item = todo;
      let li = document.createElement("li");
      let ul = document.getElementById("list");
      li.appendChild(document.createTextNode(item));
      ul.appendChild(li);
      let deleteSign = document.createElement("i");
      deleteSign.classList = "close fas fa-times";
      li.appendChild(deleteSign); 
     
    });

  } else {
    todos = [];
  }

  completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  if (completedTodos !== null) {
    completedTodos.forEach(todo => {
      let item = todo;
      let li = document.createElement("li");
      let ul = document.getElementById("list");
      li.appendChild(document.createTextNode(item));
      ul.appendChild(li);
      li.classList ="checked";
      // add delete button
      let deleteSign = document.createElement("i");
      deleteSign.classList = "close fas fa-times";
      li.appendChild(deleteSign); 
    });

  } else {
    completedTodos = [];
  }
}

// ***** delete todo *****
const deleteTodo = (e) => {
  if (e.target.classList[0] === "close") {
    const todo = e.target.parentElement;
    todo.remove();
    removeLocalTodos(todo);
  }
} 
ul.addEventListener("click", deleteTodo); 

  // ***** check todo *****
const checkTodo = (e) => {
  const todo = e.target
 if (e.target.tagName === "LI") {
    todo.classList.toggle("checked");
    localCompletedTodo(todo);
  } 

}
ul.addEventListener("click", checkTodo);

  // ***** new task *****
const newElement = () => {
  let newTodo = document.createElement("li");
  newTodo.innerText = input.value;
   let deleteSign = document.createElement("i");
   deleteSign.className = "close fas fa-times";
   newTodo.appendChild(deleteSign);

  if (input.value === "" || input.value.replace(/^\s+|\s+$/g, "").length == 0) {
    
    $(".error").toast("show");

  } else {

    $(".success").toast("show");
    ul.appendChild(newTodo);
    saveLocalTodos(input.value);

  } 
  // ***** clear input *****
  input.value = "";

}   
button.addEventListener("click", newElement);

// ***** store in local storage *****
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ***** delete from local storage *****
const removeLocalTodos = (todo) => {
  let todos;
  let completedTodos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  if (localStorage.getItem("completedTodos") === null) {
    completedTodos = [];
  } else {
    completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  }

  const todoElement = todo.innerText;
  if (completedTodos.includes(todoElement)) {
    completedTodos.splice(completedTodos.indexOf(todoElement), 1);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  } else {
    todos.splice(todos.indexOf(todoElement), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// checked todo
const localCompletedTodo = (todo) => {
  let completedTodos;
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
   if (localStorage.getItem("completedTodos") === null) {
    completedTodos = [];
  } else {
    completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  }

  if (!completedTodos.includes(todo.innerText)) {
    completedTodos.push(todo.innerText);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    const todoElement = todo.innerText;
    todos.splice(todos.indexOf(todoElement), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    
  } else {

    // ***** Delete from completed *****
    const todoElement = todo.innerText;
    completedTodos.splice(completedTodos.indexOf(todoElement),1);
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    saveLocalTodos(todoElement);
  }
}
