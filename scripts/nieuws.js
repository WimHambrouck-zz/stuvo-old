/**Jan Desmet, Bart Sevenois, Gabriel Deschamps, Lieven Luyckx, Cédric Brichau**/
$(document).ready(function () {
    addContent();
});

function addContent() {
    $.post("http://app.stuvo.ehb.be/api/nieuws.php", function (data) {
        $('.nieuws ul').html(generateNewsHtml(data));
        $('.nieuws ul li').first().removeClass('notSelected');
        $('.nieuws ul li').first().addClass('selected');
        addListeners();
    });

}

function addListeners() {
    $('.notSelected').click(function(){
        $('.selected').switchClass('selected','notSelected');
        $(this).switchClass('notSelected','selected');
    });
}

function generateNewsHtml(data) {
    var htmlString = "";
    var newsObj = JSON.parse(data).data;
    for (var item in newsObj) {
        htmlString += generateNewsItemHtml(newsObj[item]);
    }
    return htmlString;
}

function generateNewsItemHtml(item) {
    var htmlString = "";
    var naam = item.name;
    var descr = item.description;
    var tijd = item.created_time;
    var datum = tijd.split("T")[0].split("-");
    var imgSource = item.picture;
    var link = item.link;

    if(typeof descr != "undefined" && descr.length > 200){
        descr = descr.substring(0,200) + "...";
    }
    
    if (typeof naam === "undefined") {
        return "";
    }
    htmlString += "<li class='notSelected'>";
    htmlString += "<h3>" + naam + "</h3>";
    htmlString += "<img src='" + imgSource + "'>";
    htmlString += "<p class='date'><img src='img/kalender_red.png'>" + datum[2] + "/" + datum[1] + "/" + datum[0] + "</p>";
    htmlString += "<p class='description'>" + descr + "</p>";
    htmlString += "<p class='articleLink'><a href='"+ link + "' target='_blank'>Ga naar de site</a></p>";
    htmlString += "<p class='readMore'>Lees meer...</p>";
    htmlString += "<div class='clearFix'></div></li>";
    return htmlString;
}