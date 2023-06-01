// Select input fields
// UI variables
const taskForm = document.getElementById('taskForm');
const inputTask = document.getElementById('task');
const inputHour = document.getElementById('hours');
const goodList = document.getElementById('good-list');
const badList = document.getElementById('bad-list');

// Let Array which stores tasks
let taskList = [];

// 0. Add event listener on form submit
taskForm.addEventListener('submit', (e) => {
    // Call add task function
    addTask(inputTask.value, inputHour.value);
    
    // Prevent default behaviour
    e.preventDefault();
});

// 1. Add Task function init
const addTask = (itemTask, itemTime) => {
    // If the task input and time input is not empty then..
    if(itemTask && itemTime !== ''){
        const task = {
            id: Date.now(),
            name: itemTask,
            time: itemTime,
            type: "entry",
        };

        // Then add the 'task' to 'taskList' array
        taskList.push(task);

        // 2. Add task values to the local storage
        addToLocalStorage(taskList);

        // Clear input field after value is submitted
        inputTask.value = '';
        inputHour.value = '';

        
    } else{
        alert('Please add the task and time.')
    }
}

// 2. addToLocalStorage function init
const addToLocalStorage = (taskList) =>{
    // Covert taskList array into string and store.
    localStorage.setItem('taskList', JSON.stringify(taskList));

    // 3. Render the store data in screen
    renderTask(taskList);
    renderBadTask(taskList);
} 

// 3. renderTask function init for entry or good task list
const renderTask = (taskList) => {
    // Clear everything inside the table body at first
    goodList.innerHTML = '';

    // Filter only good task
    const goodTask = taskList.filter((item) => item.type === 'entry');
    let html = '';
    goodTask.map((item) => {
        html += `
            <tr>
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onClick="deleteTask(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success btn-sm" onClick="switchTask(${item.id}, 'bad')">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </td>
            </tr>
        `
    });
    
    // Append the html code inside the parent div
    goodList.innerHTML = html
}

// 3. renderBadTask function init for the bad task
const renderBadTask = (taskList) => {
    // Clear everything inside the table body at first
    badList.innerHTML = '';

    // Filter only bad task
    const badTask = taskList.filter((item) => item.type === 'bad');
    let html = '';
    badTask.map((item) => {
        html += `
        <tr>
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td>
                <button class="btn btn-warning btn-sm" onClick="switchTask(${item.id}, 'entry')">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button class="btn btn-danger btn-sm" onClick="deleteTask(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    });

    // Append the html code inside the parent div
    badList.innerHTML = html;
}

// 4. Function to get eveything from the local storage
const getFromLocalStorage = () => {
    const reference = localStorage.getItem('taskList');
    // condition if the reference is exist
    if(reference){
        // Convert back to array and store it in todo array
        taskList = JSON.parse(reference);
        
        // 3. Get data from the local storage and render it to the screen
        renderTask(taskList);
        renderBadTask(taskList);
    }
}

// 4. Initially get everything from the local storage
getFromLocalStorage();

// 5. Function to delete the task
const deleteTask = (id) => {
    if(window.confirm("Are you sure you want to delete?")){
        taskList = taskList.filter((item) => item.id !== id);
    }

    addToLocalStorage(taskList)
}

// 6. Switch task function init
const switchTask = (id, type) => {
    taskList = taskList.map((item) => {
        if(item.id === id){
            item.type = type;
        }
        return item;
    });

    // 2. Store the updated data into the local storage
    addToLocalStorage(taskList);
}



