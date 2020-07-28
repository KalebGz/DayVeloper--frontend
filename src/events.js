
class Event{
    constructor(id, title, datetime){
        this.id = id
        this.title = title
        this.datetime = new Date (datetime)
    }

    render(){
        const eventPanel = qs('div.events')
        const eventDiv = ce('div')
        eventDiv.className= `event${this.id}`

        const h2 = ce('h2')
        
        const dateStr = this.datetime.getFullYear()+'-'+(this.datetime.getMonth()+1)+'-'+this.datetime.getDate();
        h2.innerText = `-${this.title} ON ${dateStr}`

        const editBtn = ce('button')
        editBtn.innerText = "EDIT"

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
        eventDiv.append(h2, editBtn, deleteBtn)
        event
    }


}

document.addEventListener('DOMContentLoaded', () => {
    const eventPanel = qs("div.events")
    const eventsUrl = "http:/localhost:3000/api/v1/events"
    
    eventPanel.innerHTML = ''
    
    function fetchEvents(){

        fetch(eventsUrl)
        .then(res => res.json())
        .then(events => events.forEach(event => {
            renderEvent(event)
        }))
    }

    function renderEvent(event){
        let e = new Event(event.id, event.title, event.notif_time)
        e.render()
    }



    function newEventForm(){
        const form = ce('FORM')

        const input1= ce('INPUT')
        input1.type= 'Text'
        input1.name= 'Title'
        input1.placeholder= 'Title'
        form.append(input1)

        const input2= ce('INPUT')
        input2.type= 'datetime-local'
        input2.name= 'notif-time'
        input2.value= "2018-06-12T19:30"
        form.append(input2)

        // userCheckBoxes(form)

        const input3= ce('INPUT')
        input3.type= 'Submit'
        input3.value= 'Create New Event'
        form.append(input3)

        eventPanel.append(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let configObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title: form[0].value, 
                    notif_time: form[1].value,
                    user_id: 1
                })
              }

              fetch(eventsUrl, configObj )
              .then(res => res.json())
              .then(event => renderEvent(event))

        })
    }
    
    /* Function Calls */
    fetchEvents()
    newEventForm()
})

/* Macro functions */
function ce(ele){
    return document.createElement(ele)
}

function qs(ele){
    return document.querySelector(ele)
}