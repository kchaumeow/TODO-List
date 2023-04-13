const taskForm = document.getElementById("taskForm")
const addTaskButton = document.getElementById("taskButton")
console.log(taskForm)
console.log(addTaskButton)
taskForm.addEventListener('submit', function (e){
    e.preventDefault();
    const taskName = document.querySelector("#taskName").value;
    addNewTask(taskName);
    showNotification("New task added!");
    }
);

function showNotification(taskName) {
    const notification = `<div class="newTaskNotification">
        <div>${taskName}</div>
    </div>`;
    document.querySelector(".notification-container").innerHTML += notification
    setTimeout(() => {
        document.querySelector('.newTaskNotification').classList.add("notificationFadeOut");
        setTimeout(() => document.querySelector('.newTaskNotification').remove(), 1000);
    }, 2000)
  }

function addNewTask(taskName){
    const newTask = `<div>${taskName}</div>`;
    document.querySelector(".tasks-container").innerHTML += newTask;
}



  