
var globalChart;

function updatePage(poll) {
    alert("fired");
    var pollName = poll.pollName;
    $(".title-text").text(pollName);
    var data = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
    };
    for (var option in poll.options) {
        //alert(unencodedOption)
        $("#option-holder").append("<p><button data='data' id='" + option + "' class='btn btn-default btn-lg'>" + poll.options[option].option + ": " + poll.options[option].value + "</button></p>");
        
        var backgroundColour = randomColor();
        var hoverBackgroundColor = getHoverColour(backgroundColour);
        
        //alert(poll.options[option].option);
        
        data.labels.push(poll.options[option].option);
        data.datasets[0].data.push(poll.options[option].value);
        data.datasets[0].backgroundColor.push(backgroundColour);
        data.datasets[0].hoverBackgroundColor.push(hoverBackgroundColor);
    }
    
var ctx = document.getElementById("myChart");
/*var data = {
    labels: [
        "Red",
        "Green",
        "Yellow"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C"
            ],
            hoverBackgroundColor: [
                "#FF5A5E",
                "#5AD3D1",
                "#FFC870"
            ]
        }]
};*/
var myChart = new Chart(ctx, {
		type: 'pie',
		data: data
});
$(".btn-lg").click(function() {
    addClickToPoll(this.id, poll)
    updateButtonText(this.id);
});
globalChart = myChart;
}

function getHoverColour(colour) {
    var number = colour.slice(1);
    var output = "#";
    var RGB = [number.substring(0,2), number.substring(2,4), number.substring(4,6)]
    for (var number in RGB) {
        number = parseInt(RGB[number], 16);
        number += 14;
        if (number > 255) number = 255;
        number = number.toString(16);
        output += number;
    }
    //alert(output + "    " + number);
    return output;
}

function addClickToPoll(option, poll) {
    var url = "https://voting-app-cragsify.c9users.io/home/updatepoll"
    var query = {};
    query.pollID =  poll._id;
    query.id = option;
    $.get(url, {pollID: poll._id, id: option}).done(
         function(data) {
             //var ctx = document.getElementById("myChart").getContext("2d");
             //var myChart = Chart(ctx);
            //alert(JSON.stringify(ctx));
            //for (var i = 0; i < data.length)
            var i = 0;
            for (var option in data) {
                globalChart.data.datasets[0].data[i] = data[option].value;
                globalChart.data.labels[i] = data[option].option;
                i++;
            }
             globalChart.update();
             globalChart.render();

         });
    /*$.ajax({
        url: url,
        accepts: "application/json",
        complete: function() {alert("ajax completed");},
        contentType: "application/json",
        data: {pollID : poll._id, option: option},
        dataType: "json",
        error: function() {alert("error");},
        success: function() {alert("success");},
    })*/
}

function updateButtonText(button) {
    //alert("#" + button);
    
    var buttonText = "#" + button;
    //alert(String(buttonText));
    var text = $(buttonText).text();
    
    //alert(text);
    var textArray = text.split(": ");
    var number = Number(textArray[1]) + 1;
    text = textArray[0] + ": " + number;
    $("#" + button).text(text);
}

function deletePoll() {
    var url = window.location.href;
    var urlArray = url.split("/");
    var poll = urlArray[urlArray.length - 1];
    
    url = "https://voting-app-cragsify.c9users.io/home/deletepoll"
    $.ajax({
        type: "POST",
        url: url,
        //complete: function() {alert("ajax completed");},
        contentType: "application/json",
        data: JSON.stringify({pollID : poll}),
        error: function() {alert("error");},
        success: function() {window.location.href = "https://voting-app-cragsify.c9users.io/home"}
    })
}

function newOption() {
    $("#new-option").hide();
    $("#new-options").append(
        "<form id='option-form' action='' onsubmit='return false'>" +
        "New Option: " + "<input id='input-holder' type='text' placeholder='option'>" +
        "<button id='submit-form'>add Option</button>" +
        "</form>");
    $("#submit-form").click(addNewOption)
}

function addNewOption() {
    var option = $("#input-holder").val();
    var url = window.location.href;
    var urlArray = url.split("/");
    var poll = urlArray[urlArray.length - 1];
    url = "https://voting-app-cragsify.c9users.io/home/addoption";
    
    $.ajax({
        type: "POST",
        url: url,
        //complete: function() {alert("ajax completed");},
        contentType: "application/json",
        data: JSON.stringify({option: option, id: poll}),
        error: function() {alert("error");},
        success: function() {window.location.href = "https://voting-app-cragsify.c9users.io/home/poll/" + poll},
        })
}

$('#option-form').submit(function (evt) {
   evt.preventDefault(); //prevents the default action
});
function updatePage() {
    var pollName = $("#main-container").attr("data");
    
}
