  //
  //all code used below for stopwatch java is from https://codepen.io/cathydutton/pen/xxpOOw
  //

window.onload = function () {
  
    var seconds = 00; 
    var tens = 00; 
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval ;
  
    buttonStart.onclick = function() {
      
      clearInterval(Interval);
       Interval = setInterval(startTimer, 10);
    }
    
      buttonStop.onclick = function() {
         clearInterval(Interval);
    }
    
  
    buttonReset.onclick = function() {
       clearInterval(Interval);
      tens = "00";
        seconds = "00";
      appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    }
    
     
    
    function startTimer () {
      tens++; 
      
      if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens;
        
      } 
      
      if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }
      
      if (seconds > 9){
        appendSeconds.innerHTML = seconds;
      }
    
    }
    
  
  }

  //
  //all code used above for stopwatch java is from https://codepen.io/cathydutton/pen/xxpOOw
  //





  
//
// All code used below for pomodoro Java is from https://codepen.io/Divlo/pen/vYEbPoB 
//


  /* Variables DOM */
const buttonPlay = document.getElementById('buttonPlay');
const playIcon = document.getElementById('playIcon');
const buttonReset = document.getElementById('buttonReset');
const timeLeftDOM = document.getElementById('timeLeft');
const labelSessionBreak = document.getElementById('labelSessionBreak');
const sessionLengthDOM = document.getElementById('sessionLength');
const breakLengthDOM = document.getElementById('breakLength');
const sessionDecrement = document.getElementById('sessionDecrement');
const sessionIncrement = document.getElementById('sessionIncrement');
const breakDecrement = document.getElementById('breakDecrement');
const breakIncrement = document.getElementById('breakIncrement');

/* Variables */
const arrayTime = timeLeftDOM.innerText.split(":");
let timeLeft = parseInt(arrayTime[0] * 60) + parseInt(arrayTime[1]); // timeLeft en secondes
let playIsClicked = true;
let isSession = false;
let breakLength = 5*60;
let timeLength = 25*60;

function convertSeconds(seconds) {
    return {
        minutes: Math.floor(seconds / 60), // nombre de minutes
        seconds: seconds % 60 // nombre de secondes
    }
}

let interval;

/* Handle play/pause Button */
buttonPlay.addEventListener('click', () => {

    // Chrono start (play)
    if(playIsClicked) {

        if(interval) {
            clearInterval(interval)
        }
        interval = setInterval(handleTime, 1000);

        // Affichage icône pause
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');

        function handleTime() {
            // Chrono finit
            if(timeLeft <= 0) {

                // Session
                if(isSession) {
                    labelSessionBreak.innerText = "Session";
                    timeLeft = timeLength;
                } 
                
                // Break
                else {
                    labelSessionBreak.innerText = "Break";
                    timeLeft = breakLength;
                    document.getElementById('beep').currentTime = 0;
                    document.getElementById('beep').play();
                }
                isSession = !isSession;
            } 
            
            // Arrêt du chrono
            else if(playIsClicked) {
                clearInterval(interval);
            }

            // Chrono en cours
            else {
                timeLeft--;
                const minutesAndSeconds = convertSeconds(timeLeft);
                timeLeftDOM.innerText = `${('0'+minutesAndSeconds.minutes).slice(-2)}:${('0'+minutesAndSeconds.seconds).slice(-2)}`;
            }
        }
    } 
    
    // Chrono mis en pause
    else {
        // Affichage icône play
        playIcon.classList.add('fa-play');
        playIcon.classList.remove('fa-pause');
    }
    playIsClicked = !playIsClicked;
}); 

/* Handle reset button */
buttonReset.addEventListener('click', () => {
    breakLength = 5*60;
    timeLength = 25*60;
    timeLeft = timeLength;
    breakLengthDOM.innerText = "5";
    sessionLengthDOM.innerText = "25";
    timeLeftDOM.innerText = "25:00";
    if(!playIsClicked) {
        buttonPlay.click();
    }
});

/* Handle length button */
function handleLengthButton(lengthValue, htmlElement, isAddition, isBreakLength) {
    let result = 1;
    if(isAddition) {
        result = ++lengthValue;
        htmlElement.innerText = result;
    } else {
        if(lengthValue != 1) {
            result = --lengthValue;
            htmlElement.innerText = result;
        }
    }
    if(!playIsClicked) {
        buttonPlay.click();
    }
    let resultSeconds = result * 60;
    if(!isBreakLength) {
        timeLength = resultSeconds;

        if(labelSessionBreak.innerText === 'SESSION') {
            timeLeftDOM.innerText = ('0'+result).slice(-2) + ":00";
            timeLeft = resultSeconds;
        }
    } else {
        breakLength = resultSeconds;

        if(labelSessionBreak.innerText === 'BREAK') {
            timeLeftDOM.innerText = ('0'+result).slice(-2) + ":00";
            timeLeft = resultSeconds;
        }
    }
    return resultSeconds;
}
sessionDecrement.addEventListener('click', () => {
    handleLengthButton(parseInt(sessionLengthDOM.innerText), sessionLengthDOM, false, false);
});
sessionIncrement.addEventListener('click', () => {
    handleLengthButton(parseInt(sessionLengthDOM.innerText), sessionLengthDOM, true, false);
});
breakDecrement.addEventListener('click', () => {
    breakLength = handleLengthButton(parseInt(breakLengthDOM.innerText), breakLengthDOM, false, true);
});
breakIncrement.addEventListener('click', () => {
    breakLength = handleLengthButton(parseInt(breakLengthDOM.innerText), breakLengthDOM, true, true);
});

//
// All code used above for pomodoro Java is from https://codepen.io/Divlo/pen/vYEbPoB 
//



  