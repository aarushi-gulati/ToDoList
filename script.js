function uniqueID() {
    return Math.floor(Math.random() * Date.now());
}

function task(title, description, date, priority, completed, tempo){
    this.taskTitle = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.completed = completed;
    this.UID= tempo;
}

function project(title){
    this.projectTitle = title;
    this.tasks = [];
}

let allProjects = [];

let patta = document.querySelector(".patta");
patta.textContent = "All Tasks";

let currentProject = "None";

function displayProjects(){
    let arrLen = allProjects.length;
    let list = document.querySelector(".project-items");
    list.textContent = " ";
    for (const project in allProjects){
        let newItem = document.createElement("div");
        newItem.textContent = project;
        newItem.classList.add("item");
        newItem.classList.add("project")
        newItem.id = project;
        list.appendChild(newItem);
    }
}

function onButtonClick(){
    document.getElementById('textInput').className="show";
    document.getElementById('add').className = "hide";
}

function onSubmit(){
    let newTitle = document.getElementById("project-textbox").value;
    let newProject = new project(newTitle);
    document.getElementById('project-textbox').value = "";
    allProjects[newTitle] = newProject;
    document.getElementById('textInput').className="hide";
    document.getElementById('add').className = "show";
    displayProjects();
}

let container = document.querySelector(".menu");

let taskList = document.querySelector(".task-list");

function completeTask(e){
    if (e.target.className === "checked"){
        e.target.src = "/home/aarushi/Coding/ToDoList/Icons/checkbox-blank-circle-outline.svg";
        e.target.className = "unchecked";
        for (const prozect in allProjects){
            let presentTasks = allProjects[prozect];
            for (const presentTask in presentTasks){
                let x = presentTasks[presentTask];
                let y = x[0];
                let z = y.UID;
                console.log(z);
                if (presentTasks[presentTask][0].UID === e.target.id){
                    console.log(allProjects[prozect][presentTask]);
                    allProjects[prozect][presentTask].completed = false;
                }
            }
        }
        console.log("one");
    }
    else if (e.target.className === "unchecked"){
        e.target.src = "/home/aarushi/Coding/ToDoList/Icons/checkbox-marked-circle.svg";
        e.target.className = "checked";
        for (const prozect in allProjects){
            let presentTasks = allProjects[prozect];
            for (const presentTask in presentTasks){
                if (presentTasks[presentTask][0].UID === e.target.id){
                    console.log(allProjects[prozect][presentTask]);
                    allProjects[prozect][presentTask].completed = true;
                }
            }
        }
        console.log("two");
    }
}

taskList.addEventListener('click', completeTask);

function clickOnProject(e){
    if (e.target.classList.contains("item")){
        patta.textContent = e.target.id;
    }

    if (e.target.classList.contains("project")){
        currentProject = e.target.id;
        displayGivenTasks();
        document.getElementById('add-task').className="add-task";
    }

    if (e.target.id === "All Tasks" || e.target.id === "Important" || e.target.id === "Today" || e.target.id === "This Month"){
        document.getElementById('add-task').className="hide";
    }
}

function displayGivenTasks(){
    let currentTasks = allProjects[currentProject].tasks;
    displayTasks(currentTasks);
}

function displayTasks(lisht){
    taskList.textContent = " ";
    for (const currentTask in lisht){
        let currTask = document.createElement("div");
        let temp = lisht[currentTask];
        let currentTitle = temp.taskTitle;
        let currentDescription = temp.description;
        let currentDate = temp.date;
        let currentPriority = temp.priority; 

        let currTitle = document.createElement("div");
        currTitle.textContent = `Task Title: ${currentTitle}`;
        currTitle.classList.add("task-title")

        let currDesc = document.createElement("div");
        currDesc.textContent = `Task Description: ${currentDescription}`;
        currDesc.classList.add("task-desc")

        let currDate = document.createElement("div");
        currDate.textContent = `Due Date: ${currentDate.toLocaleDateString()}`;
        currDate.classList.add("task-date")

        let currPriority = document.createElement("img");
        if (currentPriority){
            currPriority.src = "/home/aarushi/Coding/ToDoList/Icons/star.svg";
        }
        else{
            currPriority.src = "/home/aarushi/Coding/ToDoList/Icons/star-outline.svg";
        }
        currPriority.classList.add("icon");

        let currTaskLeft = document.createElement("div");
        currTaskLeft.classList.add("task-list");
        let checkbox = document.createElement("img");

        if (temp.completed){
            checkbox.src = "/home/aarushi/Coding/ToDoList/Icons/checkbox-marked-circle.svg";
            checkbox.classList.add("checked");
        }
        else{
            checkbox.src = "/home/aarushi/Coding/ToDoList/Icons/checkbox-blank-circle-outline.svg";
            checkbox.classList.add("unchecked");
        }
        currTaskLeft.appendChild(checkbox);
        checkbox.id = temp.UID;

        let currTaskRight = document.createElement("div");

        let currDatePriority = document.createElement("div");
        currDatePriority.appendChild(currDate);
        currDatePriority.appendChild(currPriority);
        currDatePriority.classList.add("task-date-priority");

        currTaskRight.appendChild(currTitle);
        currTaskRight.appendChild(currDesc);
        currTaskRight.appendChild(currDatePriority);

        currTask.appendChild(currTaskLeft);
        currTask.appendChild(currTaskRight);

        currTask.classList.add("task");

        taskList.appendChild(currTask);
    }
}



container.addEventListener('click', clickOnProject);

function onSubmitTask(){
    let newTaskTitle = document.getElementById("title").value;
    let tempDate = document.getElementById("date").value;
    let taskYear = parseInt(tempDate.slice(0, 4));
    let taskMonth = parseInt(tempDate.slice(5, 8));
    let taskDate = parseInt(tempDate.slice(8))
    let dueDate = new Date(taskYear, taskMonth, taskDate);
    let desc = document.getElementById("desc").value;
    let priority = document.getElementById("priority").checked;
    let tempo = uniqueID();
    let newTask = new task(newTaskTitle, desc, dueDate, priority, false, tempo);
    allProjects[currentProject].tasks.push(newTask);
    document.getElementById('foram').className="hide";
    displayGivenTasks();
}

function onClickAddTask(){
    document.getElementById('foram').className="input";
}