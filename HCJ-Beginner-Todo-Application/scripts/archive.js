let tableBody = document.getElementById("todoTableBody");
let prioritySelect = document.getElementById("prioritySelect");
let statusSelect = document.getElementById("statusSelect");

function updateTodoList() {
  let archive = JSON.parse(localStorage.getItem("archive")) || [];
  tableBody.innerHTML = "";

  archive.forEach((item, index) => {
    let row = tableBody.insertRow();
    let nameCell = row.insertCell(0);
    let priorityCell = row.insertCell(1);
    let statusCell = row.insertCell(2);
    let restoreCell = row.insertCell(3);
    let delateCell = row.insertCell(4);

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
      localStorage.setItem("archive", JSON.stringify(archive));
      updateTodoList();
    });

    statusCell.append(togglebtn);
    statusCell.style.cursor = "pointer";

    let restorebtn = document.createElement("button");
    restorebtn.className = "restoreBtn";
    restorebtn.innerText = "Restore";
    restorebtn.addEventListener("click", () => {
      let todoItm = archive.splice(index, 1);
      localStorage.setItem("archive", JSON.stringify(archive));
      let todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.push(todoItm[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    });
    restoreCell.append(restorebtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button", "deleteBtn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      archive.splice(index, 1);

      localStorage.setItem("archive", JSON.stringify(archive));
      updateTodoList();
    });

    delateCell.append(deleteBtn);
    row.append(nameCell, priorityCell, statusCell, restoreCell, delateCell);

    tableBody.append(row);
  });
}
updateTodoList();
