class Word{
    constructor(term, definition){
        this.term = term
        this.definition = definition
    }

    render(){
        
        const wordPanel = document.querySelector("div.words")
        wordPanel.innerHTML = ''
        let h2 = document.createElement('h2')
        // console.log(this.datetime)
        // const dateStr = this.datetime.getFullYear()+'-'+(this.datetime.getMonth()+1)+'-'+this.datetime.getDate();
        h2.innerText = `${this.term}: ${this.definition}`
        wordPanel.append(h2)
    }

}


document.addEventListener('DOMContentLoaded', () => {

    const wordsUrl = "http:/localhost:3000/api/v1/word_categories/1"
    // const wordPanel = document.querySelector("div.words")
    
    function fetchWord(){    
        fetch(wordsUrl)
        .then(res => res.json())
        // .then
        .then(word_cat => { // Filter here ones that have been studied
            renderWord(word_cat.words[0])
        })
    }

    function renderWord(word){
        // console.log(word)
        let e = new Word(word.term, word.definition)
        e.render()
    }
    
    /* Function Calls */
    fetchWord()
})