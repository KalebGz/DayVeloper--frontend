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
    const top = ce('DIV')
    top.className = "box top"

    const weatherDIV = ce('DIV')
    weatherDIV.className = 'weather'
    const weatherTitle = ce('H1')
    weatherTitle.innerText = 'Weather'
    weatherTitle.className= 'panelTitle' 
    weatherDIV.append(weatherTitle)

    const eventDIV = ce('DIV')
    eventDIV.className = 'events'
    const eventTitle = ce('H1')
    eventTitle.innerText = 'Events'
    eventTitle.className= 'panelTitle' 
    eventDIV.append(eventTitle)
    top.append(weatherDIV, eventDIV)

    const wordPanel = ce('DIV')
    wordPanel.className = "box words"
    const wordTitle = ce('H1')
    wordTitle.innerText = 'Words'
    wordTitle.className= 'panelTitle' 
    wordPanel.append(wordTitle)

    const taskPanel = ce('DIV')
    taskPanel.className = "box tasks"
    const taskTitle = ce('H1')
    taskTitle.innerText = 'Tasks'
    taskTitle.className= 'panelTitle' 
    // taskPanel.append(taskTitle)

    const taskCats = ce('DIV')
    taskCats.className = "category taskCats"
    const taskList = ce('DIV')
    taskList.className= 'taskList'
    taskPanel.append(taskCats, taskTitle, taskList)

    document.body.append(top, wordPanel, taskPanel)


    function ce(ele){
        return document.createElement(ele)
    }
})