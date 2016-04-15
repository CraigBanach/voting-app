function updatePage(poll) {
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
        $("#option-holder").append("<p><button id='" + option + "' class='btn btn-default btn-lg'>" + option + ": " + poll.options[option] + "</button></p>");
        
        var backgroundColour = randomColor();
        var hoverBackgroundColor = getHoverColour(backgroundColour);
        
        data.labels.push(option);
        data.datasets[0].data.push(2);
        data.datasets[0].backgroundColor.push(backgroundColour);
        data.datasets[0].hoverBackgroundColor.push(hoverBackgroundColor);
    }
    $(".btn-lg").click(function() {addClickToPoll(this.id, poll)});
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
    $.get(url, {pollID : poll._id, option: option}).done(
         function() {alert("hello")});
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