class Task{
    constructor(id, title, description){
        this.id = id
        this.title = title
        this.description = description
    }

    render(){
        const taskPanel = qs('div.tasks')

        const taskDiv = ce('div')
        taskDiv.className= `task${this.id}`

        const h2 = ce('h2')
        h2.id= `task${this.id}`

        if(this.description){
            h2.innerText= `${this.title}: ${this.description}`
        }else{
            h2.innerText= `${this.title}`
        }

        const editBtn = ce('button')
        editBtn.innerText = "EDIT"

        // TODO: DRY -> create function to create a standard form for creating/updating
        editBtn.addEventListener('click', () => {
            const form = ce('FORM')
            form.name= 'newTask'
            form.action= `http:/localhost:3000/api/v1/tasks/${this.id}`
    
            const input1= ce('INPUT')
            input1.type= 'Text'
            input1.name= 'title'
            input1.value= this.title
            input1.placeholder= 'title'
            form.append(input1)
    
            const input2= ce('INPUT')
            input2.type= 'text'
            input2.name= 'description'
            input2.value= this.description
            input2.placeholder= 'description'
            form.append(input2)
    
    
            const input3= ce('INPUT')
            input3.type= 'Submit'
            input3.value= 'Edit  Task'
            form.append(input3)

            form.addEventListener('submit', () => {
                event.preventDefault()

                let configObj = {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        title: form.title.value, 
                        description: form.description.value,
                        completed: false,
                        task_category_id: 1,
                        user_id: 1
                    })
                  }
    
                  fetch(`http:/localhost:3000/api/v1/tasks/${this.id}`, configObj)
                  .then(res => res.json())
                  .then(task => {
                    // Update the object with the new task
                    this.title = task.title
                    if(task.description){
                        this.description = task.description
                        qs(`h2#task${this.id}`).innerText=  `${this.title}: ${this.description}`
                    }else{
                        qs(`h2#task${this.id}`).innerText=  `${this.title}`
                    }
                    // Hide form
                    form.remove()
                    
                  })
    
            })
            taskDiv.append(form)
        })

        const deleteBtn = ce('button')
        deleteBtn.innerText = "DELETE"
        
        deleteBtn.addEventListener('click', () => {
            const deletedId = this.id
              fetch(`http:/localhost:3000/api/v1/tasks/${this.id}`, {method: 'DELETE'})
              .then( () => {
                qs(`div.task${deletedId}`).remove()
              })
        })

        taskDiv.append(h2, editBtn,deleteBtn)
        taskPanel.append(taskDiv)
    }
}

class Subtask{
    constructor(title, task_id){
        this.title = title
        this.task_id = task_id
    }

    render(){
        // const taskPanel = document.querySelector('div.tasks')
        
        const taskDiv = qs(`div.task${this.task_id}`)
        let h4 = document.createElement('h4')
        h4.innerText = `-${this.title}`
        taskDiv.append(h4)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    const taskCatUrl = 'http:/localhost:3000/api/v1/task_categories/1'
    const tasksUrl = 'http:/localhost:3000/api/v1/tasks'
    const taskPanel = document.querySelector('div.tasks')

    function fetchTasks(){    
        taskPanel.innerHTML = ''

        fetch(taskCatUrl)
        .then(res => res.json())
        .then(task_cat => task_cat.tasks.forEach( task => {
            renderTask(task)
            fetchSubtasks(task.id)
        }))
    }


    function renderTask(task){
        let t = new Task(task.id, task.title, task.description)
        t.render()
    }

    function fetchSubtasks(id){
        const taskUrl = `http:/localhost:3000/api/v1/tasks/${id}`

        fetch(taskUrl)
        .then(res => res.json())
        .then(task => task.subtasks.forEach( subtask => {
            renderSubtask(subtask)
        }))
    }


    function renderSubtask(subtask){
        let st = new Subtask(subtask.title, subtask.task_id)
        st.render()
    }

    function newTaskForm(){
        const form = ce('FORM')
        form.name= 'newTask'
        form.action= tasksUrl

        const input1= ce('INPUT')
        input1.type= 'Text'
        input1.name= 'title'
        input1.placeholder= 'title'
        form.append(input1)

        const input2= ce('INPUT')
        input2.type= 'text'
        input2.name= 'description'
        input2.placeholder= 'description'
        form.append(input2)


        const input3= ce('INPUT')
        input3.type= 'Submit'
        input3.value= 'Create New Task'
        form.append(input3)

        taskPanel.append(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let configObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title: form.title.value, 
                    description: form.description.value,
                    completed: false,
                    task_category_id: 1,
                    user_id: 1
                })
              }

              fetch(tasksUrl, configObj)
              .then(res => res.json())
              .then(task => renderTask(task))

        })
    }


    /* Function Calls */
    fetchTasks()
    newTaskForm()
})

/* Macro functions */
function ce(ele){
    return document.createElement(ele)
}

function qs(ele){
    return document.querySelector(ele)
}