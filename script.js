let homeTeam = "";
let awwayTeam = "";
let outs = 0;
let balls = 0;
let strikes = 0;

$(document).ready(function(){

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
                $("#strike-one").addClass("counter-dot-empty").removeClass('counter-dot');
                $("#strike-two").addClass("counter-dot-empty").removeClass('counter-dot');
                $("#strike-three").addClass("counter-dot-empty").removeClass('counter-dot');

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
                }
            },1000)
        }
    })

    $("#add-out").click(function(){
        if($('#out-one').hasClass('counter-dot-empty')) {
            console.log("Out 1")
            $("#out-one").removeClass('counter-dot-empty').addClass("counter-dot")
        }else if($('#out-two').hasClass('counter-dot-empty')){
            console.log("Out 2")
            $("#out-two").removeClass('counter-dot-empty').addClass("counter-dot");
        }else if($('#out-three').hasClass('counter-dot-empty')){
            console.log("Out 3")
            $("#out-three").removeClass('counter-dot-empty').addClass("counter-dot");
        }
    })
    
})

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api-baseball.p.rapidapi.com/teams?league=1&season=2020",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-baseball.p.rapidapi.com",
		"x-rapidapi-key": "eef4bb6860mshbcdd99ffb0c7afbp140049jsn172da8baa055"
	}
}

$.ajax(settings).done(function (response) {
    //got access to the response, some images are not showing as of oct 11 pm, will test again tomorrow"
    let homeTeam = response.response[27].logo;
    $("#home-image").attr("src", homeTeam);
    let awayTeam = response.response[20].logo;
    $("#away-image").attr("src", awayTeam);
    console.log(response);
    console.log(response.response[21].logo)
});