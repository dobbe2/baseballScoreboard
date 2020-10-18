let homeTeam = "";
let homeScore = 0;
let awayScore = 0;
let awayTeam = "";
let outs = 0;
let balls = 0;
let strikes = 0;
let inning = 1;

$(document).ready(function(){

    //create function for clearing all balls
    function clearBalls(){
        $("#ball-one").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-two").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-three").removeClass('counter-dot').addClass('counter-dot-empty');
        $("#ball-four").removeClass('counter-dot').addClass('counter-dot-empty');
    }

    //create a function for clearing all strikes
    function clearStrikes(){
        $("#strike-one").addClass("counter-dot-empty").removeClass('counter-dot');
        $("#strike-two").addClass("counter-dot-empty").removeClass('counter-dot');
        $("#strike-three").addClass("counter-dot-empty").removeClass('counter-dot');
    }

    //clear the bases
    function clearBases(){
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
    function setInning(){
        $("#inning-number").html(inning);
    }

    setInning();

    function seventhInningStrech(){
        if(inning == 7){
            if($('input[type="checkbox"]').is(":checked")){
                console.log("Music is on!")
                $('audio#take-me-out')[0].play()
            }else{
                console.log("Music is off")
            }
            alert("seventh Inning strech!");
            // $("#take-me-out").prepend("<button>pause</button>");
            
            // $('audio#take-me-out')[0].pause()
        }
    }

    //set home score
    function setHomeScore(){
        $("#home-score").html(homeScore);
    }
    setHomeScore();

    //set away score
    function setAwayScore(){
        $("#away-score").html(awayScore);
    }

    setAwayScore();

    //set base runners and remove base runners
    function addRunnerFirst(){
        $("#first-base").addClass("base-on").removeClass("base");
    }

    function addRunnerSecond(){
        $("#second-base").addClass("base-on").removeClass("base");
    }

    function addRunnerThird(){
        $("#third-base").addClass("base-on").removeClass("base");
    }

    function addRunnerHome(){
        $("#home-plate").addClass("base-on").removeClass("base");
    }

    function removeRunnerFirst(){
        $("#first-base").addClass("base").removeClass("base-on");
    }

    function removeRunnerSecond(){
        $("#second-base").addClass("base").removeClass("base-on");
    }

    function removeRunnerThird(){
        $("#third-base").addClass("base").removeClass("base-on");
    }
    function removeRunnerHome(){
        $("#home-plate").addClass("base").removeClass("base-on");
    }

    //add run for home or away team
    function addRun(){
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
            $("#home-score").html(homeScore);
            setTimeout(function(){
                $("#home-plate").removeClass("base-on").addClass("base")
            }, 1000)
    }}

    //change inning
    function inningChange(){
        $("#out-one").removeClass('counter-dot').addClass("counter-dot-empty")
        $("#out-two").removeClass('counter-dot').addClass("counter-dot-empty")
        $("#out-three").removeClass('counter-dot').addClass("counter-dot-empty");
        if($("#triangle-top-empty").hasClass("full")){
            //if seventh inning, sing take me out to the ball game!
            seventhInningStrech();
            $("#triangle-top-empty").addClass("triangle-top-empty").removeClass("full");
            $("#triangle-bottom-empty").addClass("full").removeClass("triangle-bottom-empty");
            //clear all bases
            clearBases();
        }else if($("#triangle-top-empty").hasClass("triangle-top-empty")){
            //clear all bases
            $("#triangle-top-empty").addClass("full").removeClass("triangle-top-empty")
            $("#triangle-bottom-empty").addClass("triangle-bottom-empty").removeClass("full");
            inning += 1
            $("#inning-number").html(inning);
            setInning();
            clearBases();
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
                    $("#out-one").removeClass('counter-dot-empty')
                    $("#out-one").addClass("counter-dot")
                }else if($('#out-two').hasClass('counter-dot-empty')){
                    console.log("Out 2")
                    $("#out-two").removeClass('counter-dot-empty');
                    $("#out-two").addClass("counter-dot");
                }else if($('#out-three').hasClass('counter-dot-empty')){
                    console.log("Out 3")
                    $("#out-three").removeClass('counter-dot-empty');
                    $("#out-three").addClass("counter-dot");
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
            }, 1000)
            setTimeout(function(){
                inningChange()
            }, 1000)
            //run change inning function;
            //clear 3 out circles

        }
    })
    
    $("#single").click(function(){
        if($("#first-base").hasClass("base")){
            $("#first-base").addClass("base-on").removeClass("base");
            }else if($("#second-base").hasClass("base")){
            $("#second-base").addClass("base-on").removeClass("base");
            }else if($("#third-base").hasClass("base")){
            $("#third-base").addClass("base-on").removeClass("base");
            }else if($("#home-plate").hasClass("base")){
            $("#home-plate").addClass("base-on").removeClass("base");
                clearBalls();
                clearStrikes();
                addRun();
    }})

    $("#double").click(function(){
        //if first base, second base, and third base are empty, runner on second
        if($("#first-base").hasClass("base") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerSecond();
        }
        //if runner on first base, 2 and 3 are empty, move runners to second and third, empty 1st
        if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base")){
            addRunnerSecond();
            addRunnerThird();
            removeRunnerFirst();
        }
        //if runner on first and second, 3rd empty, move runners to second and third and add run, remove 1st
        if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base")){
            addRunnerThird();
            removeRunnerFirst();
            addRunnerHome();
            addRun();
        }
        //if runner on first and second and third, move runners to second and third and add 2 runs, remove 1st
        if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base-on") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerHome();
            addRun();
            addRunnerHome();
            addRun();
        }
        //if runner on first and third, runners on 2nd and 3rd, add run, remove 1st
        if($("#first-base").hasClass("base-on") && $("#second-base").hasClass("base") && $("#third-base").hasClass("base-on")){
            removeRunnerFirst();
            addRunnerSecond();
            addRunnerHome();
            addRun();
        }
        //if runner on second base, 1st and 3rd empty, add run

        //if runner on second and 3rd, 1st empty, empty 3rd, add 2 runs

        //if runner on 
    })

})
// commented out API call during development of other portions of project, only given 100 per day free

// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://api-baseball.p.rapidapi.com/teams?league=1&season=2020",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "api-baseball.p.rapidapi.com",
// 		"x-rapidapi-key": "eef4bb6860mshbcdd99ffb0c7afbp140049jsn172da8baa055"
// 	}
// }

// $.ajax(settings).done(function (response) {

//     //got access to the response, some images are not showing as of oct 11 pm, will test again tomorrow"
//     let homeTeam = response.response[27].logo;
//     $("#home-image").attr("src", homeTeam);
//     let awayTeam = response.response[30].logo;
//     $("#away-image").attr("src", awayTeam);
//     console.log(response);
//     console.log(response.response[21].logo)
// });