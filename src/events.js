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

    // my_form=document.createElement('FORM');
    // my_form.name='myForm';
    // my_form.method='POST';
    // my_form.action='http://www.another_page.com/index.htm';
    
    // my_tb=document.createElement('INPUT');
    // my_tb.type='TEXT';
    // my_tb.name='myInput';
    // my_tb.value='Values of my Input';
    // my_form.appendChild(my_tb);
    
    // my_tb=document.createElement('INPUT');
    // my_tb.type='HIDDEN';
    // my_tb.name='hidden1';
    // my_tb.value='Values of my hidden1';
    // my_form.appendChild(my_tb);
    // document.body.appendChild(my_form);
    // my_form.submit();

    function newEventForm(){
        const form = document.ce('FORM')
        form.name= 'newEvent'
        form.method= 'POST'
        form.action= 'http:/localhost:3000/api/v1/events'

        const input1= document.ce('INPUT')
        input1.type= 'Text'
        input1.name= 'Title'
        form.append(input1)

        const input1= document.ce('INPUT')
        input1.type= 'Submit'
        input1.value= 'Create New Event'
        form.append(input1)

        document.querySelector("div.events").append(form)
    }
    
    /* Function Calls */
    fetchEvents()
    newEventForm()
})

function ce(ele){
    return document.createElement(ele)
}