document.addEventListener("DOMContentLoaded", function () {
  const lightModeBtn = document.getElementById("lightModeBtn");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let isDarkMode = false;

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
        <label for="task-${index}" class="task-text ${task.completed ? "completed" : ""}">${task.text}</label>
      `;
      taskList.appendChild(li);

      const checkbox = li.querySelector(`#task-${index}`);
      checkbox.addEventListener("change", function () {
        tasks[index].completed = this.checked;
        saveTasks();
        renderTasks();
      });
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text !== "") {
      tasks.push({ text: text, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function switchTheme() {
    if (isDarkMode) {
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
    }
    isDarkMode = !isDarkMode;
  }

  lightModeBtn.addEventListener("click", switchTheme);
  darkModeBtn.addEventListener("click", switchTheme);
  addTaskBtn.addEventListener("click", addTask);

  renderTasks();
});
