function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}

function task(title, description, date, priority, completed){
    this.taskTitle = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.completed = completed;
}

function project(title){
    this.projectTitle = title;
    this.tasks = [];
}

allTasks = []

todayTasks = []

weekTasks = []

importantTasks = []

allProjects = []

function newProject(title){
    let temp = new project(title);
    allProjects.push(temp);
}

function displayProjects(){
    let arrLen = allProjects.length;
    for (let i = 0; i < arrLen; i++){
        let newItem = document.createElement("div");
        let list = document.querySelector(".project-items");
        newItem.textContent = allProjects[i].projectTitle;
        list.appendChild(newItem);
        console.log(allProjects[i].projectTitle);
    }
}

newProject("Aarushi")
newProject("mwah")
console.log(allProjects)
displayProjects()