// Create layout
document.addEventListener('DOMContentLoaded', () => {
    
    // Date at the top
    let today = new Date();
    var mon = today.toLocaleString('default', { month: 'long' })
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const h1 = ce("h1")
    h1.className = 'title'
    h1.innerText = `${mon} ${today.getDate()}, ${today.getFullYear()}`
    document.body.append(h1)

    // Top (weather + events)
    const top = ce('div')
    top.className = "box top"
    
    const weatherDiv = ce('div')
    weatherDiv.className = 'weather'
    const weatherTitle = ce('H1')
    weatherTitle.innerText = 'Weather'
    weatherTitle.className= 'panelTitle' 
    weatherDiv.append(weatherTitle)
    const eventDiv = ce('div')

    eventDiv.className = 'events'
    const eventTitle = ce('H1')
    eventTitle.innerText = 'Events'
    eventTitle.className= 'panelTitle' 
    eventDiv.append(eventTitle)
    top.append(weatherDiv, eventDiv)

    const wordPanel = ce('div')
    wordPanel.className = "box words"


    const taskPanel = ce('DIV')
    taskPanel.className = "box tasks"

    const taskCats = ce('DIV')
    taskCats.className = "category taskCats"
    const taskList = ce('DIV')
    taskList.className= 'taskList'
    taskPanel.append(taskCats, taskList)

    document.body.append(top, wordPanel, taskPanel)

    function ce(ele){
        return document.createElement(ele)
    }
})