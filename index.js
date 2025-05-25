const leftBox = document.querySelector("#box1");
const rightBox = document.querySelector("#box3");
const taskContainer = document.getElementById("task-list");
const taskPreview = document.querySelector("#task-list-preview");
const completedContainer = document.getElementById("completed-task-list");
const completedPreview = document.querySelector("#completed-task-list-preview");

let allTasks = [];
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
  taskPreview.innerHTML = "";
  completedContainer.innerHTML = "";
  completedPreview.innerHTML = "";

  allTasks.forEach((task, idx) => {
    const li = createTaskItem(task);
    taskContainer.appendChild(li);
    if (idx < 7) {
      const previewLi = createTaskItem(task);
      taskPreview.appendChild(previewLi);
    }
  });

  completedTasks.forEach((task, idx) => {
    const li = createTaskItem(task);
    li.style.backgroundColor = "red";
    completedContainer.appendChild(li);
    if (idx < 3) {
      const previewLi = createTaskItem(task);
      previewLi.style.backgroundColor = "red";
      completedPreview.appendChild(previewLi);
    }
  });

  saveData();
}

function createTaskItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = "task-item";

  const span = document.createElement("span");
  span.innerHTML = "❌";
  li.appendChild(span);

  makeDraggable(li);

//   li.addEventListener("click", function (e) {
//     if (e.target.tagName === "SPAN") return;

//     const cleanText = (text+"t").trim();

//     const index = allTasks.indexOf(cleanText);
//     if (index !== -1) {
//       allTasks.splice(index, 1);
//       completedTasks.unshift(cleanText.slice(text));
//       renderTasks();
//     } else {
//       const cIndex = completedTasks.indexOf(text);
//       if (cIndex !== -1) {
//         completedTasks.splice(cIndex, 1);
//         allTasks.unshift(cleanText);
//         renderTasks();
//       }
//     }
//   });

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

//   input.dataset.attached = "true";
}

input.addEventListener("focus", setupTaskEvents);

rightBox.addEventListener("dragover", (e) => e.preventDefault());
rightBox.addEventListener("drop", (e) => {
  if (selected) {
    const text = selected.textContent.replace("❌", "").trim();
    const index = allTasks.indexOf(text);
    if (index !== -1) {
      allTasks.splice(index, 1);
      completedTasks.unshift(text);
    }
    renderTasks();
    selected = null;
  }
});

leftBox.addEventListener("dragover", (e) => e.preventDefault());
leftBox.addEventListener("drop", (e) => {
  if (selected) {
    const text = selected.textContent.replace("❌", "").trim();
    const index = completedTasks.indexOf(text);
    if (index !== -1) {
      completedTasks.splice(index, 1);
      allTasks.unshift(text);
    }
    renderTasks();
    selected = null;
  }
});

document.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN") {
    const taskText = e.target.parentElement.textContent.replace("❌", "").trim();
    let index = allTasks.indexOf(taskText);
    if (index !== -1) {
      allTasks.splice(index, 1);
    } else {
      index = completedTasks.indexOf(taskText);
      if (index !== -1) completedTasks.splice(index, 1);
    }
    renderTasks();
  }
});

function saveData() {
  localStorage.setItem("data1", JSON.stringify(allTasks));
  localStorage.setItem("data2", JSON.stringify(completedTasks));
}

function getData() {
  const t1 = localStorage.getItem("data1");
  const t2 = localStorage.getItem("data2");
  if (t1) allTasks = JSON.parse(t1);
  if (t2) completedTasks = JSON.parse(t2);
}

getData();
renderTasks();
