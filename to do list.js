function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    
    li.innerHTML = `
        ${taskText}
        <button class="delete-btn" onclick="removeTask(this)">Delete</button>
        <input type="checkbox" onclick="toggleCompletion(this)">
    `;
    
    taskList.appendChild(li);
    taskInput.value = '';
}

function removeTask(button) {
    const li = button.parentElement;
    li.remove();
}

function toggleCompletion(checkbox) {
    const li = checkbox.parentElement;
    li.classList.toggle('completed');
}
