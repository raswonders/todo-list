(function() {
    const textBarDOM = document.querySelector('.text-bar')
    const taskFormDOM = document.querySelector('.task-form')
    const taskListDOM = document.querySelector('.task-list')
    var taskList = []

    function Task(msg) {
        this.done = false;
        this.msg = msg;
    }

    function clearMsg() {
        textBarDOM.value = ""
    }

    function clearTasks() {
        taskListDOM.innerHTML = ""
    }

    function displayTasks(tasks) {
        for (let t of tasks) {
            const el = document.createElement('li')
            const icons = `<div><i class="far fa-check-circle"></i><i class="far fa-edit"></i><i class="far fa-times-circle"></i></div>`
            el.innerHTML = `<div>${t.msg}</div>${icons}`
            el.classList.add("task")
            if (t.done) {
                el.classList.add("done")
            }
            taskListDOM.appendChild(el)
        }
    }

    taskFormDOM.addEventListener('submit', function addTask(e) {
        e.preventDefault()

        clearMsg()
        clearTasks()
        taskList.push(new Task(textBarDOM.value))
        displayTasks(taskList)
    })
})();