(function(){

const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTaskInput");
const addBtn = document.getElementById("addTaskBtn");

const pendingSpan = document.getElementById("pendingCount");
const completedSpan = document.getElementById("completedCount");

const clearBtn = document.getElementById("clearCompleted");

const progressFill = document.getElementById("progressFill");


/* DATA AUTOMÁTICA */

const dayName = document.getElementById("dayName");
const fullDate = document.getElementById("fullDate");

const today = new Date();

const days = [
"domingo",
"segunda-feira",
"terça-feira",
"quarta-feira",
"quinta-feira",
"sexta-feira",
"sábado"
];

const months = [
"janeiro","fevereiro","março",
"abril","maio","junho",
"julho","agosto","setembro",
"outubro","novembro","dezembro"
];

dayName.textContent = days[today.getDay()];

fullDate.textContent =
`${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;


/* ATUALIZAR ESTATÍSTICAS */

function updateStats(){

const items = taskList.querySelectorAll(".task-item");

let completed = 0;

items.forEach(item=>{

const checkbox = item.querySelector(".task-check");

if(checkbox.checked){

completed++;

item.classList.add("completed");

}else{

item.classList.remove("completed");

}

});

const pending = items.length - completed;

pendingSpan.textContent = pending;
completedSpan.textContent = completed;


const percentage = items.length === 0
? 0
: (completed/items.length)*100;

progressFill.style.width = percentage + "%";

}


/* SALVAR TAREFAS */

function saveTasks(){

const tasks = [];

document.querySelectorAll(".task-item").forEach(item=>{

const text = item.querySelector(".task-text").textContent;

const completed = item.querySelector(".task-check").checked;

tasks.push({
text:text,
completed:completed
});

});

localStorage.setItem("dailyTasks", JSON.stringify(tasks));

}


/* CARREGAR TAREFAS */

function loadTasks(){

const stored = localStorage.getItem("dailyTasks");

if(!stored) return;

const tasks = JSON.parse(stored);

tasks.forEach(task=>{
createTask(task.text, task.completed);
});

}


/* CRIAR TAREFA */

function createTask(text, completed=false){

const li = document.createElement("li");
li.className="task-item";

const checkbox = document.createElement("input");
checkbox.type="checkbox";
checkbox.className="task-check";

checkbox.checked = completed;

const span = document.createElement("span");
span.className="task-text";
span.textContent=text;

const delBtn = document.createElement("button");
delBtn.className="delete-task";
delBtn.innerHTML="✕";


checkbox.addEventListener("change",()=>{

updateStats();
saveTasks();

});


delBtn.addEventListener("click",()=>{

li.remove();

updateStats();
saveTasks();

});


li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(delBtn);

taskList.appendChild(li);

updateStats();
saveTasks();

}


/* ADICIONAR TAREFA */

function addTask(){

const text = newTaskInput.value.trim();

if(text==="") return;

createTask(text);

newTaskInput.value="";
newTaskInput.focus();

}


addBtn.addEventListener("click",addTask);


newTaskInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){
addTask();
}

});


/* LIMPAR CONCLUÍDAS */

clearBtn.addEventListener("click",()=>{

const items = taskList.querySelectorAll(".task-item");

items.forEach(item=>{

const checkbox = item.querySelector(".task-check");

if(checkbox.checked){
item.remove();
}

});

updateStats();
saveTasks();

});


loadTasks();

})();