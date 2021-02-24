$(function(){
    let timerUpdate;
    let time = 0;
    let timerUpdating = false;
    let timerRunning = false;
    let timer;
    
    function startTimer(){
        startUpdating();
        timerRunning = true;
        timer = setInterval(function(){
            time++;
        }, 10)
    }

    function stopTimer(){
        clearInterval(timer)
        timerRunning = false;
    }

    function startUpdating (){
        timerUpdate = setInterval(function(){
            // $(`#time`).text(time/100)
            let seconds = time / 100
            let minutes = Math.floor(seconds / 60)

            if((seconds - minutes * 60) > 10){
                $(`#time`).text(`${minutes}:${((seconds) - minutes * 60).toFixed(2)}`)
            }else{
                $(`#time`).text(`${minutes}:0${((seconds) - minutes * 60).toFixed(2)}`)
            }
            
        }, 10)
    timerUpdating = true;
    }
    function stopUpdating(){
        timerUpdating = false;
        clearInterval(timerUpdate)
    }

    // function toggleLap(){
    //     if(timerUpdating){
    //         stopUpdating()
    //     }else{
    //         startUpdating()
    //     }
    // }

    

    function reset(){
        startUpdating()
        time = 0;
        setTimeout(stopUpdating, 10)
        $('.lap-times').text(" ")
    }

    function toggleLap(){
        let lapTime = $('#time').text();
        console.log(lapTime)
        let li = document.createElement("li");
        li.textContent = lapTime;
        $('.lap-times').append(li)

    }

    function lapButton(){
        if(timerRunning){
            toggleLap();
        }else{
            reset();
        }
    }

    function startButton(){
        if(timerRunning){
            console.log(`off`)
            stopTimer()
            stopUpdating()
            $('#start').text("START")
            $('#lap').text("RESET")
        }else{
            console.log(`on`)
            startTimer()
            $('#start').text("STOP")
            $('#lap').text("LAP")
        }
    }

    $('#start').on("click", startButton)
    $('#lap').on("click", lapButton)
    $('#fiveSec').on("click", setUpfiveSec)
    $('#reactionSpeed').on("click", reactionSpeed)
    $('#cps').on("click", cps)

    //Start the game

    function startGame(){
        reset();
        stopTimer();
        $('#start').remove();
        $('#lap').remove();
        $('.gameContainer').remove();
    }

    //Five Seconds Game

    function setUpfiveSec(){
        startGame();
        let button = document.createElement("button")
        button.id = "gameButton";
        button.textContent = "START"
        $('.buttonContainer').append(button)

        $('button').on("click", startFiveSec)
    }
    function startFiveSec(){
        startTimer()
        $('#gameButton').text("STOP").on("click", fiveSecResults).off("click", startFiveSec);
    }
    function fiveSecResults(){
        stopTimer()
        $('#gameButton').text("START")
    }


    //Reaction Speed Game

    function reactionSpeed(){
        startGame()
    }


    //CPS Game

    function cps(){
        startGame()
    }

})