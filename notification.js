
const notificationList = document.querySelector(".notification-container");

export function showNotification(taskName, bgColor) {
  const notification = document.createElement("div");
  notification.classList.add("newTaskNotification");
  notification.style.backgroundColor = bgColor;

  const taskNotificationText = document.createElement("div");
  taskNotificationText.classList.add("taskNotificationText");
  taskNotificationText.textContent = taskName;
  notification.appendChild(taskNotificationText);
  notificationList.appendChild(notification);

  setTimeout(() => {
    notification?.classList.add("notificationFadeOut");
    setTimeout(() => notification?.remove(), 1000);
  }, 2000);
}

notificationList.addEventListener("click", (e) => {
  if (e.target.classList.contains("newTaskNotification")) e.target.remove();
  if (e.target.classList.contains("taskNotificationText"))
    e.target.parentNode.remove();
});


