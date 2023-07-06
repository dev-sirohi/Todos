const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

const todosList = JSON.parse(localStorage.getItem("todos"));

if (todosList) {
  todosList.forEach((todo) => {
    const todoText = todo.text;
    let completed = false;
    if (todo.completed) completed = true;
    addTodo(todoText, completed);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = input.value;

  if (todoText) {
    addTodo(todoText, false);
  }
});

function addTodo(todoText, completed) {
  const todoEl = document.createElement("li");
  todoEl.innerText = todoText;

  if (completed) todoEl.classList.toggle("completed");

  todoEl.addEventListener("click", () => {
    todoEl.classList.toggle("completed");
    updateLocalStorage();
  });

  todoEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    todoEl.remove();
    updateLocalStorage();
  });

  todos.appendChild(todoEl);

  input.value = "";

  updateLocalStorage();
}

function updateLocalStorage() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
