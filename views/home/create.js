$(document).ready(function() {

    $('.container-fluid').keypress(function(e){
      if(e.keyCode==13)
        $("#submit-button").click();
    });
})

function checkNumOptions(object) {
    var currentOption = object.id.slice(object.id.length - 1);
    var numElements = $(".option-label").size();
    
    if (numElements == currentOption) {
        createNewOption(numElements + 1);
    }
}

function createNewOption(number) {
    var formClass = ".option" + (number - 1) + "-form";
    var newElement = buildForm(number);
    $(formClass).after(newElement);
}

function buildForm(number) {
    return '<div class="form-group option' + number + '-form">' +
          '<div class="col-sm-2"></div>' +
          '<label for="option' + number + '" class="col-sm-2 control-label">Option ' + number + ': </label>' +
          '<div class="col-sm-6">' + 
            '<input type="text" oninput="checkNumOptions(this)" class="form-control option-label" id="option' + number + '">' +
          '</div>' + 
          '<div class="col-sm-2"></div>' +
          '<div class="col-sm-2"></div>' +
        '</div>'
}

function updatePollName(text) {
    $("#pollTitle").text(text);
}

function submitPoll() {
    var pollOptions = {};
    var pollName = $("#pollName").val();
    
    $(".option-label").each(function() {
        if (this.value != "") {
            pollOptions[this.value] = 0;
        }
    });
     
    $.ajax({
        type: 'POST',
        url: 'https://voting-app-cragsify.c9users.io/home/submit',
        accepts: "application/json",
        //complete: function() {alert("ajax completed");},
        data: JSON.stringify({pollName: pollName, options: pollOptions}), // or JSON.stringify ({name: 'jonas'}),
        contentType: "application/json",
        dataType: "json",
        error: function() {alert("error");},
        success: function(data) {
            window.location.href = "https://voting-app-cragsify.c9users.io/home/poll/" + data;
        }
    });
}