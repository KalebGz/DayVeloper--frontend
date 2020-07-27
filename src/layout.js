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
    top.className = "top"
    const weatherDiv = ce('div')
    weatherDiv.className = 'weather'
    const eventDiv = ce('div')
    eventDiv.className = 'events'
    top.append(weatherDiv, eventDiv)

    const wordPanel = ce('div')
    wordPanel.className = "words"


    const taskPanel = ce('div')
    taskPanel.className = "tasks"

    document.body.append(top, wordPanel, taskPanel)

    function ce(ele){
        return document.createElement(ele)
    }
})