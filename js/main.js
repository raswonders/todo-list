(function() {
    var textBar = document.querySelector('.text-bar')
    var taskForm = document.querySelector('.task-form')
    var objList = []

    function task(msg) {
        this.done = false;
        this.msg = msg;
    }


    taskForm.addEventListener('submit', function addTask(e) {
        e.preventDefault()

        objList.push(new task(textBar.value))
        textBar.value = ""
    })
})();