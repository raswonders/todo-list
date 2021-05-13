(function() {
    const textBarDOM = document.querySelector('.text-bar')
    const taskFormDOM = document.querySelector('.task-form')
    const taskListDOM = document.querySelector('.task-list')
    var taskList = []

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

    function displayTasks(tasks) {
        for (let t of tasks) {
            const el = document.createElement('li')
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
            el.classList.add("task")
            if (t.done) {
                el.classList.add("done")
            }
            taskListDOM.appendChild(el)
        }
    }

    taskFormDOM.addEventListener('submit', function addTask(e) {
        e.preventDefault()

        // converts textBar value to Title Case
        let msgTitleCase = textBarDOM.value.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

        clearTasksDOM()
        taskList.push(new Task(msgTitleCase))
        clearTextBarDOM()
        displayTasks(taskList)
    })
})();