/**Jan Desmet, Bart Sevenois, Gabriel Deschamps, Lieven Luyckx, Cédric Brichau**/
getContacts();
addActions();

function addActions() {
    $('.dienstSlider').on("swipeleft", function (event) {
        var pos = $(this).position().left,
            width = $(window).width();
        if (pos > -width * 5) {
            updateSlider(width / 6);
            $(this).animate({
                left: '-=' + width + 'px'
            }, 100);
        }
    });

    $('.dienstSlider').on("swiperight", function (event) {
        var pos = $(this).position().left,
            width = $(window).width();
        if (pos < 0) {
            updateSlider(-width / 6);
            $(this).animate({
                left: '+=' + width + 'px'
            }, 100);
        }
    });
    $('.navContact li').click(function (event) {
        var position = Math.round(($(this).position().left) / ($(window).width() / 6));
        $('.dienstSlider').animate({
            left: position * -$(window).width() + "px"
        }, 100);
        $('#pointer').animate({
            left: position * $(window).width() / 6 + "px"
        }, 100);
    });
}

function updateSlider(distance) {
    $("#pointer").animate({
        left: '+=' + distance + "px"
    }, 100, function () {

    });
}

function getContacts() {
    $.post("http://app.stuvo.ehb.be/api/contacts.php", function (data) {
        $('.dienstSlider').html(generateContactsHtml(data));
    });
}

function generateContactsHtml(data) {
    var contacts = JSON.parse(data).contact,
        htmlString = "";
    for (var d in contacts) {
        var dienst = contacts[d];
        htmlString += generateContactHtml(dienst);
    }
    return htmlString;
}

function generateContactHtml(dienst) {
    var htmlString = "",
        dep = dienst.departement,
        voornaam = dienst.voornaam,
        achternaam = dienst.achternaam,

        tel = dienst.telefoonnummer,
        email = dienst.email;
    htmlString += "<div class='dienst'><h1 class='titelContact'>" + dep + "</h1>";
    htmlString += "<img class='icoon' src='img/iconen_psd.png'>";
    htmlString += "<div class='info'><ul>";

    if (typeof voornaam === 'string') {
        htmlString += singleContact(voornaam, achternaam, tel);
        htmlString += "</ul></div>";
        htmlString += "<div class='clearfix'></div>";
        htmlString += "<div class='emailAdres'><img class='icoonEmail' src='img/enveloppe_grey.png'><p>" + email + "</p></div>";
    } else if (typeof voornaam === 'undefined') {
        htmlString += "<li><p><span class='telefoonNummer'>" + tel + "</span></p></li><br></ul></div><div class='clearfix'></div>";
    } else {
        for (var i in voornaam) {
            htmlString += singleContact(voornaam[i], achternaam[i], tel[i]);
        }

        htmlString += "</ul></div>";
        htmlString += "<div class='clearfix'></div>";

        for (var i in email) {
            htmlString += "<div class='emailAdres'><img class='icoonEmail' src='img/enveloppe_grey.png'><p>" + email[i] + "</p></div>";
        }
    }

    htmlString += "</div>";
    return htmlString;

}

function singleContact(voornaam, naam, tel) {
    var htmlString = "<li><p><span class='naam'>" + voornaam + " " + naam + "</span><span class='telefoonNummer'>" + tel + "</span>";
    htmlString += "</p></li>";
    htmlString += "<br>";
    return htmlString;
}
