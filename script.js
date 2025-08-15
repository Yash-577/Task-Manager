let menuList = document.getElementById('menu-list')
menuList.style.maxHeight= "0px";

function toggleMenu(){
    if(menuList.style.maxHeight=="0px")
    {
        menuList.style.maxHeight="300px"
    }else{
        menuList.style.maxHeight="0px";
    }
}

function toggleForm(){
    const forms= document.getElementById('form');
   forms.style.display = (forms.style.display === 'none' || forms.style.display === '') ? 'block' : 'none';

}

//formlogic
const titles = document.getElementById('title');
const descs =document.getElementById('desc');
const forms= document.getElementById('form');
const dateInput = document.getElementById('date'); 
const Priority = document.getElementById('priority'); 




forms.addEventListener('submit' , function (e) {
    e.preventDefault();

    const Task = titles.value.trim();
    const Description = descs.value.trim();
    const dateInput = document.getElementById('date').value;
    const Priority= document.getElementById('priority').value;


   if(!titles.checkValidity() || !descs.checkValidity()){
    if(Task.length<3){
    titles.setCustomValidity("Characters should be more than 3")

    }else{
        titles.setCustomValidity("")
    }
    titles.reportValidity();
    return;
   }

   titles.setCustomValidity("")
    
 let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

   const newTask={
    name: Task,
    priority: Priority.value,
    date: dateInput.value || new Date().toLocaleString(),
    description: Description,
   };
  
   tasks.push(newTask);

   localStorage.setItem('tasks', JSON.stringify(tasks));

   displayTasks();
    forms.reset();


});

//Display Tasks
function displayTasks() {
    const taskListContainer = document.getElementById('form');
    taskListContainer.innerHTML = ""; // Clear old tasks

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const taskItem = `
            <div class="task">
                <strong>${task.name}</strong> - <em>${task.priority}</em>
                <span style="font-size:0.8em; color:gray;">${task.date}</span>
                <button class="dlt" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskListContainer.insertAdjacentHTML('beforeend', taskItem);
    });
}

//fetch motivational quotes
let div= document.getElementById('menu');
let display=0;
function hideShow(){
{
    if(display==1){
        div.style.display='block';
        display=0;
    }else{
        div.style.display='none';
        display=1;
    }
}

}
let ai= document.getElementById('aiaddition');
let disp=0;
function aiIntegration(){
    {
        if(disp==1){
            ai.style.display='block';
            disp=0;
        }else{
            ai.style.display='none';
            disp=1;
        }
    }

}

function quotes() {
    fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': 'Your_Api_Key_Here' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('quote').textContent=`${data[0].quote}`;
        document.getElementById('author').textContent=`-${data[0].quote}`;
        document.getElementById('quote-box').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });

    function hide(){

    }
}

// Delete Tasks
// Delete Task Function (Minimal change)
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // remove the task
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); // refresh UI
}
//Edit Tasks
function editPrompt(){
    let tasks= JSON.parse(localStorage.getItem('tasks')) || [];

    if(tasks.length==0){
        alert("no tasks to edit");
        return;
    }

    let taskNumber= prompt(`Enter number of task to edit(1-${tasks.length}):`);
    if (taskNumber=== null) return;
    
    taskNumber= parseInt(taskNumber);
    if(isNaN(taskNumber) || taskNumber<1 || taskNumber>tasks.length){
        alert("Please Enter Valid Number");
        return;
    }
    const index= taskNumber-1;
    const task= tasks[index];

    const newName= prompt(`Enter task title:`,task.name);
    if (newName===null) return;
    const newDesc= prompt('Edit task description:', task.description);
    if (newDesc===null) return;
    const newDate= prompt('Edit task date:',task.date);
    if (newDate===null) return;
    const newPriority= prompt('Edit task priority (high, medium, low):',task.priority);
    if (newPriority===null) return;

      tasks[index]={
        name: newName.trim() || task.name,
        description: newDesc|| task.description,
        date: newDate || task.date,
        priority: newPriority|| task.priority
      };

      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
}