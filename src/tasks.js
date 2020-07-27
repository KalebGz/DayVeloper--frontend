class Task{
    constructor(title, description){
        this.title = title
        this.description = description
    }

    render(){
        const taskPanel = document.querySelector("div.tasks")
        let h2 = document.createElement('h2')
        if(this.description){
        h2.innerText = `${this.title}: ${this.description}`
        }else{
            h2.innerText = `${this.title}`
        }
        taskPanel.append(h2)
    }
}

class Subtask{
    constructor(title){
        this.title = title
    }

    render(){
        const taskPanel = document.querySelector("div.tasks")
        let h4 = document.createElement('h4')
        h4.innerText = `-${this.title}`
        taskPanel.append(h4)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    function fetchTasks(){    
        const taskPanel = document.querySelector("div.tasks")
        taskPanel.innerHTML = ''

        const tasksUrl = "http:/localhost:3000/api/v1/task_categories/1"

        fetch(tasksUrl)
        .then(res => res.json())
        .then(task_cat => task_cat.tasks.forEach( task => {
            renderTask(task)
            fetchSubtasks(task.id)
        }))
    }

    function fetchSubtasks(id){
        const taskUrl = `http:/localhost:3000/api/v1/tasks/${id}`

        fetch(taskUrl)
        .then(res => res.json())
        .then(task => task.subtasks.forEach( subtask => {
            renderSubtasks(subtask)
        }))
    }

    function renderTask(task){
        let t = new Task(task.title, task.description)
        t.render()
    }

    function renderSubtasks(subtask){
        let st = new Subtask(subtask.title)
        st.render()
    }

    //  Function Calls
    fetchTasks()
})