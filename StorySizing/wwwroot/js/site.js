var setButtonAbility = function setButtonAbility(isDisabled) {
    if (isDisabled)
        $('.votingButton').attr('disabled', 'disabled');
    else
        $('.votingButton').removeAttr('disabled');
}

var clearVotes = function clearVotes() {
    $("#messagesList").empty();
}

var getGroup = function getGroup() {
    return $("#groupName").val();
}

var buildMaskedRatings = function buildMaskedRatings(memberRatings) {
    var i;
    var tableRef = document.getElementById('messagesList').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";
    for (i = 0; i < memberRatings.length; i++) {
        var newRow = tableRef.insertRow(i);
        var namedTd = newRow.insertCell(0);
        namedTd.appendChild(document.createTextNode(memberRatings[i].member));
        var votedTd = newRow.insertCell(1);
        votedTd.appendChild(document.createTextNode(memberRatings[i].hasRating ? "X" : ""));
    }
    if (memberRatings.length === memberRatings.filter(hasRating => hasRating.hasRating === true).length)
        $('#reveal').removeAttr('disabled');
    else
        $('#reveal').attr('disabled', 'disabled');
}

var buildRatings = function buildRatings(memberRatings) {
    var i;
    var tableRef = document.getElementById('messagesList').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";
    for (i = 0; i < memberRatings.length; i++) {
        var newRow = tableRef.insertRow(i);
        var namedTd = newRow.insertCell(0);
        namedTd.appendChild(document.createTextNode(memberRatings[i].member));
        var votedTd = newRow.insertCell(1);
        votedTd.appendChild(document.createTextNode(memberRatings[i].rating));
    }
}

var makeid = function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function setSessionLinkHref(link) {
    $('#sessionLink').attr('href', link);
    $('#sessionLink').text(link);
}

var sessionStarted = function sessionStarted(groupName) {
    $("#session").show();
    $("#votingButtons").show();
    $("#sessionVotes").show();
    $('#votingActionButtons').show();
    $("#groupName").val(groupName);
    $('#user').attr('disabled', 'disabled');
    $('#join').hide();
    setButtonAbility(false);
    if (getUrlParameter('session') === undefined)
        setSessionLinkHref(window.location + "?session=" + groupName);
}

$(document).ready(function () {
    if (getUrlParameter('session')) {
        $('#groupName').val(getUrlParameter('session'));
        setSessionLinkHref(window.location);
        $('#join').val('Join Session');
    }
    $('#votingButtons').hide();
    $('#sessionVotes').hide();
    $('#votingActionButtons').hide();
    $('#session').hide();
    $('#reset').hide();
    setButtonAbility(true);
})