import { showNotification } from "./notification.js";
import {
  saveLocalTasks,
  deleteFromLocalTasks,
  changeLocalTask,
} from "./local_storage.js";
const taskForm = document.getElementById("taskForm");
const taskFilter = document.querySelector(".taskFilter");
const taskList = document.querySelector(".taskList");

// when list is empty appears
let emptylistslide = document.querySelector(".emptylistslide");

function addNewTask(taskName.trim()) {
  emptylistslide.style.display = "none";
  const newTask = document.createElement("li");
  newTask.classList.add("taskItem");
  newTask.classList.add("incompleted");
  const taskText = document.createElement("div");
  taskText.classList.add("taskText");
  taskText.innerHTML = taskName;
  newTask.appendChild(taskText);
  const delImg = document.createElement("img");
  delImg.src = "./images/delete.png";
  delImg.id = "delete";
  newTask.appendChild(delImg);
  let isSaved = saveLocalTasks(taskName, "incompleted");
  if (isSaved) {
    if (taskFilter.value === "completed") {
      newTask.style.display = "none";
      if (document.querySelector(".completed") === null)
        emptylistslide.style.display = "flex";
      taskList.appendChild(newTask);
    } else taskList.appendChild(newTask);
  } else {
    if (
      taskFilter.value === "incomplete" &&
      document.querySelector(".incompleted") === null
    )
      emptylistslide.style.display = "flex";
    if (
      taskFilter.value === "completed" &&
      document.querySelector(".completed") === null
    )
      emptylistslide.style.display = "flex";
  }
  return isSaved;
}

taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI" && e.target.classList.contains("completed")) {
    e.target.classList.remove("completed");
    e.target.classList.toggle("incompleted");
    if (taskFilter.value == "completed") {
      if (document.querySelector(".completed") == null)
        emptylistslide.style.display = "flex";
      e.target.style.display = "none";
    }
    changeLocalTask(
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
        emptylistslide.style.display = "flex";
      e.target.style.display = "none";
    }
    changeLocalTask(e.target.querySelector(".taskText").innerHTML, "completed");
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
      emptylistslide.style.display = "flex";
    }
  }
});

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskName = document.querySelector("#taskName").value;
  if (taskName == "") {
    showNotification("Enter task name!", "indianred");
  } else if (addNewTask(taskName)) {
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
        )
          emptylistslide.style.display = "flex";
        else emptylistslide.style.display = "none";
        task.style.display = "flex";
        break;
      case "completed":
        if (
          document.querySelector(".taskList").querySelector(".completed") ===
          null
        )
          emptylistslide.style.display = "flex";
        else emptylistslide.style.display = "none";
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "incomplete":
        if (
          document.querySelector(".taskList").querySelector(".incompleted") ===
          null
        )
          emptylistslide.style.display = "flex";
        else emptylistslide.style.display = "none";
        if (task.classList.contains("incompleted")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}
