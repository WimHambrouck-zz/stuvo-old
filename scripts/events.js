/**Jan Desmet, Bart Sevenois, Gabriel Deschamps, Lieven Luycks, Cédric Brichau**/
/* jshint
devel:true,
browser: true,
jquery:true
*/
/* global google */
var map;
var marker;

$(document).ready(function () {
    createMap('Nijverheidskaai 170, anderlecht');
    getContent();

});

function createMap(adres) {

    var adresToLatLong = new google.maps.Geocoder(),
        location;
    adresToLatLong.geocode({
        'address': adres
    }, function (data) {
        location = data[0].geometry.location;
        var options = {
            zoom: 15,
            center: location,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), options);

        marker = new google.maps.Marker({
            position: location,
            map: map
        });

        google.maps.event.addListener(marker, 'click', function () {
            map.panTo(marker.getPosition());
        });
    });


}

function updateMap(selected) {
    var adres = $('td:first', selected).text();
    createMap(adres);
}

function getContent() {
    
    $.post("http://app.stuvo.ehb.be/api/agenda.php", function (data) {
        $('.eventMonthSlider').html(generateEventMonthsHtml(data) + "<div class='clearfix'></div>");
        $('.event:nth-child(2)').addClass('selected');
        changeCss();
        addSwapper();
        addListeners();
    });
}

function addSwapper() {
    $('.event').click(function (event) {
        $('.selected', $(this).parent()).before($(this));
        $('.selected', $(this).parent()).removeClass('selected');
        $(this).addClass('selected');
        updateMap($(this));
    });
}

function addListeners() {

    $('.eventMonthSlider').on('swipeleft', function (event) {
        slideLeft($(this));
    });
    $('.eventMonthSlider').on('swiperight', function (event) {
        slideRight($(this));
    });
    $('.arrowLeft').click(function (event) {
        slideRight($('.eventMonthSlider'));
    });
    $('.arrowRight').click(function (event) {
        slideLeft($('.eventMonthSlider'));
    });

}

function slideLeft(object) {
    var pos = object.position().left,
        width = $(window).width();
    if (pos > -width * (($('.eventMonth').length) - 1)) {
        object.animate({
            left: '-=' + width + 'px'
        }, 100);
    }
}

function slideRight(object) {
    var pos = object.position().left,
        width = $(window).width();
    if (pos < 0) {
        object.animate({
            left: '+=' + width + 'px'
        }, 100);
    }
}



function generateEventMonthsHtml(data) {
    var eventMonths = JSON.parse(data).events,
        htmlString = '';
    for (var eventMonth in eventMonths) {
        htmlString += "<div class='eventMonth'><h2><img class='arrowLeft' src='img/pijltjeLinks_white.png'>" + eventMonth + "<img class='arrowRight' src='img/pijltjeRechts_white.png'></h2>" + generateEventMonthHtml(eventMonths[eventMonth]) + "</div>";
    }

    return htmlString;
}

function generateEventMonthHtml(eventMonth) {
    var htmlString = '';
    for (var event in eventMonth) {
        htmlString += generateEventHtml(eventMonth[event]);
    }
    return htmlString;
}

function generateEventHtml(event) {
    var htmlString = '',
        dag = event.date.startday,
        maand = event.date.startmonth,
        jaar = event.date.startyear,
        tijd = event.date.starthour + ":" + event.date.startminute,
        naam = event.name,
        descr = event.description,
        id = event.id,
        locatie = event.location;

    htmlString += "<div class='event'><h3>" + naam + "</h3>";
    htmlString += "<img src='img/Agenda_temp.jpg'><p class='description'>" + descr + "</p>";
    htmlString += "<table><tr><td><img src='img/Location_red.png'>" + locatie + "</td>";
    htmlString += "<td><img src='img/kalender_red.png'>" + dag + "/" + maand + "/" + jaar + "</td>";
    htmlString += "<td><img src='img/Tijd_red.png'>" + tijd + "</td></tr></table><div class='clearfix'></div></div>";

    return htmlString;
}

function changeCss() {
    $('.eventMonthSlider').css('width', 100 * ($('.eventMonth').length) + "%");
    $('.eventMonth').css('width', 100 / ($('.eventMonth').length) + "%");
}
