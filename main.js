const taskForm = document.getElementById("taskForm")
const addTaskButton = document.getElementById("taskButton")
console.log(taskForm)
console.log(addTaskButton)
taskForm.addEventListener('submit', function (e){
    e.preventDefault();
    showNotification("New task added!");
    }
);

function showNotification(taskName) {
    const notification = `<div class="newTaskNotification">
        <div>${taskName}</div>
    </div>`;
    document.querySelector(".container-md").insertAdjacentHTML("beforeend",notification)
    setTimeout(() => document.querySelector('.newTaskNotification').remove(), 5000);
  }




  