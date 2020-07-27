class Event{
    constructor(title, datetime){
        this.title = title
        this.datetime = new Date (datetime)
    }

    render(){
        const eventPanel = document.querySelector("div.events")

        let h2 = document.createElement('h2')
        // console.log(this.datetime)
        const dateStr = this.datetime.getFullYear()+'-'+(this.datetime.getMonth()+1)+'-'+this.datetime.getDate();
        h2.innerText = `-${this.title} ON ${dateStr}`
        eventPanel.append(h2)
    }


}

document.addEventListener('DOMContentLoaded', () => {
    
    const eventsUrl = "http:/localhost:3000/api/v1/events"
    const eventPanel = document.querySelector("div.events")
    eventPanel.innerHTML = ''
    
    function fetchEvents(){

        fetch(eventsUrl)
        .then(res => res.json())
        .then(events => events.forEach(event => {
            appendEvent(event)
        }))
    }

    function appendEvent(event){
        let e = new Event(event.title, event.notif_time)
        e.render()
    }


    
    /* Function Calls */
    fetchEvents()
})