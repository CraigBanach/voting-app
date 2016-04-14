function showPolls(polls) {
    for (var i = 0; i < polls.length; i++) {
        var url = 'https://voting-app-cragsify.c9users.io/home/poll/' + polls[i]._id; 
        $("#pollHolder").append("<a href='" + url + "' id='" + polls[i]._id + "' class='btn btn-default'>" + polls[i].pollName + "</a>");
    }
}