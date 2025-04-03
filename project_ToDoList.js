document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector(".input");
    const plusButton = document.querySelector(".plus-button");
    const list = document.querySelector(".list");

    // Загрузка сохранённых задач
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        list.innerHTML = savedTasks;
        // Назначаем обработчики для загруженных задач
        setupTaskEventListeners();
    }
    
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    plusButton.addEventListener('click', addTask);
    function addTask() {
        const taskText = input.value.trim();
        if (taskText === '') {
            alert('Empty field!');
            return;
        }

        // Создаём элементы
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        const editButton = document.createElement('button');
        editButton.className = 'pen-button';
        editButton.innerHTML = '<img class="pen-icon" src="pen.png" alt="Edit">';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'trash-button';
        deleteButton.innerHTML = '<img class="trash-icon" src="trash.png" alt="Delete">';

        // Добавляем элементы в taskItem (без taskContent)
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(taskTextSpan);

        // Добавляем задачу в список на странице HTML
        list.appendChild(taskItem);

        // Очищаем поле ввода
        input.value = '';

        // Добавляем обработчики
        taskTextSpan.addEventListener('click', toggleTask);
        editButton.addEventListener('click', editTask);
        deleteButton.addEventListener('click', deleteTask);

        saveTasks();
    }

    function toggleTask() {
        this.parentElement.classList.toggle('completed'); // Зачеркивается при нажатии на область с задачей, а не только на текст задачи
        saveTasks();
    }

    function editTask() {
        const taskText = this.parentElement.querySelector('span');
        const currentText = taskText.textContent;
        // Создаем input элемент для редактирования
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.value = currentText;
        inputText.className = 'inputText';
        // Заменяем span на input
        taskText.replaceWith(inputText);
        inputText.focus(); // Курсор уже нажат на input4

        // Функция для сохранения изменений
        const saveEdit = () => {
            const newText = inputText.value.trim();
            taskText.textContent = newText || currentText; // Если пусто, оставляем старый текст
            inputText.replaceWith(taskText); // Возвращаем span на место
            saveTasks();
        };
        inputText.addEventListener('blur', saveEdit);
        inputText.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') saveEdit();
        });
    }
    function deleteTask() {
            this.closest('.task-item').remove();
            saveTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', list.innerHTML);
        saveTasks();
    }

    // Функция для назначения обработчиков всем задачам
    function setupTaskEventListeners() {
        document.querySelectorAll('.task-item').forEach(task => {
            const span = task.querySelector('span');
            const editButton = task.querySelector('.pen-button');
            const deleteButton = task.querySelector('.trash-button');
            
            if (span) span.addEventListener('click', toggleTask);
            if (editButton) editButton.addEventListener('click', editTask);
            if (deleteButton) deleteButton.addEventListener('click', deleteTask);
        });
    }
});