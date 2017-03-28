/**Jan Desmet, Bart Sevenois, Gabriel Deschamps, Lieven Luyckx, Cédric Brichau**/
$(document).ready(function () {
    $(".dienstContent", $(".dienst").first()).css("display", "block");
    $(".dienst").first().attr("shown", "1");
    $(".dienst .dienstTitel").first().hide();
    addListener();
});

function addListener() {
    $('.dienstTitel').click(function (event) {
        if ($(this).parent().attr('shown') != 1) {

            $('.dienstContent').slideUp("slow");
            $('.dienstTitel').slideDown("slow");
            $('.dienst').attr('shown', 0);

            $(this).slideUp("slow");
            $('.dienstContent', $(this).parent()).slideDown();
            $(this).parent().attr('shown', 1);
        }
    });

    $('.imgPijl').click(function (event) {
        $(this).parent().slideUp("slow");
        $('.dienstTitel', $(this).parent().parent()).slideDown("slow");
        $(this).parent().parent().attr('shown', 0);
    });
    
    $('.imgLogo').click(function (event) {
        $(this).parent().slideUp("slow");
        $('.dienstTitel', $(this).parent().parent()).slideDown("slow");
        $(this).parent().parent().attr('shown', 0);
    });
}