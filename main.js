const taskForm = document.getElementById("taskForm");
const taskFilter = document.querySelector(".taskFilter");
const taskList = document.querySelector(".taskList");
const notificationList = document.querySelector(".notification-container");

notificationList.addEventListener("click",(e)=>{
    if (e.target.classList.contains("newTaskNotification")) e.target.remove();
    if (e.target.classList.contains("taskNotificationText")) e.target.parentNode.remove();
});
// when list is empty appears
let emptylistslide1 = document.querySelector(".emptylistslide1");
let emptylistslide2 = document.querySelector(".emptylistslide2");
let emptylistslide3 = document.querySelector(".emptylistslide3");
document.addEventListener("DOMContentLoaded", getLocalTasks);


function addNewTask(taskName) {
    emptylistslide3.style.display = "none";
    emptylistslide1.style.display = "none";
    const newTask = document.createElement('li');
    newTask.classList.add("taskItem");
    newTask.classList.add("incompleted");
    newTask.innerHTML = `<div class="taskText">${taskName}</div>`;
    const delImg = document.createElement("img");
    delImg.src = "./images/delete.png";
    delImg.id = "delete";
    newTask.appendChild(delImg);
    let flag = saveLocalTasks(taskName, "incompleted");
    
    if (!flag){ 
        if (taskFilter.value == "completed") {        
            newTask.style.display = "none";
            emptylistslide2.style.display = "flex";
        }
        if (taskFilter.value == "incompleted") {        
            emptylistslide3.style.display = "none";
        }
        taskList.appendChild(newTask);}
    return flag;
}


taskList.addEventListener("click", function(e){
    if (e.target.tagName === "LI" && e.target.classList.contains("completed")){
        e.target.classList.remove("completed");
        e.target.classList.toggle("incompleted");
        if (taskFilter.value == "completed") {
            if (document.querySelector(".completed") == null) emptylistslide2.style.display = "flex";       
            e.target.style.display = "none";
            
        }
        saveLocalTasks(e.target.querySelector(".taskText").innerHTML, "incompleted");
        showRedNotification(`Task <q>${e.target.querySelector(".taskText").innerHTML}</q> incomplited`);
    }
    else if (e.target.tagName === "LI"){
        e.target.classList.toggle("completed");
        e.target.classList.remove("incompleted");
        if (taskFilter.value == "incomplete") {
            if (document.querySelector(".incompleted") == null) emptylistslide3.style.display = "flex";          
            e.target.style.display = "none";
        }
        saveLocalTasks(e.target.querySelector(".taskText").innerHTML, "completed");
        showGoldNotification(`Task <q>${e.target.querySelector(".taskText").innerHTML}</q> completed!`);
    }
    if (e.target.tagName === "IMG"){
        showRedNotification(`Task <q>${e.target.parentNode.querySelector(".taskText").innerHTML}</q> was deleted!`);
        deleteFromLocalTasks(e.target.parentNode);
        e.target.parentNode.remove();
        if (document.querySelector(".taskList").getElementsByTagName("li").length == 0){
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
})


taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = document.querySelector("#taskName").value;
    if (taskName == "") {
        showRedNotification("Enter task name!");
    }
    else {
        let flag = addNewTask(taskName);
        if (!flag) showGreenNotification(`New task  <q>${taskName}</q> added!`);
    }
    document.querySelector("#taskName").value = "";
});


function showGreenNotification(taskName) {
    const notification = `<div class="newTaskNotification">
        <div class="taskNotificationText">${taskName}</div>
    </div>`;
    document.querySelector(".notification-container").innerHTML += notification;
    setTimeout(() => {
        document.querySelector('.newTaskNotification')?.classList.add("notificationFadeOut");
        setTimeout(() => document.querySelector('.newTaskNotification')?.remove(), 1000);
    }, 2000)
}
function showRedNotification(taskName) {
    let notification = `<div class="newTaskNotification" id="red">
        <div class="taskNotificationText">${taskName}</div>
    </div>`;
    document.querySelector(".notification-container").innerHTML += notification;
    setTimeout(() => {
        document.querySelector('.newTaskNotification')?.classList.add("notificationFadeOut");
        setTimeout(() => document.querySelector('.newTaskNotification')?.remove(), 1000);
    }, 2000)
}
function showGoldNotification(taskName) {
    let notification = `<div class="newTaskNotification" id="gold">
        <div class="taskNotificationText">${taskName}</div>
    </div>`;
    document.querySelector(".notification-container").innerHTML += notification
    setTimeout(() => {
        document.querySelector('.newTaskNotification')?.classList.add("notificationFadeOut");
       setTimeout(() => document.querySelector('.newTaskNotification')?.remove(), 1000);
    }, 2000)
}


taskFilter.addEventListener("change", filterTasks);
function filterTasks(e){
const tasks = taskList.childNodes;
tasks.forEach(function(task){
    switch(e.target.value){
        case "all":
            if (document.querySelector(".taskList").querySelector(".taskItem") === null){
                emptylistslide1.style.display = "flex";
            }
            emptylistslide2.style.display = "none";
            emptylistslide3.style.display = "none";
            task.style.display = 'flex';
            break;
        case "completed":
            emptylistslide1.style.display = "none";
            emptylistslide3.style.display = "none";
            if (document.querySelector(".taskList").querySelector(".completed") === null){
                emptylistslide2.style.display = "flex";
            }
            if (task.classList.contains("completed")) {
                task.style.display = 'flex';
            }else{
                task.style.display = "none";
            }
            break;
        case "incomplete":
            emptylistslide1.style.display = "none";
            emptylistslide2.style.display = "none";
            if (document.querySelector(".taskList").querySelector(".incompleted") === null){
                emptylistslide3.style.display = "flex";
            }
            if (task.classList.contains("incompleted")) {
                task.style.display = 'flex';
            }else{
                task.style.display = "none";
            }
            break;
    }
});
}


function saveLocalTasks(taskName, taskStatus){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    flag = 0;
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].task === taskName){
            if (tasks[i].status === taskStatus){
                showRedNotification(`You already have task <q>${taskName}</q>!`);
                return 1;
            }
            tasks[i] = {
                "task":taskName,
                "status":taskStatus
            };
            flag = 1;
            break;
        }
    }
    if(flag == 1){
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return flag;
    }
    tasks.push({
        "task":taskName,
        "status":taskStatus
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return flag;
}

function getLocalTasks(){
    let tasks;
    
    if(localStorage.getItem('tasks') === null || JSON.parse(localStorage.getItem('tasks')).length == 0){
        emptylistslide1.style.display = "flex";
        tasks = [];
    }else{
        emptylistslide1.style.display = "none";
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) => {
        if (document.querySelector(".emptylistslide") != null){
            emptylistslide = document.querySelector(".emptylistslide");
            document.querySelector(".emptylistslide").remove();
        }
        const newTask = document.createElement('li');
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

function deleteFromLocalTasks(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.splice(tasks.indexOf(task.querySelector(".taskText").innerHTML),1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}