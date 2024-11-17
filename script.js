
const editableText = document.getElementById('editable-text');
console.log(editableText);

if (localStorage.getItem('savedText')) {
  editableText.textContent = localStorage.getItem('savedText');
}


editableText.addEventListener('input', function () {

  localStorage.setItem('savedText', this.textContent);
})

function googleSearch() {
  var text = document.getElementById("search").value;
  var cleanQuery = text.replace(" ", "+", text);
  var url = 'http://www.google.com/search?q=' + cleanQuery;

  window.location.href = url;
}

const search = document.getElementById("search");
document.addEventListener("keydown", function (event) {
  // Check if the '/' key was pressed
  if (event.key === '/') {
    // Prevent the default behavior of '/'
    event.preventDefault();
    // Focus the input element
    search.focus();
  }
});

document.addEventListener("keydown", function (event) {
  // Check if 'Ctrl' and 'Enter' keys are pressed together
  // if (event.ctrlKey && event.key === 'Enter') {
  if (event.key === 'Enter') {
    googleSearch();
  }
});

function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let amPm = 'AM';

  // Convert 24-hour format to 12-hour format and set AM/PM
  if (hours >= 12) {
      amPm = 'PM';
      if (hours > 12) {
          hours -= 12;
      }
  }
  if (hours === 0) {
      hours = 12;  // 12 AM instead of 00
  }

  // Format time with leading zeros
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  // Display the time in the format HH:MM:SS AM/PM
  clockElement.innerHTML = `${hours}:${minutes} ${amPm}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the time immediately when the page loads
updateClock();


/* todo section */

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTodoBtn = document.getElementById("add-todo");
  const displayTodos = document.getElementById("display-todos");

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = () => {
    displayTodos.innerHTML = ""; // Clear previous todos
    todos.forEach((todo, index) => {
      const li = document.createElement("li");

      // Editable text input
      const input = document.createElement("input");
      input.type = "text";
      input.value = todo;
      input.readOnly = true;

      // Edit button
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

      // Delete button
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

  // Add a new todo
  addTodoBtn.addEventListener("click", () => {
    const todo = todoInput.value.trim();
    if (todo) {
      todos.push(todo);
      saveTodos();
      renderTodos();
      todoInput.value = "";
    }
  });

  // Initial render
  renderTodos();
});
