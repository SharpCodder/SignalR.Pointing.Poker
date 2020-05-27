"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/PointingHub").build();

connection.on("ReceiveMessage", function (memberRatings) {
    buildMaskedRatings(memberRatings);  
});

connection.on("ResetPointing", function (memberRatings) {
    setButtonAbility(false);
    buildMaskedRatings(memberRatings);
    $('#reset').hide();
    $('#reveal').attr('disabled', 'disabled').show();
});

connection.on("RevealPointing", function (memberRatings) {
    setButtonAbility(true);
    buildRatings(memberRatings);
    $('#reset').show();
    $('#reveal').hide();
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

//join group
document.getElementById("join").addEventListener("click", function (event) {

    var groupName = makeid(6);
    if ($('#groupName').val() != '') {
        groupName = $('#groupName').val();
    }
    var user = $('#user').val();
    connection.invoke("JoinGroup", groupName, user).catch(function (err) {
        return console.error(err.toString());
    });
    sessionStarted(groupName);
    event.preventDefault();
});

document.getElementById("sendButton05").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "0.5";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButton1").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "1";
    connection.invoke("SendMessage", getGroup(), user, message).catch (function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButton2").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "2";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButton3").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "3";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


document.getElementById("sendButton5").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "5";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


document.getElementById("sendButton8").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "8";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


document.getElementById("sendButton13").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "13";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButton20").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "20";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButton100").addEventListener("click", function (event) {
    var user = $('#user').val();
    var message = "100";
    connection.invoke("SendMessage", getGroup(), user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("reset").addEventListener("click", function (event) {
    connection.invoke("reset", getGroup()).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("reveal").addEventListener("click", function (event) {
    connection.invoke("reveal", getGroup()).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

