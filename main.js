//
// Johan Hallenberg
// @ http://www.hallenberg.co
//

var sound = document.getElementById('sound');
var seekBar = document.getElementById('seekbar');

var nme = sound.currentSrc;

// If local storage exists, set time. Calculate duration.
window.onload = function () {
  if (localStorage.getItem(nme) === null) {}else{setCurTime(true)};

  $('#duration').html(calc(sound.duration));
};

// Set value of sound
$('#seekbar').bind('change', function() {
  var calctme = sound.duration * (seekBar.value / 100);
  sound.currentTime = calctme;
});

// Update current time while dragging the scrubber
$('#seekbar').on('input change', function () {
  var val = $(this).val();

  var proc = '0.' + val;
  var procs = '0.0' + val;

  if (val > 99) {
    var tme = sound.duration;
  } else if (val >= 10) {
    var tme = proc * sound.duration;
  } else {
    var tme = procs * sound.duration;
  }

  $('#currentTime').html(calc(tme));
});

//Update seekbar & current time
$('#sound').on('timeupdate', function() {
  $('#currentTime').html(calc(sound.currentTime));

  var calctme = (100 / sound.duration) * sound.currentTime;
  seekBar.value = calctme;
});

// Play & Pause toggle
$('#playToggle').click(function() {
  if (sound.paused == true) {
    if (localStorage.getItem(nme) === null) {}else{setCurTime()};
    sound.play();
  } else {
    sound.pause();
    setLocalStorage();
  }
});

// Pause when dragging the scrubber
$('#seekbar').on("mousedown touchstart", function(e){
  sound.pause();
});

// Play when dragged and reload the scrubber
$('#seekbar').on("mouseup touchend", function(e){
  sound.play();
});

// If you leave without pausing. Set a local storage.
window.onbeforeunload = function() {
  if (sound.paused == false) {
    setLocalStorage();
  }
};

// When sound ended. Set local storage to minimum.
sound.onended = function() {
  sound.pause();

  sound.currentTime=0;
  setLocalStorage();
};

// Insert localstorage based on the name of audio
function setLocalStorage() {
  if (typeof(Storage) !== "undefined") {
          if (localStorage.getItem(nme) === null) {
            if (sound.currentTime >= 3) {
            localStorage.setItem(nme, sound.currentTime);
          }} else {
            localStorage.removeItem(nme);
            localStorage.setItem(nme, sound.currentTime);
          }

  } else {
    console.log('This browser doesn\'t support local storage.')
  }
};

// If stored time. This function sets it.
function setCurTime(val) {
  if (val == true) {
    sound.currentTime=localStorage.getItem(nme);

    var calctme = (100 / sound.duration) * sound.currentTime;
    seekBar.value = calctme;

    $('#currnTime').html(calc(sound.currentTime));
  } else {
    sound.currentTime=localStorage.getItem(nme);
  }
};

// Calculate stuff, basically put it in right context
function calc (value) {
  var totdur = value;
  var min = Math.floor(totdur / 60);
  var sec = totdur - min * 60;
  var dur = min + ':' + Math.round(sec);

  return dur;
};