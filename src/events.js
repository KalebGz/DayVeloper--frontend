
class Event{
    constructor(title, datetime){
        this.title = title
        this.datetime = new Date (datetime)
    }

    render(){
        const eventPanel = qs("div.events")
        let h2 = ce('h2')
        // console.log(this.datetime)
        const dateStr = this.datetime.getFullYear()+'-'+(this.datetime.getMonth()+1)+'-'+this.datetime.getDate();
        h2.innerText = `-${this.title} ON ${dateStr}`
        eventPanel.append(h2)
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
        let e = new Event(event.title, event.notif_time)
        e.render()
    }



    function newEventForm(){
        const form = ce('FORM')
        form.name= 'newEvent'
        form.method= 'POST'
        form.action= 'http:/localhost:3000/api/v1/events'

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