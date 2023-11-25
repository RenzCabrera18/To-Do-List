const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let spanDelete = document.createElement("span");
    spanDelete.innerHTML = "\u00d7"; // code for delete icon
    spanDelete.className = "delete";
    li.appendChild(spanDelete);

    let spanUpdate = document.createElement("span");
    spanUpdate.innerHTML = "\u270E"; // code for update icon
    spanUpdate.className = "update";
    li.appendChild(spanUpdate);

    listContainer.appendChild(li);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.className === "delete") {
      e.target.parentElement.remove();
      saveData();
    } else if (e.target.className === "update") {
      updateTask(e.target.parentElement);
    } else if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    }
  },
  false
);

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function updateTask(taskElement) {
  const updatedText = prompt("Update task:", taskElement.innerText);
  if (updatedText !== null) {
    taskElement.innerHTML = updatedText;

    let spanDelete = document.createElement("span");
    spanDelete.innerHTML = "\u00d7";
    spanDelete.className = "delete";
    taskElement.appendChild(spanDelete);

    let spanUpdate = document.createElement("span");
    spanUpdate.innerHTML = "\u270E";
    spanUpdate.className = "update";
    taskElement.appendChild(spanUpdate);

    saveData();
  }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
