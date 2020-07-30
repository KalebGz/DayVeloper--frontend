class Task{
    constructor(id, title, description){
        this.id = id
        this.title = title
        this.description = description
    }

    render(){
        const taskList = qs('div.taskList')

        const taskDiv = ce('div')
        taskDiv.className= `task${this.id}`

        const h3 = ce('h3')
        h3.id= `task${this.id}`
        h3.className = 'inline'

        if(this.description){
            h3.innerText= `${this.title}: ${this.description}`
        }else{
            h3.innerText= `${this.title}`
        }

        const editBtn = ce('button')
        editBtn.innerText = "EDIT"

        // TODO: DRY -> create function to create a standard form for creating/updating
        editBtn.addEventListener('click', () => {
            const form = ce('FORM')
    
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
                        qs(`h3#task${this.id}`).innerText=  `${this.title}: ${this.description}`
                    }else{
                        qs(`h3#task${this.id}`).innerText=  `${this.title}`
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

        taskDiv.append(h3, editBtn,deleteBtn)
        taskList.append(taskDiv)
    }
}

class Subtask{
    constructor(id, title, task_id){
        this.id = id
        this.title = title
        this.task_id = task_id
    }

    render(){
        
        const taskDiv = qs(`div.task${this.task_id}`)
        const subTaskDiv = ce('div')
        subTaskDiv.id = `subtask${this.id}`

        const h4 = document.createElement('h4')
        h4.innerText = `-${this.title}`
        h4.id= `subtask${this.id}`
        h4.className = 'subtask inline'

        const editBtn = ce('button')
        editBtn.innerText = "EDIT"
        editBtn.id= `subtask${this.id}`

        // TODO: DRY -> create function to create a standard form for creating/updating
        editBtn.addEventListener('click', () => {
            const form = ce('FORM')
    
            const input1= ce('INPUT')
            input1.type= 'Text'
            input1.name= 'title'
            input1.value= this.title
            input1.placeholder= 'title'
            form.append(input1)
        
            const submit= ce('INPUT')
            submit.type= 'Submit'
            submit.value= 'Edit Task'
            form.append(submit)

            form.addEventListener('submit', () => {
                event.preventDefault()

                let configObj = {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        title: form.title.value, 
                        task_id: this.task_id
                    })
                  }
    
                  fetch(`http:/localhost:3000/api/v1/subtasks/${this.id}`, configObj)
                  .then(res => res.json())
                  .then(task => {
                    // Update the object with the new task
                    this.title = task.title
                    qs(`h4#subtask${this.id}`).innerText=  `${this.title}`

                    // Hide form
                    form.remove()
                    
                  })
    
            })
            subTaskDiv.append(form)
        })

        const deleteBtn = ce('button')
        deleteBtn.innerText = "DELETE"
        editBtn.id= `subtask${this.id}`
        
        deleteBtn.addEventListener('click', () => {
            const deletedId = this.id
              fetch(`http:/localhost:3000/api/v1/subtasks/${this.id}`, {method: 'DELETE'})
              .then( () => {
                qs(`div#subtask${deletedId}`).remove()
                // qs(`button#subtask${deletedId}`).remove()
                // qs(`button#subtask${deletedId}`).remove()
              })
        })

        subTaskDiv.append(h4, editBtn,deleteBtn)
        taskDiv.append(subTaskDiv)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    let taskCatUrl = 'http:/localhost:3000/api/v1/task_categories/1'
    const taskCatsUrl = 'http:/localhost:3000/api/v1/task_categories'
    const tasksUrl = 'http:/localhost:3000/api/v1/tasks'
    const taskPanel = qs('div.tasks')
    const taskList = qs('div.taskList')
    const taskCats = qs('div.taskCats')
    let categoryId = -1;
    

    function fetchTaskCategories(cat){
        fetch(taskCatsUrl)
        .then(res => res.json())
        .then(taskCats => taskCats.forEach(taskCat => renderTaskCatBtn(taskCat)))
    }

    function renderTaskCatBtn(taskCat){
        // console.log(taskCat)
        taskCatBtn = ce('BUTTON')
        taskCatBtn.innerText= taskCat.name
        taskCatBtn.className= 'category'
        taskCats.append(taskCatBtn)

        taskCatBtn.addEventListener('click', () => {
            taskCatUrl = `http:/localhost:3000/api/v1/task_categories/${taskCat.id}`
            categoryId = taskCat.id
            fetchTasks()
        })


    }

    function fetchTasks(){    
        // debugger
        taskList.innerHTML = ''
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
        let st = new Subtask(subtask.id, subtask.title, subtask.task_id)
        st.render()
    }

    function newTaskForm(){
        const form = ce('FORM')

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
                    task_category_id: categoryId,
                    user_id: 1
                })
              }

              fetch(tasksUrl, configObj)
              .then(res => res.json())
              .then(task => renderTask(task))

        })
    }



    /* Function Calls */
    fetchTaskCategories()
    newTaskForm()
})

/* Macro functions */
function ce(ele){
    return document.createElement(ele)
}

function qs(ele){
    return document.querySelector(ele)
}