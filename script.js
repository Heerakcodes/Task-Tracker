let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function addTask() {
    let input = document.getElementById("taskInput");
    let value = input.value.trim();

    if (value === "") {
        alert("Enter something!");
        return;
    }

    if (tasks.length >= 15) {
        alert("Only 15 tasks allowed");
        return;
    }

    tasks.push({ text: value, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    showTasks();
}

function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        if (filter === "completed" && !tasks[i].done) continue;
        if (filter === "pending" && tasks[i].done) continue;

        let li = document.createElement("li");

        let text = document.createElement("span");
        text.innerText = tasks[i].text;

        if (tasks[i].done) {
            text.style.textDecoration = "line-through";
        }

        let completeBtn = document.createElement("button");
        completeBtn.innerText = "✔";
        completeBtn.className = "complete";
        completeBtn.onclick = function () {
            tasks[i].done = !tasks[i].done;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        };

        let editBtn = document.createElement("button");
        editBtn.innerText = "✏️";
        editBtn.className = "edit";
        editBtn.onclick = function () {
            let newText = prompt("Edit task", tasks[i].text);

            if (newText === null) return;
            if (newText.trim() === "") {
                alert("Cannot be empty");
                return;
            }

            tasks[i].text = newText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.className = "delete";
        deleteBtn.onclick = function () {
            tasks.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        };

        li.appendChild(text);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    }

    // counter (simple way)
    let count = 0;
    for (let t of tasks) {
        if (t.done) count++;
    }

    document.getElementById("counter").innerText =
        count + " / " + tasks.length + " completed";
}

function filterTasks(type) {
    filter = type;
    showTasks();
}

showTasks();