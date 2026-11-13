function addTask(){
    const list = document.getElementById("todolist");

    let inputTask = document.getElementById("inputTask");

    let inputText = inputTask.value.trim();
    if(inputText === ""){
        alert("enter a task please!");
        return;
    }

    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        updateprogress();
        saveTasks();
    });

    let span = document.createElement("span");
    span.textContent = inputText;
    li.append(checkbox);
    li.append(span);

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = () =>{
        li.remove();
        updateprogress();
        saveTasks();
    }

    li.append(btn);
    list.append(li);
    saveTasks();
    updateprogress();

    inputTask.value ="";
    inputTask.focus();

}

function updateprogress(){
    const tasks = document.querySelectorAll("#todolist li");
    const completedtasks = document.querySelectorAll("#todolist li input[type='checkbox']:checked");

    let total = tasks.length;
    let completed = completedtasks.length;

    let percentage;
    if(total===0){
        percentage = 0;
    }else{
        percentage = Math.round((completed / total)*100);
    }

    document.getElementById("progressText").textContent = percentage + "% Completed";

    document.getElementById("progressFill").style.width = percentage + "%";

}


function saveTasks(){

    const tasks = document.querySelectorAll("#todolist li");

    let tasksArray = [];

    tasks.forEach(task => {

        let text = task.querySelector("span").textContent;
        let completed = task.querySelector("input").checked;

        tasksArray.push({
            text: text,
            completed: completed
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasksArray));

}


function loadTasks(){

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {

       createTask(task.text, task.completed);

    });

    updateprogress();

}


function createTask(taskText, isCompleted = false){
    const list = document.getElementById("todolist");

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    checkbox.addEventListener("change", () => {
        updateprogress();
        saveTasks();
    });

    let span = document.createElement("span");
    span.textContent = taskText;

    li.append(checkbox);
    li.append(span);

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = () => {
        li.remove();
        updateprogress();
        saveTasks();
    };

    li.append(btn);
    list.append(li);

}

loadTasks();


if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("Service Worker registered successfully");
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}