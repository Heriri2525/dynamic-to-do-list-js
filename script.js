document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false means don't save again
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Prevent empty tasks when added by user
        if (save && taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task from DOM and localStorage
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field if user is typing
        if (save) {
            taskInput.value = '';
        }
    }

    // Remove a task from localStorage
    function removeFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task on button click
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        addTask(taskText, true);
    });

    // Add task on Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText, true);
        }
    });
});
