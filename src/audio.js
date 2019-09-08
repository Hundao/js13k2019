// create the audio context
var ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,
  
  // set the tempo
  tempo = 90,
  // initialize some vars
  sequence1,
  sequence2,

  // create an array of "note strings" that can be passed to a sequence
  lead = [
    'Ab4 s',
    'Db5 s',
    'E5 s',

    'Ab4 s',
    'Db5 s',
    'E5 s',

    'Ab4 s',
    'Db5 s',
    'E5 s',

    'Ab4 s',
    'Db5 s',
    'E5 s',

    'Ab4 s',
    'Db5 s',
    'E5 s',

    'Ab4 s',
    'Db5 s',
    'E5 s',

    'Ab4 s',
    'Db5 s',
    'E5 s',

    'Ab4 s',
    'Db5 s',
    'E5 s',

    'A4 s',
    'Db5 s',
    'E5 s',

    'A4 s',
    'Db5 s',
    'E5 s',

    'A4 s',
    'D5 s',
    'Gb5 s',

    'A4 s',
    'D5 s',
    'Gb5 s',

    'Ab4 s',
    'C5 s',
    'Gb5 s',

    'Ab4 s',
    'Db5 s',
    'Gb5 s',

    'Ab4 s',
    'Db5 s',
    'Eb5 s',

    'Gb4 s',
    'B5 s',
    'Eb5 s',
  ],

  harmony = [
      'Db3 h',
      '- q',

      'B2 h',
      '- q',

      'A2 q',
      '- e',
      'Gb2 q',
      '- e',

      'Ab2 q',
      '- e',
      'Ab2 q',
      '- e',

  ],

  space = [
   'B3 s',
   'Cb5 e',
 ],

 hurt = [
   'Ab2 s',
   'Gb2 s',
 ],

 eat = [
    // 'B5 e',
    'C4 s',
    'C5 e',
 ],

 dead  = [
   'Ab2 s',
    'Gb2 s',
    'C2 e',
 ]
 ;

  // create 3 new sequences (one for lead, one for harmony, one for bass)
sequence1 = new TinyMusic.Sequence( ac, tempo, lead );
sequence2 = new TinyMusic.Sequence( ac, tempo, harmony );

var sequences = [];
// //cloase the loop play
sequence1.loop = false;

// set staccato and smoothing values for maximum coolness
sequence1.staccato = 0.55;
sequence2.staccato = 0.55;


// adjust the levels so the bass and harmony aren't too loud
sequence1.gain.gain.value = 0.1;
sequence2.gain.gain.value = 0.1;


// apply EQ settings
sequence1.mid.frequency.value = 1000;
sequence1.mid.gain.value = 3;
sequence2.mid.frequency.value = 1000;
