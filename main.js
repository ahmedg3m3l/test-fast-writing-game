const words = ["son",
    "done",
    "css",
    "hello",
    "arcane",
    "create",
    "great",
    "food",
    "fish",
    "school",
    "score",
    "football",
    "amazing",
    "super",
    "dangerous",
    "angry",
    "happy",
    "dad",
    "sad",
    "beautiful",
];
const lvls = {
    "Easy":5,
    "Normally":3,
    "Hard":2
}

let defaultLevelName = "Normally"; // Change level from here
let defaultLevelSeconds = lvls[defaultLevelName]

//Catch selectors
let startButton = document.querySelector(".start")
let levelNameSpan = document.querySelector(".message .lvl")
let secondsSpan = document.querySelector(".message .seconds")
let theWord = document.querySelector(".the-word")
let upComingWords = document.querySelector(".up-coming-words")
let input = document.querySelector(".input")
let timeLeftSpan = document.querySelector(".time span")
let scoreGot = document.querySelector(".score .got")
let scoreTotal = document.querySelector(".score .total")
let finishMessage = document.querySelector(".finish")

//Setting level name + seconds + score
levelNameSpan.innerHTML = defaultLevelName
secondsSpan.innerHTML = lvls[defaultLevelName]
scoreTotal.innerHTML = words.length

//Disabled paste event
input.onpaste = function(){
    return false
}

//Start game
startButton.onclick = function(){
this.remove()
input.focus()
//Generate word function
genWords()
}

function genWords(){
    //Get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)]
    //Get word index
    let wordIndex = words.indexOf(randomWord)
    // Remove word from array
    words.splice(wordIndex, 1)
    //Show the word
    theWord.innerHTML = randomWord
    // Empty upcoming words
    upComingWords.innerHTML = ""
    //Set level time in time span
    timeLeftSpan.innerHTML = lvls[defaultLevelName]

    //Generate words
    for(let i = 0 ; i < words.length ; i++){
        //Create div element
        let div = document.createElement("div")
        let txt = document.createTextNode(words[i])
        div.appendChild(txt)
        upComingWords.appendChild(div)
    }
    //Call start play function
    startPlay()
}

function startPlay(){
    let start = setInterval(() => {
    timeLeftSpan.innerHTML--
    if(timeLeftSpan.innerHTML == 0){
        clearInterval(start)
        //Compare words
        if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase() ){
           //Empty input field
           input.value = "";
           scoreGot.innerHTML++
           if(words.length > 0){
            genWords()
           }else{
            let span = document.createElement("span")
            span.className = "good"
            let spanTxt = document.createTextNode("congratulations")
            span.appendChild(spanTxt)
            finishMessage.appendChild(span)
            upComingWords.remove()
           }
        }else{
            let span = document.createElement("span")
            span.className = "bad"
            let spanTxt = document.createTextNode("Game over")
            span.appendChild(spanTxt)
            finishMessage.appendChild(span)
        }
    }

    } , 1000)
}