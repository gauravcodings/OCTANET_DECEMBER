const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Task cannot be empty!");
  tasks.push({ text, completed: false });
  saveAndRender();
  taskInput.value = "";
});

taskList.addEventListener("click", (e) => {
  const index = e.target.closest("li").dataset.index;
  if (e.target.classList.contains("toggle")) tasks[index].completed = !tasks[index].completed;
  else if (e.target.classList.contains("delete")) tasks.splice(index, 1);
  saveAndRender();
});

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  })
);

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks
    .filter((t) => (filter === "all" ? true : filter === "completed" ? t.completed : !t.completed))
    .forEach((task, i) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;
      li.dataset.index = i;
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button class="toggle">${task.completed ? "Undo" : "Done"}</button>
          <button class="delete">Delete</button>
        </div>`;
      taskList.appendChild(li);
    });
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
}
