(function () {
    const textBarDOM = document.querySelector('.text-bar')
    const taskFormDOM = document.querySelector('.task-form')
    const taskListDOM = document.querySelector('.task-list')
    const clearBtnDOM = document.querySelector('.btn-remove-item')

    var editing = false

    var tasksList;

    function Task(msg) {
        this.done = false;
        this.msg = msg;
    }

    function clearTextBarDOM() {
        textBarDOM.value = ""
    }

    function clearTasksDOM() {
        taskListDOM.innerHTML = ""
    }

    function clearTasksList() {
        tasksList = []
    }

    function displayTasks(tasks) {
        clearTasksDOM()

        tasks.forEach(function (t, i) {
            const el = document.createElement('li')
            let checkIcon = document.createElement('i')
            checkIcon.classList.add('far')


            const icons = []
            icons.push('<i class="far fa-check-circle"></i>')
            icons.push('<i class="far fa-edit"></i>')
            icons.push('<i class="far fa-times-circle"></i>')
            let linkedIcons = ""
            let iconBox = ""
            for (let i of icons) {
                linkedIcons += `<a class="icon-link" href="#">${i}</a>`
            }
            iconBox = `<div class="task-icons">${linkedIcons}</div>`
            el.innerHTML = `<div class="task-msg">${t.msg}</div>${iconBox}`
            el.dataset.taskIndex = i
            el.classList.add("task")
            if (t.done) {
                el.classList.add("done")
            }
            addIconListeners(el)
            taskListDOM.appendChild(el)
        })
    }

    function addIconListeners(element) {
        // Scratch task
        element.querySelector('.fa-check-circle').addEventListener('click', function deleteTask(e) {
            let task = tasksList[e.target.closest('li').dataset.taskIndex]
            task.done = ! task.done
            displayTasks(tasksList)
        })

        // Delete task
        element.querySelector('.fa-times-circle').addEventListener('click', function deleteTask(e) {
            tasksList.splice(e.target.closest('li').dataset.taskIndex, 1)
            displayTasks(tasksList)
        })

        // Update task
        element.querySelector('.fa-edit').addEventListener('click', function editTask(e) {
            // if in edit mode already, submit the task before editing new one
            if (editing) {
                taskFormDOM.requestSubmit()
            }

            // set state
            editing = true

            let task = e.target.closest('li')
            textBarDOM.value = task.querySelector('.task-msg').textContent
            textBarDOM.focus()
            tasksList.splice(task.dataset.taskIndex, 1)
            displayTasks(tasksList)
        })
    }

    taskFormDOM.addEventListener('submit', function addTask(e) {
        e.preventDefault()

        // set state
        editing = false

        // converts textBar value to Title Case
        let msgTitleCase = textBarDOM.value.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

        clearTasksDOM()
        tasksList.push(new Task(msgTitleCase))
        clearTextBarDOM()
        displayTasks(tasksList)
    })

    clearBtnDOM.addEventListener('click', function clearAll() {
        clearTasksList()
        clearTasksDOM()
    })

    window.addEventListener('beforeunload', function saveTasksList(e) {
        localStorage.setItem('tasks', JSON.stringify(tasksList))
    })

    window.addEventListener('load', function loadTasksList(e) {
        // Init tasksList
        tasksJSON = localStorage.getItem('tasks')
        if (tasksJSON) {
            tasksList = JSON.parse(tasksJSON)
        } else {
            tasksList = []
        }

        displayTasks(tasksList)
    })
})();