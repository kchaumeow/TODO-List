document.addEventListener("DOMContentLoaded", getLocalTasks);
import { showNotification } from "./notification.js";
let emptylistslide1 = document.querySelector(".emptylistslide1");
let emptylistslide2 = document.querySelector(".emptylistslide2");
let emptylistslide3 = document.querySelector(".emptylistslide3");
const taskList = document.querySelector(".taskList");
export function saveLocalTasks(taskName, taskStatus) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let flag = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].task === taskName) {
      if (tasks[i].status === taskStatus) {
        showNotification(`You already have task "${taskName}"!`, "indianred");
        return 1;
      }
      tasks[i] = {
        task: taskName,
        status: taskStatus,
      };
      flag = 1;
      break;
    }
  }
  if (flag == 1) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return flag;
  }

  tasks.push({
    task: taskName,
    status: taskStatus,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return flag;
}

export function getLocalTasks() {
  let tasks;

  if (
    localStorage.getItem("tasks") === null ||
    JSON.parse(localStorage.getItem("tasks")).length == 0
  ) {
    emptylistslide1.style.display = "flex";
    tasks = [];
  } else {
    emptylistslide1.style.display = "none";
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    if (document.querySelector(".emptylistslide") != null) {
      emptylistslide = document.querySelector(".emptylistslide");
      document.querySelector(".emptylistslide").remove();
    }
    const newTask = document.createElement("li");
    newTask.classList.add(`taskItem`);
    newTask.classList.add(`${task.status}`);
    newTask.innerHTML = `<div class="taskText">${task.task}</div>`;
    const delImg = document.createElement("img");
    delImg.src = "./images/delete.png";
    delImg.id = "delete";
    newTask.appendChild(delImg);
    taskList.appendChild(newTask);
  });
}

export function deleteFromLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.splice(tasks.indexOf(task.querySelector(".taskText").innerHTML), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
