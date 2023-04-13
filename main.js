const taskForm = document.getElementById("taskForm");
const taskFilter = document.querySelector(".taskFilter");
const taskList = document.querySelector(".taskList");
// document.addEventListener("DOMContentLoaded", getLocalTasks);
// taskList.addEventListener("click", deleteCheck);
// taskFilter.addEventListener("change", filteringTasks);
function addNewTask(taskName) {
    // const newTask = `<li class="taskItem">
    //     <div class="taskText">${taskName}</div>
    //     </li>`;
    const newTask = document.createElement('li');
    newTask.classList.add("taskItem");
    newTask.innerHTML = `<div class="taskText">${taskName}</div>`;
    const delImg = document.createElement("img");
    delImg.src = "delete.png";
    delImg.id = "delete";
    newTask.appendChild(delImg);
    taskList.appendChild(newTask);
}

taskList.addEventListener("click", function(e){
    if (e.target.tagName === "LI" && e.target.classList.contains("checked")){
        e.target.classList.remove("checked");
        e.target.classList.toggle("unchecked");
        showRedNotification(`Task </q>${e.target.querySelector(".taskText").innerHTML}</q> incomplited`);
    }
    else if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        showGoldNotification(`Task <q>${e.target.querySelector(".taskText").innerHTML}</q> completed!`);
    }
    if (e.target.tagName === "IMG"){
        showRedNotification(`Task <q>${e.target.parentNode.querySelector(".taskText").innerHTML}</q> was deleted!`);
        e.target.parentNode.remove();
    }

})

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = document.querySelector("#taskName").value;
    if (taskName == "") {
        showRedNotification("Enter task name!");
    }
    else {
        addNewTask(taskName);
        showGreenNotification(`New task  <q>${taskName}</q> added!`);
    }
    document.querySelector("#taskName").value = "";
});


function showGreenNotification(taskName) {
    const notification = `<div class="newTaskNotification">
        <div>${taskName}</div>
    </div>`;
    document.querySelector(".notification-container").innerHTML += notification;
    setTimeout(() => {
        document.querySelector('.newTaskNotification').classList.add("notificationFadeOut");
        setTimeout(() => document.querySelector('.newTaskNotification').remove(), 1000);
    }, 2000)
}

function showRedNotification(taskName) {
    let notification = `<div class="newTaskNotification" id="red">
        <div>${taskName}</div>
    </div>`;
    document.querySelector(".notification-container").innerHTML += notification
    setTimeout(() => {
        document.querySelector('.newTaskNotification').classList.add("notificationFadeOut");
        setTimeout(() => document.querySelector('.newTaskNotification').remove(), 1000);
    }, 2000)
}

function showGoldNotification(taskName) {
    let notification = `<div class="newTaskNotification" id="gold">
        <div>${taskName}</div>
    </div>`;
    document.querySelector(".notification-container").innerHTML += notification
    setTimeout(() => {
        document.querySelector('.newTaskNotification').classList.add("notificationFadeOut");
        setTimeout(() => document.querySelector('.newTaskNotification').remove(), 1000);
    }, 2000)
}

  