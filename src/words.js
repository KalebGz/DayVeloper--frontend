class Word{
    constructor(term, definition){
        this.term = term
        this.definition = definition
    }

    render(){
        
        const wordPanel = qs("div.words")
        if(qs('h2#renderedWord')){
            qs('h2#renderedWord').remove()
        }
        
        let h2= document.createElement('h2')
        h2.id= 'renderedWord'
        h2.innerText = `${this.term}: ${this.definition}`
        wordPanel.append(h2)
    }



}


document.addEventListener('DOMContentLoaded', () => {


    /**
Pseudocode for implementing different words
1. create buttons for all the word categories
2. once a button is clicked, set wordCatUrl to a string based on the id of the word category clicked
     */

    let wordIdx = 0
    let numWords = 0
    let wordCatUrl = 'http:/localhost:3000/api/v1/word_categories/1'
    const wordCatsUrl = 'http:/localhost:3000/api/v1/word_categories'
    const wordsUrl = "http:/localhost:3000/api/v1/words"
    const wordPanel = qs("div.words")

    function fetchWordCategories(){
        fetch(wordCatsUrl)
        .then(res => res.json())
        .then(categories => {
            numWords = categories.length
            // debugger
            categories.forEach(cat => renderCatBtn(cat))
            })
    }

    function renderCatBtn(cat){
        const categoryBtn = ce('BUTTON')
        categoryBtn.innerText= cat.name

        categoryBtn.addEventListener('click', () => {
            wordCatUrl = `http:/localhost:3000/api/v1/word_categories/${cat.id}` 
            fetchWord()
        })

        wordPanel.append(categoryBtn)

    }
    
    function fetchWord(){    
        fetch(wordCatUrl)
        .then(res => res.json())
        .then(word_cat => { 
            console.log(wordIdx)
            renderWord(word_cat.words[wordIdx])
        })
    }

    function renderWord(word){
        console.log(word)
        let e = new Word(word.term, word.definition)
        e.render()
    }

    function newWordForm(){
        const form = ce('FORM')

        const input1= ce('INPUT')
        input1.type= 'Text'
        input1.name= 'Term'
        input1.placeholder= 'Term'
        form.append(input1)

        const input2= ce('INPUT')
        input2.type= 'text'
        input2.name= 'definition'
        input2.placeholder= 'definition'
        form.append(input2)


        const input3= ce('INPUT')
        input3.type= 'Submit'
        input3.value= 'Create New Word'
        form.append(input3)

        wordPanel.append(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let configObj = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    term: form[0].value, 
                    definition: form[1].value,
                    word_category_id: 1,
                    user_id: 1
                })
              }

              fetch(wordsUrl, configObj)
              .then(res => res.json())
              .then(numWords+=1)

        })
    }
    
    function nextWordButton(){

        nextBtn= ce('button')
        nextBtn.innerText= "Next Word"
        const wordPanel = qs("div.words")
        wordPanel.append(nextBtn)

        nextBtn.addEventListener('click', () => {
            if( wordIdx+1 < numWords){
                wordIdx+=1;
                fetchWord()
            }
        })
    }

    function prevWordButton(){

        prevBtn= ce('button')
        prevBtn.innerText= "Previous Word"
        const wordPanel = qs("div.words")
        wordPanel.append(prevBtn)

        prevBtn.addEventListener('click', () => {
            if (wordIdx > 0){
                wordIdx-=1;
                fetchWord()
            }
        })
    }
    
    /* Function Calls */

    fetchWordCategories()
    newWordForm()
    prevWordButton()
    nextWordButton()
    
})

/* Macro functions */
function ce(ele){
    return document.createElement(ele)
}

function qs(ele){
    return document.querySelector(ele)
}