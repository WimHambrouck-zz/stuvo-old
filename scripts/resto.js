/**Jan Desmet, Bart Sevenois, Gabriel Deschamps, Lieven Luyckx, Cédric Brichau**/
$(document).ready(function () {
    var campusID = localStorage.getItem("campusID");
    moveSliderToCampus(campusID);
    getMenus(campusID);
    addActions();
});



function addActions() {
    $('.menuWrapperSlider').on("swipeleft", function (event) {
        slideLeft($(this));
    });

    $('.menuWrapperSlider').on("swiperight", function (event) {
        slideRight($(this));
    });

    $('.dagSelectie .pijltjeLinks').click(function (event) {
        slideRight($(".menuWrapperSlider"));
    });

    $('.dagSelectie .pijltjeRechts').click(function (event) {
        slideLeft($(".menuWrapperSlider"));
    });

    $('.navRestoWrapper').on("swipeleft", function (event) {
        slideRestoLeft($(this));
    });

    $('.navRestoWrapper').on("swiperight", function (event) {
        slideRestoRight($(this));
    });

    $('.navResto .pijltjeLinks').click(function (event) {
        slideRestoRight($('.navRestoWrapper ul'));
    });

    $('.navResto .pijltjeRechts').click(function (event) {
        slideRestoLeft($('.navRestoWrapper ul'));
    });

}

function moveSliderToCampus(id) {
    var leftPos = id * $(window).width();
    $('.navRestoWrapper ul').css("left", -leftPos + "px");
}

function slideRestoLeft(object) {
    var pos = object.position().left;
    var width = $(window).width();
    if (pos > -width * 5) {
        object.animate({
            left: '-=' + width + 'px'
        }, 100, function () {
            getMenus(object.position().left / width * -1);
        });
    }
}

function slideRestoRight(object) {
    var pos = object.position().left;
    var width = $(window).width();
    if (pos < 0) {
        object.animate({
            left: '+=' + width + 'px'
        }, 100, function () {
            getMenus(object.position().left / width * -1);
        });
    }
}

function slideLeft(object) {
    var pos = object.position().left;
    var width = $(window).width();
    if (pos > -width * (($('.menuWrapperSlider .menu').length) - 1)) {
        updateDaySlider(-width);
        object.animate({
            left: '-=' + width + 'px'
        }, 100);
    }
}

function slideRight(object) {
    var pos = object.position().left;
    var width = $(window).width();
    if (pos < 0) {
        updateDaySlider(width);
        object.animate({
            left: '+=' + width + 'px'
        }, 100);
    }
}

function updateDaySlider(distance) {
    $('.dagSelectieWrapperSlider').animate({
        left: '+=' + distance + "px"
    }, 100, function () {

    });
}

function getMenus(id) {
    $.post("http://app.stuvo.ehb.be/api/resto.php?campus=" + id, function (data) {
        $(".dagSelectieWrapperSlider").html("");
        $(".menuWrapperSlider").html(generateMenusHtml(data));
        changeCss();
    });
}

function generateMenusHtml(data) {
    var menus = JSON.parse(data).menu;
    var htmlString = ""
    for (var dag in menus) {
        $(".dagSelectieWrapperSlider").append("<h1>" + dag + "</h1>");
        htmlString += generateMenuHtml(menus[dag]);
    }
    return htmlString;
}

function generateMenuHtml(dagMenu) {
    var htmlString = "";
    htmlString += "<div class='menu'><table>";

    htmlString += "<tr><td><img src='img/soep.png'></td><td class='info'>Soep<br><span>";
    htmlString += dagMenu.Soep + "</span></td></tr>";

    htmlString += "<tr><td><img src='img/bord.png'></td><td class='info'>Dagschotel<br><span>";
    htmlString += dagMenu.Dagschotel + "</span></td></tr>";

    htmlString += "<tr><td><img src='img/wortel.png'></td><td class='info'>Vegetarische schotel<br><span>";
    htmlString += dagMenu["Vegetarische Schotel"] + "</span></td></tr>";

    htmlString += "<tr><td><img src='img/bord.png'></td><td class='info'>Koude schotel<br><span>";
    htmlString += dagMenu["koude Schotel"] + "</span></td></tr>";

    htmlString += "<tr><td><img src='img/broodje.png'></td><td class='info'>Broodje van de week<br><span>";
    htmlString += dagMenu["Broodje van de week"] + "</span></td></tr>";

    htmlString += "<tr><td><img src='img/panini.png'></td><td class='info'>Panini<br><span>";
    htmlString += dagMenu.Panini + "</span></td></tr>";

    htmlString += "<tr><td><img src='img/muffin.png'></td><td class='info'>Dessert<br><span>";
    htmlString += dagMenu.Dessert + "</span></td></tr>";

    htmlString += "</table></div>";

    return htmlString;
}

function changeCss() {
    $('.menuWrapperSlider').css('width', 100 * ($('.menuWrapperSlider .menu').length) + "%")
    $('.menu').css('width', (100 / ($('.menuWrapperSlider .menu').length) - 6) + "%");
}