const leftBox = document.querySelector("#box1");
const rightBox = document.querySelector("#box3");
const taskContainer = document.getElementById("task-list");
// const taskPreview = document.querySelector("#task-list-preview");
const progressContainer = document.getElementById("progress-task-list");
// const progressPreview = document.querySelector("#progress-task-list-preview");
const completedContainer = document.getElementById("completed-list");
// const completedPreview = document.querySelector("#completed-list-preview");

let allTasks = [];
let progressTasks = [];
let completedTasks = [];
let selected = null;

function makeDraggable(item) {
  item.draggable = true;
  item.addEventListener("dragstart", (e) => {
    selected = e.target;
  });
}

function renderTasks() {
  taskContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  allTasks.forEach((task, idx) => {
    const li = createTaskItem(task);
    taskContainer.appendChild(li);
  });

  progressTasks.forEach((task, idx) => {
    const li = createTaskItem(task);
    li.style.backgroundColor = "rgb(182, 194, 19)";
    progressContainer.appendChild(li);
  });

  completedTasks.forEach((task, idx) => {
    const li = completeTaskItem(task);
    li.style.backgroundColor = "rgba(16, 109, 16, 0.83)";
    completedContainer.appendChild(li);
  });

  updateProgressCircle()
  saveData();
}

function createTaskItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = "task-item";

  const span = document.createElement("span");
  span.innerHTML = "❌";
  li.appendChild(span);

  li.addEventListener("dblclick", () => handleEditTask(li, text, "all"));
  makeDraggable(li);

  return li;
}

function completeTaskItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = "task-item";
  makeDraggable(li);
  return li;
}



const input = document.querySelector("#add-task");
const button = document.querySelector("#add-btn");

function setupTaskEvents() {

  const add = () => {
    const value = input.value.trim();
    if (value !== "") {
      allTasks.push(value);
      input.value = "";
      renderTasks();
    }
  };

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") add();
  });

  button.addEventListener("click", add);

}

input.addEventListener("focus", setupTaskEvents);

rightBox.addEventListener("dragover", (e) => e.preventDefault());
rightBox.addEventListener("drop", (e) => {
  if (selected) {
    const text = selected.textContent.replace("❌", "").trim();
    const index = allTasks.indexOf(text);
    if (index !== -1) {
      allTasks.splice(index, 1);
      progressTasks.unshift(text);
    }
    renderTasks();
    selected = null;
  }
});

leftBox.addEventListener("dragover", (e) => e.preventDefault());
leftBox.addEventListener("drop", (e) => {
  if (selected) {
    const text = selected.textContent.replace("❌", "").trim();
    const index = progressTasks.indexOf(text);
    if (index !== -1) {
      progressTasks.splice(index, 1);
      allTasks.unshift(text);
    }
    renderTasks();
    selected = null;
  }
});

const completebox = document.querySelector("#box4");
completebox.addEventListener("dragover", (e) => e.preventDefault());
completebox.addEventListener("drop", function(e){
  if(selected){
    const text = selected.textContent.replace("❌","").trim();
    const index = progressTasks.indexOf(text);
    if(index !== -1)
    {
      progressTasks.splice(index, 1);
      completedTasks.unshift(text);
    }
    renderTasks();
    selected = null;
  }
})

document.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN") {
    const taskText = e.target.parentElement.textContent.replace("❌", "").trim();
    let index = allTasks.indexOf(taskText);
    if (index !== -1) {
      allTasks.splice(index, 1);
    } else{
      index = progressTasks.indexOf(taskText);
      if (index !== -1) progressTasks.splice(index, 1);
    }
    renderTasks();
  }
});

function saveData() {
  localStorage.setItem("data1", JSON.stringify(allTasks));
  localStorage.setItem("data2", JSON.stringify(progressTasks));
  localStorage.setItem("data3", JSON.stringify(completedTasks));
}

function getData() {
  const t1 = localStorage.getItem("data1");
  const t2 = localStorage.getItem("data2");
  const t3 = localStorage.getItem("data3");
  if (t1) allTasks = JSON.parse(t1);
  if (t2) progressTasks = JSON.parse(t2);
  if (t3) completedTasks = JSON.parse(t3);
}

getData();
renderTasks();


function updateProgressCircle() {
  const total = allTasks.length + progressTasks.length + completedTasks.length;
  const percent = total === 0 ? 0 : (completedTasks.length / total) * 100;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const circle = document.querySelector("svg circle");
  if (!circle) return;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${offset}`;

  // Optional: Show percent text inside circle
  const percentText = document.querySelector(".inner p");
  if (percentText) percentText.textContent = `${Math.round(percent)}%`;
}


function handleEditTask(li, oldText, listType) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;
  input.className = "edit-input";
  li.innerHTML = "";
  li.appendChild(input);
  input.focus();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const newText = input.value.trim();
      if (newText !== "") {
        let list;
        if (listType === "all") list = allTasks;

        const index = list.indexOf(oldText);
        if (index !== -1) {
          list[index] = newText;
          renderTasks();
        }
      }
    }
  });
}
