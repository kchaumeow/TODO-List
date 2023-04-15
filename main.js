import { showNotification } from "./notification.js";
import { saveLocalTasks, deleteFromLocalTasks } from "./local_storage.js";
const taskForm = document.getElementById("taskForm");
const taskFilter = document.querySelector(".taskFilter");
const taskList = document.querySelector(".taskList");
const notificationList = document.querySelector(".notification-container");

// when list is empty appears
let emptylistslide1 = document.querySelector(".emptylistslide1");
let emptylistslide2 = document.querySelector(".emptylistslide2");
let emptylistslide3 = document.querySelector(".emptylistslide3");

function addNewTask(taskName) {
  emptylistslide3.style.display = "none";
  emptylistslide1.style.display = "none";
  const newTask = document.createElement("li");
  newTask.classList.add("taskItem");
  newTask.classList.add("incompleted");
  newTask.innerHTML = `<div class="taskText">${taskName}</div>`;
  const delImg = document.createElement("img");
  delImg.src = "./images/delete.png";
  delImg.id = "delete";
  newTask.appendChild(delImg);
  let flag = saveLocalTasks(taskName, "incompleted");

  if (!flag) {
    if (taskFilter.value == "completed") {
      newTask.style.display = "none";
      emptylistslide2.style.display = "flex";
    }
    if (taskFilter.value == "incompleted") {
      emptylistslide3.style.display = "none";
    }
    taskList.appendChild(newTask);
  }
  return flag;
}

taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI" && e.target.classList.contains("completed")) {
    e.target.classList.remove("completed");
    e.target.classList.toggle("incompleted");
    if (taskFilter.value == "completed") {
      if (document.querySelector(".completed") == null)
        emptylistslide2.style.display = "flex";
      e.target.style.display = "none";
    }
    saveLocalTasks(
      e.target.querySelector(".taskText").innerHTML,
      "incompleted"
    );
    showNotification(
      `Task "${e.target.querySelector(".taskText").innerHTML}" incomplited`,
      "indianred"
    );
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
    e.target.classList.remove("incompleted");
    if (taskFilter.value == "incomplete") {
      if (document.querySelector(".incompleted") == null)
        emptylistslide3.style.display = "flex";
      e.target.style.display = "none";
    }
    saveLocalTasks(e.target.querySelector(".taskText").innerHTML, "completed");
    showNotification(
      `Task "${e.target.querySelector(".taskText").innerHTML}" completed!`,
      "rgb(241, 222, 110)"
    );
  }
  if (e.target.tagName === "IMG") {
    showNotification(
      `Task "${
        e.target.parentNode.querySelector(".taskText").innerHTML
      }" was deleted!`,
      "indianred"
    );
    deleteFromLocalTasks(e.target.parentNode);
    e.target.parentNode.remove();
    if (
      document.querySelector(".taskList").getElementsByTagName("li").length == 0
    ) {
      emptylistslide1.style.display = "flex";
    }
    if (taskFilter.value == "incomplete") {
      if (document.querySelector(".incompleted") == null) {
        emptylistslide3.style.display = "flex";
        emptylistslide1.style.display = "none";
        emptylistslide2.style.display = "none";
      }
      e.target.style.display = "none";
    }
    if (taskFilter.value == "complete") {
      if (document.querySelector(".completed") == null) {
        emptylistslide2.style.display = "flex";
        emptylistslide3.style.display = "none";
        emptylistslide1.style.display = "none";
      }
      e.target.style.display = "none";
    }
  }
});

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskName = document.querySelector("#taskName").value;
  if (taskName == "") {
    showNotification("Enter task name!", "indianred");
  } else {
    let flag = addNewTask(taskName);
    if (!flag)
      showNotification(`New task  "${taskName}" added!`, "darkseagreen");
  }
  document.querySelector("#taskName").value = "";
});

taskFilter.addEventListener("change", filterTasks);
function filterTasks(e) {
  const tasks = taskList.childNodes;
  tasks.forEach(function (task) {
    switch (e.target.value) {
      case "all":
        if (
          document.querySelector(".taskList").querySelector(".taskItem") ===
          null
        ) {
          emptylistslide1.style.display = "flex";
        }
        emptylistslide2.style.display = "none";
        emptylistslide3.style.display = "none";
        task.style.display = "flex";
        break;
      case "completed":
        emptylistslide1.style.display = "none";
        emptylistslide3.style.display = "none";
        if (
          document.querySelector(".taskList").querySelector(".completed") ===
          null
        ) {
          emptylistslide2.style.display = "flex";
        }
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "incomplete":
        emptylistslide1.style.display = "none";
        emptylistslide2.style.display = "none";
        if (
          document.querySelector(".taskList").querySelector(".incompleted") ===
          null
        ) {
          emptylistslide3.style.display = "flex";
        }
        if (task.classList.contains("incompleted")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}
