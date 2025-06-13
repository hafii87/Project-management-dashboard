let taskIdCounter = 0;

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const task = document.createElement("div");
  task.className = "task-card";
  task.draggable = true;
  task.id = `task-${taskIdCounter++}`;
  task.ondragstart = drag;

  const span = document.createElement("span");
  span.textContent = taskText;

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.textContent = "X";
  delBtn.onclick = () => task.remove();

  const submitBtn = document.createElement("button");
  submitBtn.className = "submit-btn";
  submitBtn.textContent = "✔";
  submitBtn.title = "Mark as Done";
  submitBtn.onclick = () => submitTask(task, span.textContent);

  task.appendChild(span);
  task.appendChild(delBtn);
  task.appendChild(submitBtn);

  document.getElementById("todo").appendChild(task);
  input.value = "";
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const task = document.getElementById(id);
  // Only drop on column, not on header
  const column = event.target.closest(".column");
  if (column && task) column.appendChild(task);
}

function submitTask(task, title) {
  document.getElementById("done").appendChild(task);
  // Remove submit button after submission
  const submitBtn = task.querySelector('.submit-btn');
  if (submitBtn) submitBtn.remove();
  // Add to history
  addToHistory(title);
}

function addToHistory(title) {
  const history = document.getElementById("taskHistory");
  const li = document.createElement("li");
  li.textContent = title;
  history.appendChild(li);
}

function clearHistory() {
  const history = document.getElementById("taskHistory");
  history.innerHTML = "";
}
