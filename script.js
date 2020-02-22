// Next questions:
// How can I get a progress bar with the goal for each level?
// Can I modify the css for #mybar?
// How can I get the start button to center?
// Can I put it a text form at the bottom that allows the user
// to input level 'cheat codes' to automatically advance to
// a higher level? For instance, the cheat code to get to
// Level 11 is "panda", or something like that

// To do:
// Fix threshold incrementation

// Starting at Level 1
let level = 1

// Threshold to get to next level
let threshold = 3

// Mute
let effectsMuted = false

// Funky new ES6 syntax
toggleMute = () => {
    effectsMuted =!effectsMuted
    console.log(effectsMuted)
}

// The order in which I want to introduce new notes
// Figure out enharmonics later
const SCAFFOLD = ['C','D','E','F','G','A','B','Bb','Eb','Ab','Db','Gb']

/* these arrays allow the user to play the piano using their computer keyboard */
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

const LETTERS = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

/* js syntax is new to me. does => run a function? yes */
keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
//    console.log(key)

})

// Cycles to the next flash card letter
function showLetter() {
    var letter = SCAFFOLD[Math.floor(Math.random() * (level+1))];
    document.getElementById("letter").innerHTML = letter;
}

/* allow the user to play the piano using their computer keyboard */
document.addEventListener('keydown', e => {
    if (e.repeat) return
    /* get the key that's pressed */
    const key = e.key
    /* get the index from array */
    const whiteKeyIndex = WHITE_KEYS.indexOf(key)
    const blackKeyIndex = BLACK_KEYS.indexOf(key)

    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

// let guesses = 0

let score = 0
let total = 0

function playNote(key) {
    total += 1
    /* gets the note to be played */
    const noteAudio = document.getElementById(key.dataset.note)

    // This is successfully getting the name of the piano key the user presses
    var noteId = noteAudio.id;

    // This is successfully getting the letter displayed on the flash card
    var cardLetter = document.getElementById("letter").innerHTML

    // Validate user input as correct or not
    if (noteId == cardLetter) {
        score += 1
        // Attempting to increment the progress bar
        w = (score/threshold)*100
        w = String(w) + "%"
        document.getElementById("myBar").style.width = w

        document.getElementById("score").innerHTML = score
        // allows the key to be stylized green if correct
        key.classList.add('correct')
        //changes the key back to starting color when audio file is finished playing
        noteAudio.addEventListener('ended', () => {
        key.classList.remove('correct')
        showLetter()
    })
    // If user input is wrong
    } else {
        key.classList.add('wrong')
        noteAudio.addEventListener('ended', () => {
        key.classList.remove('wrong')
    })
    }
    document.getElementById("score").innerHTML = "Your Score: " + score + "/" + total
    if (total == threshold) {
        if (score == threshold){
            level += 1;
            document.getElementById("result").innerHTML = "Good Job! Get ready for Level " + level

            if (effectsMuted === false) {
                document.getElementById('applause').play();
            }
            setTimeout(function(){
                document.getElementById("level").innerHTML = "Level " + level
                document.getElementById("result").innerHTML = ""
                document.getElementById("score").innerHTML = "Your Score: 0/0"
            }, 2000)
            threshold += 2

        } else {
            document.getElementById("result").innerHTML = "Try again to get " + threshold + " in a row!"

            if (effectsMuted === false) {
                document.getElementById('wahwah').play();
            }
            setTimeout(function(){
                document.getElementById("result").innerHTML = ""
                document.getElementById("score").innerHTML = "Your Score: 0/0"
            }, 2000)
        }
        score = 0;
        total = 0;
        document.getElementById("myBar").style.width = 0
    }
    /* lets the piano play the sound over and over rapidly, instead of waiting until the audio file has finished playing */
    noteAudio.currentTime = 0
    /* plays the sound */
    noteAudio.play()
}
