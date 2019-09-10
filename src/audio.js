// create the audio context
var ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,

    // set the tempo
    tempo = 240,
    // initialize some vars
    mainAudio,
    subAudio,
    shootMus,
    jumpMus,
    

    // create an array of "note strings" that can be passed to a sequence
    lead = [
        '- h', 'A4 h', 'Bb4 h', 'D5 h',
        'C5 h', 'Bb4 q', 'A4 q', 'G4 h', 'C4 h',
        'F4 h', 'G4 h', 'A4 h', 'Bb4 q', 'A4 q',
        'G4 8',
        '- h', 'A3 h', 'Bb3 h', 'D4 h',
        'C4 w', 'G4 q', 'A4 q', 'Bb4 q', 'G4 q',
        'A4 h', 'A3 h', 'Bb3 h', 'Bb4 h',
        'G4 h', 'G4 q', 'A4 q', 'Bb4 h', 'G4 h',
        'A4 w', 'C5 w', 
        'Bb4 6', 'A4 q',
        'D5 w', 'C5 w',
        'G4 h', 'G4 q', 'A4 q', 'Bb4 w', 'G4 w',
        'A4 w', 'C5 w',
        'Bb4 6', 'A4 h',
        'D5 q', 'E4 q', 'C5 q', 'C3 q',
        'C5 h', 'G4 q', 'A4 q', 'Bb4 h', 'B4 h',
        'C5 h', 'G4 q', 'A4 q', 'Bb4 h', 'B4 h',
        'C5 h', 'G4 q', 'A4 q', 'Bb4 h', 'B4 h',
        'C5 h', 'G4 q', 'A4 q', 'Bb4 h', 'B4 h', //
        'C5 h', 'A4 q', 'Bb4 q', 'C5 h', 'Db5 h',
        'D5 h', 'Bb4 q', 'C5 q', 'D5 h', 'E5 h',
        'F5 h', 'D5 q', 'E5 q', 'F5 h', 'G5 h',
        'A5 h', 'A5 h', 'Bb5 h', 'D6 h',

    ],

    horn = [
        'C3 8',
        'C3 8',
        'C3 8',
        'C3 8',
        'F3 w', 'D3 w', 
        'E3 w', 'C3 w',
        'F3 w', 'D3 w',
        'E3 6', 'C3 h',
        'F3 w', 'C4 w',
        'C4 6', 'F3 q',
        'B2 w', 'C4 w',
        'C4 8',
        'F3 w', 'A3 w',
        'G3 6', 'F3 h',
        'F3 w', 'F3 w',
        'G3 6', 'D4 h',
        'G3 6', 'D4 h',
        'G3 6', 'D4 h',
        'G3 h', '- 6' , //
        '- h', 'A3 q', 'Bb3 q', 'C4 h', 'Cb4 h',
        'D4 h', 'Bb3 q', 'C4 q', 'D4 h', 'E4 h',
        'F4 h', 'D4 q', 'E4 q', 'F4 h', 'G4 h',
        'C3 h', 'C3 h', 'C3 h', '3 h3'
    ],

    fen = 0.125,
    shootF = [
        `G3 ${fen}`, `A3 ${fen}`, `B3 ${fen}`, `C4 ${fen}`, `D4 ${fen}`, `E4 ${fen}`
    ],

    jumpF = [
        'B5 s',
        'C5 s'
    ]

    // create 3 new sequences (one for lead, one for harmony, one for bass)
    mainAudio = new TinyMusic.Sequence(ac, tempo, lead)
    subAudio = new TinyMusic.Sequence(ac, tempo, horn)
    jumpAudio = new TinyMusic.Sequence(ac, tempo, jumpF)  
    shootAudio = new TinyMusic.Sequence(ac, tempo, shootF)

var sequences = [];
// //cloase the loop play
mainAudio.loop = true;
subAudio.loop = true;
jumpAudio.loop = false;
shootAudio.loop = false;
// sequence1.smoothing = 0.1

// set staccato and smoothing values for maximum coolness
mainAudio.staccato = 0.55;
subAudio.staccato = 0.55;
jumpAudio.staccato = 0.55;
shootAudio.staccato = 0.55;

// adjust the levels so the bass and harmony aren't too loud
mainAudio.gain.gain.value = 0.1;
subAudio.gain.gain.value = 0.05;
jumpAudio.gain.gain.value = 0.03;
shootAudio.gain.gain.value = 0.03;

// apply EQ settings
mainAudio.mid.frequency.value = 1000;
mainAudio.mid.gain.value = 3;
jumpAudio.mid.gain.value = 3;

let playMusic = ()=>{
    mainAudio.play()
    sequence2.play()
}

let playJumpAudio = ()=>{
    jumpAudio.stop()
    jumpAudio.play()
}

let playShootMusic = () =>{
    shootAudio.stop()
    shootAudio.play()
}