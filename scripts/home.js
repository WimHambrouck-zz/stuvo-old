/**Jan Desmet, Bart Sevenois, Gabriel Deschamps, Lieven Luyckx, Cédric Brichau**/
getEvents();
getNews();
addActions();

function addActions() {
    $('.homepageSlider').on("swipeleft", function (event) {
        slideLeft($(this));
    });

    $('.homepageSlider').on("swiperight", function (event) {
        slideRight($(this));
    });

    $('.nav a').click(function (event) {
        var left = $(event.target).position().left;
        var width = $(window).width();
        var leftPosSlider = 0;
        if (left < width / 3) {
            leftPosSlider = 0;

        } else if (left > 2 * width / 3) {
            leftPosSlider = -2 * width;
        } else {
            leftPosSlider = -width;
        }
        $('.homepageSlider').animate({
            left: leftPosSlider + "px"
        });
        $('#pointer').animate({
            left: -leftPosSlider / 3 + "px"
        });
    })
}

function slideLeft(object) {
    var pos = object.position().left;
    var width = $(window).width();
    if (pos > -width * 2) {
        updatePointer(width / 3);
        object.animate({
            left: '-=' + width + 'px'
        }, 100);
    }
}

function slideRight(object) {
    var pos = object.position().left;
    var width = $(window).width();
    if (pos < 0) {
        updatePointer(-width / 3);
        object.animate({
            left: '+=' + width + 'px'
        }, 100);
    }
}

function updatePointer(distance) {
    $("#pointer").animate({
        left: '+=' + distance + "px"
    }, 100, function () {

    });
}


// CONTENT JS

function getEvents(amount) {
    $.post("http://app.stuvo.ehb.be/api/agenda.php", function (data) {
        $('.events ul').html(generateEventsHtml(data));
    });
}

function getNews() {
    $.post("http://app.stuvo.ehb.be/api/nieuws.php", function (data) {
        $('.actueel ul').html(generateActuasHtml(data));
    });
}

function generateEventsHtml(data) {
    var events = JSON.parse(data).events;
    var htmlString = "";
    var counter = 0;
    for (var maand in events) {
        maand = events[maand];
        for (var event in maand) {
            event = maand[event];
            htmlString += generateEventHtml(event);
            counter++;
            if (counter >= 4) {
                return htmlString;
            }
        }
    }

    return htmlString;
}

function generateActuasHtml(data) {
    var actuas = JSON.parse(data).data;
    var htmlString = "";
    var counter = 0;
    for (var actua in actuas) {
        htmlString += generateActuaHtml(actuas[actua]);
        counter++;
        if (counter >= 3) {
            return htmlString;
        }
    }
    return htmlString;
}

function generateEventHtml(event) {

    var htmlString = "";
    var dag = event.date.startday
    var maand = maandToString(event.date.startmonth);
    var jaar = event.date.startyear;
    var tijd = event.date.starthour + ":" + event.date.startminute;
    var naam = event.name
    var id = event.id;
    var locatie = event.location;

    htmlString += "<li><h2 class='datum'><span>" + dag + "</span><br>" + maand + "</h2>";
    htmlString += "<div class='info'><h3>" + naam + "</h3>";
    htmlString += "<img class='icoon' src='img/maps_grey.png'/><p>" + locatie + "</p><br>"
    htmlString += "<img class='icoon' src='img/kalender_grey.png'/><p>" + dag + " " + maand + " " + jaar + "</p><br>"
    htmlString += "<img class='icoon' src='img/klok_grey.png'/><p>" + tijd + "</p></div><div class='clearfix'></div></li>";

    return htmlString;
}

function generateActuaHtml(actua) {

    var htmlString = "";
    var naam = actua.name;
    var descr = actua.description;
    var tijd = actua.created_time;
    var datum = tijd.split("T")[0].split("-");
    var imgSource = actua.picture;
    if(typeof naam === 'undefined'){
        return "";
    }
    htmlString += "<li><img src='" + imgSource + "'>";
    htmlString += "<div class='info'><h3>" + naam + "</h3>";
    htmlString += "<p>" + descr + "</p>";
    htmlString += "<img class='icoon' src='img/kalender_red.png'>";
    htmlString += "<p class='datum'>" + datum[2] + "/" + datum[1] + "/" + datum[0] + "</p></div></li>";
    htmlString += "<div class='clearfix'></div>";

    return htmlString;
}



function maandToString(maand) {
    switch (maand) {
    case "1":
        return "Jan";
    case "2":
        return "Feb";
    case "3":
        return "Mar";
    case "4":
        return "Apr";
    case "5":
        return "Mei";
    case "6":
        return "Jun";
    case "7":
        return "Jul";
    case "8":
        return "Aug";
    case "9":
        return "Sep";
    case "10":
        return "Okt";
    case "11":
        return "Nov";
    case "12":
        return "Dec";
    default:
        return "UNKNOWN";
    }
}