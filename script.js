let homeScore = 0;
let awayScore = 0;
let inning = 1;
let gameover = false;

$(document).ready(function(){

    //audio.volume not recognized
// let volume = document.querySelector("#volume-control");
// volume.addEventListener("change", function(e){
//     audio.volume = e.currentTarget.value / 100;
// })

    let takeMeOut = document.createElement("audio");
    takeMeOut.setAttribute("src", "./assets/sounds/TakeMeOutToTheBallgame-DocWatson.mp3");

    //play take me out on button press
    $(".play-music").on("click", function(){
        takeMeOut.play();
    })

    //create function for clearing all balls
    clearBalls = () => {
        $("#ball-one").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-two").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-three").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-four").removeClass('counter-dot').addClass('counter-dot-empty');
    }

    //create a function for clearing all strikes
    clearStrikes = () => {
        $("#strike-one").addClass("counter-dot-empty").removeClass('counter-dot');
        $("#strike-two").addClass("counter-dot-empty").removeClass('counter-dot');
        $("#strike-three").addClass("counter-dot-empty").removeClass('counter-dot');
    }

    //clear balls and strikes for new at bat
    resetCount = () => {
        clearBalls();
        clearStrikes();
    }

    //clear the bases
    clearBases = () => {
        if($("#first-base").hasClass("base-on")){
            $("#first-base").addClass("base").removeClass("base-on");
            }
            if($("#second-base").hasClass("base-on")){
            $("#second-base").addClass("base").removeClass("base-on");
            }
            if($("#third-base").hasClass("base-on")){
            $("#third-base").addClass("base").removeClass("base-on");
            }
            if($("#home-plate").hasClass("base-on")){
            $("#home-plate").addClass("base").removeClass("base-on");
    }
}

    //set inning
    setInning = () => {
        $("#inning-number").html(inning);
    }

    setInning();


    //play 7th inning stretch
    seventhInningStrech = () => {
        if(inning == 7){
            alert("seventh Inning strech!");
            if($('input[type="checkbox"]').is(":checked")){
                console.log("Music is on!");
                takeMeOut.play()
            }else{
                console.log("Music is off")
            }
        }
    }

    $('.hit').click(function() {
        if($('input[type="checkbox"').is(":checked")){
        const audio = new Audio("./assets/sounds/woodbat.mp3");
        audio.play();}
    });

    gameOverTopOfNinth = () => {
        if(inning == 9 && homeScore > awayScore){
            alert("Home Team Wins!");
            $('button').prop('disabled', true);
            gameover= true;
        }
    }

    gameOverBottomOfNinth = () => {
        if(inning == 9 && homeScore < awayScore){
            alert("away team wins!");
            $('button').prop('disabled', true);
            gameover = true;
        }else if(inning == 9 && homeScore > awayScore){
            alert("home Team wins! Walk off?");
            $('button').prop('disabled', true);
            gameover = true
        }
    }
    //add function for extra innings on tie!
    extraInnings = () => {
        if(inning > 9 && homeScore > awayScore){
            alert("Home team wins in extra innings!");
            $('button').prop('disabled', true);
        }else if(inning > 9 && homeScore < awayScore){
            alert("Away team wins in extra innings");
            $("button").prop("disabled", true);
        }
    }

    //walk off code, if home team scores run to take lead in bottom of ninth or later, home team wins

    walkoff = () => {
        if(inning >=9 && $("#triangle-bottom-empty").hasClass("full") && homeScore > awayScore){
            alert("Walk off win by the home team!");
            $("button").prop("disabled", true); 
        }
    }

    //set home score
    setHomeScore = () => {
        $("#home-score").html(homeScore);
    }
    setHomeScore();

    //set away score
    setAwayScore = () => {
        $("#away-score").html(awayScore);
    }

    setAwayScore();

    //set base runners and remove base runners
    addRunnerFirst = () => {
        $("#first-base").addClass("base-on").removeClass("base");
        resetCount();
    }

    addRunnerSecond = () => {
        $("#second-base").addClass("base-on").removeClass("base");
        resetCount();
    }

    addRunnerThird = () => {
        $("#third-base").addClass("base-on").removeClass("base");
        resetCount();
    }

    addRunnerHome = () => {
        $("#home-plate").addClass("base-on").removeClass("base");
        resetCount();
    }

    removeRunnerFirst = () => {
        $("#first-base").addClass("base").removeClass("base-on");
        resetCount();
    }

    removeRunnerSecond = () => {
        $("#second-base").addClass("base").removeClass("base-on");
        resetCount();
    }

    removeRunnerThird = () => {
        $("#third-base").addClass("base").removeClass("base-on");
        resetCount();

    }
    removeRunnerHome = () => {
        $("#home-plate").addClass("base").removeClass("base-on");
        resetCount();
    }

    //add run for home or away team
    addRun = () => {
        if($("#home-plate").hasClass("base-on") && $("#triangle-top-empty").hasClass("full")){
            console.log("run for away team");
            awayScore += 1
            $("#away-score").html(awayScore);
            setTimeout(function(){
                $("#home-plate").removeClass("base-on").addClass("base")
            }, 1000)
        } else if($("#home-plate").hasClass("base-on") && $("#triangle-bottom-empty").hasClass("full")){
            console.log("run for home team");
            homeScore += 1
            walkoff();
            $("#home-score").html(homeScore);
            setTimeout(function(){
                $("#home-plate").removeClass("base-on").addClass("base")
            }, 1000)
    }}

    //change inning
    inningChange = () => {
        $("#out-one").removeClass('counter-dot').addClass("counter-dot-empty")
        $("#out-two").removeClass('counter-dot').addClass("counter-dot-empty")
        $("#out-three").removeClass('counter-dot').addClass("counter-dot-empty");
        if($("#triangle-top-empty").hasClass("full")){
            //if seventh inning, sing take me out to the ball game!
            seventhInningStrech();
            //if ninth inning and home team is ahead, game over!
            gameOverTopOfNinth();
            console.log(gameover);
            if(gameover == false){
                $("#triangle-top-empty").addClass("triangle-top-empty").removeClass("full");
                $("#triangle-bottom-empty").addClass("full").removeClass("triangle-bottom-empty");
                //clear all bases
                clearBases();
            }else{
                return;
            }
        }else if($("#triangle-top-empty").hasClass("triangle-top-empty")){
            gameOverBottomOfNinth();
            console.log(gameover)
            if(gameover == false){
                extraInnings();
                $("#triangle-top-empty").addClass("full").removeClass("triangle-top-empty")
                $("#triangle-bottom-empty").addClass("triangle-bottom-empty").removeClass("full");
                inning += 1
                $("#inning-number").html(inning);
                setInning();
                clearBases();
            }else{
                return;
            }
        }
    }
    //track pitches that are balls, 4 balls equal a walk, runner advances to first, all other forced runners advance.
    $("#add-ball").click(function(){
        if($('#ball-one').hasClass('counter-dot-empty')) {
            console.log("Ball 1")
            $("#ball-one").removeClass('counter-dot-empty').addClass("counter-dot")
        }else if($('#ball-two').hasClass('counter-dot-empty')){
            console.log("Ball 2")
            $("#ball-two").removeClass('counter-dot-empty').addClass("counter-dot");
        }else if($('#ball-three').hasClass('counter-dot-empty')){
            console.log("Ball 3")
            $("#ball-three").removeClass('counter-dot-empty').addClass("counter-dot");
        }else if($('#ball-four').hasClass('counter-dot-empty')){
            console.log("Ball 4")
            $("#ball-four").removeClass('counter-dot-empty').addClass("counter-dot");
            //check to see what base is open to advance all runners
            //clear all strikes
            setTimeout(function(){
                if($("#first-base").hasClass("base")){
                addRunnerFirst();
                }else if($("#second-base").hasClass("base")){
                addRunnerSecond();
                }else if($("#third-base").hasClass("base")){
                addRunnerThird();
                }else if($("#home-plate").hasClass("base")){
                $("#home-plate").addClass("base-on").removeClass("base");
                //add run to correct teams score (home or away) check by inning marker arrow
                //let home plate be .base-on for a second or two, then switch back to .base
                }
            }, 1000)
            setTimeout(function(){
            clearBalls();
            clearStrikes();
            addRun();
            }, 1000)
        }
    })

    $("#add-strike").click(function(){
        if($('#strike-one').hasClass('counter-dot-empty')) {
            console.log("Strike 1")
            $("#strike-one").removeClass('counter-dot-empty').addClass("counter-dot")
        }else if($('#strike-two').hasClass('counter-dot-empty')){
            console.log("Strike 2")
            $("#strike-two").removeClass('counter-dot-empty').addClass("counter-dot");
        }else if($('#strike-three').hasClass('counter-dot-empty')){
            console.log("Strike 3")
            $("#strike-three").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls();
                if($('#out-one').hasClass('counter-dot-empty')) {
                    console.log("Out 1")
                    $("#out-one").removeClass('counter-dot-empty').addClass("counter-dot")
                }else if($('#out-two').hasClass('counter-dot-empty')){
                    console.log("Out 2")
                    $("#out-two").removeClass('counter-dot-empty').addClass("counter-dot");
                }else if($('#out-three').hasClass('counter-dot-empty')){
                    console.log("Out 3")
                    $("#out-three").removeClass('counter-dot-empty').addClass("counter-dot");
                    inningChange();
                }
            },1000)
        }
    })

    $("#add-out").click(function(){
        if($('#out-one').hasClass('counter-dot-empty')) {
            console.log("Out 1")
            $("#out-one").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls(); 
            }, 1000)
            
        }else if($('#out-two').hasClass('counter-dot-empty')){
            console.log("Out 2")
            $("#out-two").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls(); 
            }, 1000)
        }else if($('#out-three').hasClass('counter-dot-empty')){
            console.log("Out 3")
            $("#out-three").removeClass('counter-dot-empty').addClass("counter-dot");
            setTimeout(function(){
                clearStrikes();
                clearBalls(); 
            }, 1000);
            setTimeout(function(){
                inningChange()
            }, 1000)
            //run change inning function;
            //clear 3 out circles

        }
    })
    
    $("#single").click(function(){
        if($("#first-base").hasClass("base")){
            addRunnerFirst();
            }else if($("#second-base").hasClass("base")){
            addRunnerSecond();
            }else if($("#third-base").hasClass("base")){
            addRunnerThird();
            }else if($("#home-plate").hasClass("base")){
            addRunnerHome();
            addRun();
    }})

    $("#double").click(function(){
        //if first base, second base, and third base are empty, runner on second
        if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerSecond();
        }
        //if runner on first base, 2 and 3 are empty, move runners to second and third, empty 1st
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerSecond();
            addRunnerThird();
            removeRunnerFirst();
        }
        //if runner on first and second, 3rd empty, move runners to second and third and add run, remove 1st
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerThird();
            removeRunnerFirst();
            addRunnerHome();
            addRun();
        }
        //if runner on first and second and third, move runners to second and third and add 2 runs, remove 1st
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        //if runner on first and third, runners on 2nd and 3rd, add run, remove 1st
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerSecond();
            addRunnerHome();
            addRun();
        }
        //if runner on second base, 1st and 3rd empty, add run
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
        }

        //if runner on second and 3rd, 1st empty, empty 3rd, add 2 runs
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerThird();
            addRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        //if runner on 3rd, 1st and 2nd empty, remove 3rd, add 2nd, add run
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            removeRunnerThird();
            addRunnerSecond();
            addRunnerHome();
            addRun();
        }
    })

    $("#triple").click(function(){
        //if first base, second base, and third base are empty, runner on third
        if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerThird();
        }
        //if runner on first base, 2 and 3 are empty, add runner 3rd, clear first, add run
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerThird();
            removeRunnerFirst();
            addRun();
        }
        //if runner on first and second, 3rd empty, remove runner first, remove runner second, add runner third, add 2 runs
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerThird();
            removeRunnerFirst();
            removeRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        //if runner on first and second and third, remove first, remove second, add 3 runs
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            removeRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        //if runner on first and third, remove 1st, add 2 runs
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        //if runner on second base, 1st and 3rd empty, remove 2nd base, add 3rd, add run
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            removeRunnerSecond();
            addRunnerThird();
            addRunnerHome();
            addRun();
        }
        //if runner on second and 3rd, 1st empty, remove 2nd, add 2 runs;
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerSecond();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        //if runner on 3rd, 1st and 2nd empty, remove 2nd, add 3rd, add run
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
        }
    })

    $("#home-run").click(function(){
        //if first base, second base, and third base are empty, add run
        if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
        }
        //if runner on first base, 2 and 3 are empty, add 2 runs, clear bases
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        //if runner on first and second, 3rd empty, add 3 runs, empty bases
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        //if runner on first and second and third, add 4 runs, remove bases, alert GRAND SLAM!
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
            alert("Grand Slam!!!!")
        }
        //if runner on first and third, add 3 runs, remove bases
        else if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        //if runner on second base, add 2 runs, remove bases
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        //if runner on second and 3rd, add 3 runs, remove bases
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
        //if runner on 3rd, add 2 runs, remove bases
        else if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
            clearBases();
        }
    })
})

// Get the home input field
var homeInput = document.getElementById("home-team-search");

// Execute a function when the user releases a key on the keyboard
homeInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("home-search-button").click();
    }
});

// Get the away input field
var awayInput = document.getElementById("away-team-search");

// Execute a function when the user releases a key on the keyboard
awayInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("away-search-button").click();
    }
});

$("#home-search-button").on("click", function(){
    event.preventDefault();
    let searchedHomeTeam = $("#home-team-search").val().trim().toLowerCase();
    if(searchedHomeTeam =="yankees" || searchedHomeTeam =="new york yankees"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/yankees.png")
    }else if(searchedHomeTeam == "red sox" || searchedHomeTeam =="boston" || searchedHomeTeam == "boston red sox"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/redSox.png")
    }else if(searchedHomeTeam == "tigers" || searchedHomeTeam =="detroit" || searchedHomeTeam == "detroit tigers"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/tigers.png")
    }else if(searchedHomeTeam == "pirates" || searchedHomeTeam =="pittsburgh" || searchedHomeTeam == "pittsburgh pirates"){
        $('#home-image').attr("src", "./assets/images/missingTeamLogos/pirates.png")
    }else{
    setHomeTeam(searchedHomeTeam);
}})

$("#away-search-button").on("click", function(){
    event.preventDefault();
    let searchedAwayTeam = $("#away-team-search").val().trim().toLowerCase();
    if(searchedAwayTeam =="yankees" || searchedAwayTeam =="new york yankees"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/yankees.png")
    }else if(searchedAwayTeam == "red sox" || searchedAwayTeam =="boston" || searchedAwayTeam == "boston red sox"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/redSox.png")
    }else if(searchedAwayTeam == "tigers" || searchedAwayTeam =="detroit" || searchedAwayTeam == "detroit tigers"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/tigers.png")
    }else if(searchedAwayTeam == "pirates" || searchedAwayTeam =="pittsburgh" || searchedAwayTeam == "pittsburgh pirates"){
        $('#away-image').attr("src", "./assets/images/missingTeamLogos/pirates.png")
    }else{
    setAwayTeam(searchedAwayTeam);
}})

//API missing 4 team logos, here is a patch until images are updated



function setAwayTeam(awayTeam){
    
    let queryTeam = awayTeam
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://rapidapi.p.rapidapi.com/teams?search=" + queryTeam,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-baseball.p.rapidapi.com",
            "x-rapidapi-key": "77ea7439bemshbd256fafb717067p139b8ejsn9c8d1de46d29"
        }
    };
    
    
    $.ajax(settings).done(function (response) {
        //add if more than one result (i.e. new york mets and yankees) choose team via prompt or other way
        console.log(response);
        $("#away-image").attr("src", response.response[0].logo)
    });}

function setHomeTeam(homeTeam){
let queryTeam = homeTeam
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rapidapi.p.rapidapi.com/teams?search=" + queryTeam,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-baseball.p.rapidapi.com",
		"x-rapidapi-key": "77ea7439bemshbd256fafb717067p139b8ejsn9c8d1de46d29"
	}
};

$.ajax(settings).done(function (response) {
    //add if more than one result (i.e. new york mets and yankees) choose team via prompt or other way
    console.log(response);
    $("#home-image").attr("src", response.response[0].logo)
});}
