let addTodoButton = document.getElementById("addBtn");
let tableBody = document.getElementById("todoTableBody");
let inputTitle = document.getElementById("todoName");
let prioritySelect = document.getElementById("priority");

addTodoButton.addEventListener("click", () => {
  let todoName = inputTitle.value.trim();
  let priority = prioritySelect.value.trim();

  if (todoName === "") {
    alert("Todo cannot be empty!");
    return;
  }

  const todo = {
    title: todoName,
    priority: priority,
    status: "Pending🔃",
  };

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  todoName.value = "";
  priority.value = "low";
  updateTodoList();
});

function updateTodoList() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  tableBody.innerHTML = "";

  todos.forEach((item, index) => {
    let row = tableBody.insertRow();
    let nameCell = row.insertCell(0);
    let priorityCell = row.insertCell(1);
    let statusCell = row.insertCell(2);
    let delateCell = row.insertCell(3);

    nameCell.textContent = item.title;
    priorityCell.textContent = item.priority;
    if (priorityCell.textContent === "medium") {
      priorityCell.style.backgroundColor = "rgb(255,255,0)";
    } else if (priorityCell.textContent === "high") {
      priorityCell.style.backgroundColor = "rgb(255,0,0)";
    }
    let togglebtn = document.createElement("button");
    togglebtn.className = "toggle";
    togglebtn.innerText = item.status;
    togglebtn.addEventListener("click", () => {
      item.status = item.status === "Pending🔃" ? "Completed✅" : "Pending🔃";
      localStorage.setItem("todos", JSON.stringify(todos));
      updateTodoList();
    });

    statusCell.append(togglebtn);
    statusCell.style.cursor = "pointer";

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "archiveBtn";
    deleteBtn.textContent = "Archive";
    deleteBtn.addEventListener("click", () => {
      let archive = todos.splice(index, 1);
      console.log(archive);
      localStorage.setItem("todos", JSON.stringify(todos));

      //   const todoitem = todos.splice(index, 1);
      let todoitem = JSON.parse(localStorage.getItem("archive")) || [];
      todoitem.push(archive[0]);
      localStorage.setItem("archive", JSON.stringify(todoitem));
      updateTodoList();
    });

    delateCell.append(deleteBtn);
    row.append(nameCell, priorityCell, statusCell, delateCell);

    tableBody.append(row);
  });
}
updateTodoList();
