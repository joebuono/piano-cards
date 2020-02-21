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

function showLetter() {
    var letter = LETTERS[Math.floor(Math.random() * 12)];
    document.getElementById("demo").innerHTML = letter;
    console.log(key)
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

function playNote(key) {
    /* gets the note to be played */
    const noteAudio = document.getElementById(key.dataset.note)
    /* lets the piano play the sound over and over rapidly, instead of waiting until the audio file has finished playing */
    noteAudio.currentTime = 0
    /* plays the sound */
    noteAudio.play()
    /* allows the key to be stylized a different color while pressed */
    key.classList.add('active')
    /* changes the key back to starting color when audio file is finished playing */
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active')
    })
}

