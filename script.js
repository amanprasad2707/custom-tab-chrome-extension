const editableText = document.getElementById('editable-text');
const search = document.getElementById("search");
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");

// Preserve editable text content in localStorage
if (localStorage.getItem('savedText')) {
  editableText.textContent = localStorage.getItem('savedText');
}
editableText.addEventListener('input', function () {
  localStorage.setItem('savedText', this.textContent);
});

// Google Search Functionality
function googleSearch() {
  var text = document.getElementById("search").value;
  var cleanQuery = text.replace(/\s+/g, "+"); // Replace spaces with '+'
  var url = 'http://www.google.com/search?q=' + cleanQuery;
  window.location.href = url;
}

// Keyboard Events for Search and Todo
document.addEventListener("keydown", function (event) {
  if (event.key === '/') {
    event.preventDefault();
    search.focus(); // Focus the search input
  }

  // Handle Enter key contextually based on focus
  if (event.key === 'Enter') {
    if (document.activeElement === search) {
      googleSearch(); // If search box is focused, perform Google search
    } else if (document.activeElement === todoInput) {
      addTodoBtn.click(); // If todo input is focused, add the todo
    }
  }
});

// Clock Functionality
function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let amPm = 'AM';

  if (hours >= 12) {
    amPm = 'PM';
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (hours === 0) {
    hours = 12;
  }

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  clockElement.innerHTML = `${hours}:${minutes} ${amPm}`;
}

setInterval(updateClock, 1000);
updateClock();

// Todo Section
document.addEventListener("DOMContentLoaded", () => {
  const displayTodos = document.getElementById("display-todos");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = () => {
    displayTodos.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");

      const input = document.createElement("input");
      input.type = "text";
      input.value = todo;
      input.readOnly = true;

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.classList.add("edit");
      editBtn.addEventListener("click", () => {
        if (editBtn.textContent === "✏️") {
          input.readOnly = false;
          input.focus();
          editBtn.textContent = "💾";
        } else {
          todos[index] = input.value;
          saveTodos();
          renderTodos();
        }
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.classList.add("delete");
      deleteBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      li.appendChild(input);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      displayTodos.appendChild(li);
    });
  };

  addTodoBtn.addEventListener("click", () => {
    const todo = todoInput.value.trim();
    if (todo) {
      todos.push(todo);
      saveTodos();
      renderTodos();
      todoInput.value = "";
    }
  });

  renderTodos();
});
