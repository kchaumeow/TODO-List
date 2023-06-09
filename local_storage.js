document.addEventListener("DOMContentLoaded", getLocalTasks);
import { showNotification } from "./notification.js";
let emptylistslide = document.querySelector(".emptylistslide");
const taskList = document.querySelector(".taskList");

export function saveLocalTasks(taskName, taskStatus, date) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].task === taskName) {
      showNotification(`You already have task "${taskName}"!`, "indianred");
      return 0;
    }
  }
  tasks.push({
    task: taskName,
    status: taskStatus,
    date: date,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return 1;
}

export function changeLocalTask(taskName, taskStatus, taskDate) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].task === taskName) {
      tasks[i] = {
        task: taskName,
        status: taskStatus,
        date: taskDate,
      };
      break;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getLocalTasks() {
  let tasks;

  if (
    localStorage.getItem("tasks") === null ||
    JSON.parse(localStorage.getItem("tasks")).length == 0
  ) {
    emptylistslide.style.display = "flex";
    tasks = [];
  } else {
    emptylistslide.style.display = "none";
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const newTask = document.createElement("li");
    newTask.classList.add(`taskItem`);
    newTask.classList.add(`${task.status}`);
    const taskText = document.createElement("div");
    taskText.classList.add("taskText");
    taskText.innerHTML = task.task;
    newTask.appendChild(taskText);
    const taskDate = document.createElement("div");
    taskDate.classList.add("taskDate");
    taskDate.innerHTML = task.date;
    const comparableDate = new Date(task.date);
    if (comparableDate < new Date()) {
      if (
        new Date().getDate() == comparableDate.getDate() &&
        new Date().getMonth() == comparableDate.getMonth() &&
        new Date().getFullYear() == comparableDate.getFullYear()
      )
        taskDate.style.color = "rgb(250, 200, 150)";
      else taskDate.style.color = "indianred";
    } else taskDate.style.color = "rgb(118, 202, 92)";

    if (task.status === "completed") {
      taskDate.style.display = "none";
    } else taskDate.style.display = "flex";
    newTask.appendChild(taskDate);
    const delImg = document.createElement("img");
    delImg.src = "./images/delete.png";
    delImg.id = "delete";
    newTask.appendChild(delImg);
    taskList.appendChild(newTask);
  });
}

export function deleteFromLocalTasks(currTask) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let taskStatus = currTask.classList.contains("incompleted")
    ? "incompleted"
    : "completed";

  const taskObject = {
    task: currTask.querySelector(".taskText").innerHTML,
    status: taskStatus,
    date: currTask.querySelector(".taskDate").innerHTML,
  };
  let deleteIndex = -1;
  for (let index in tasks) {
    if (tasks[index].task == taskObject.task) {
      deleteIndex = index;
    }
  }
  tasks.splice(deleteIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
