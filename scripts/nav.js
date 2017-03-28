/**Jan Desmet, Bart Sevenois, Gabriel Deschamps, Lieven Luyckx, Cédric Brichau**/
var activeNav = false;
var activeSettings = false;

document.addEventListener("deviceready", registerGCM, false);


$(document).ready(function () {
    init();
    
});



function init() {

    if (localStorage.getItem('campusID') !== null) {
        $('.settingsNav select').val(localStorage.getItem('campusID'));
    }

    $("#hamburger").click(function () {
        toggleNavMenu(true);
    });

    $("#tandwiel").click(function () {
        toggleSettingsMenu(true);
    });

    $("#black").click(function () {
        if (activeNav) toggleNavMenu(true);
        if (activeSettings) toggleSettingsMenu(true);
    });
    
    $('.navWrapper').on("swipeleft", function () {
        if (activeNav) toggleNavMenu(true);
    })
    $('.navWrapper').on("swiperight", function () {
        if (activeSettings) toggleSettingsMenu(true);
    })

    $('.settingsNav .switch input').click(function () {
        localStorage.setItem("pushBerichten", $(this).is(":checked"));
    });
    $('.settingsNav select').change(function () {
        localStorage.setItem("campusID", $(this).val());
    });
    
    handleExternalURLs();
}

function registerGCM(){
	try{      
        console.log("Registering push notification plugin!");
        window.push = PushNotification.init({
			
            android: {
                senderID: "1077268067967", // ID is the ID from EIDIO
                icon: "logonotification"
            },
            ios: {
                alert: "true",
                sound: "true",
                clearBadge: "true",
                senderID: window.settings.GCM_SENDERID // GCM
            },
            windows: {}
        });    
        push.on('registration', function(data) {
            var url = "app.stuvo.ehb.be/api/notification_gcm.php?action=register&id=" + data.registrationId + "&os=" + device.platform;
            console.log("Sending AJAX request to: " + url);
            $.ajax({
                url: url,
                success: function() {
                    // Device registered
                    console.log('DEVICE REGISTERED');
                },
                error: function() {
                    // Device registration error
                    console.log('DEVICE COULD NOT BE REGISTERED');
                }
            });
        });
 
        push.on('notification', function(data){
            // Niet belangrijk, notificatie tijdens de app open is
        });
 
        push.on('error', function(e) {
            console.log(e.message);
        });
    }catch (ex){
        console.log('ERROR_NOTIFICATIONS: ' + ex);
    }
}



function toggleNavMenu(buttonPressed) {
    if (!activeNav && buttonPressed) {
        $("#navigatie").animate({
            left: "+=80%"
        }, 300, false);
        $("#black").show();
        $('#black').height($('#navigatie').height());
        $("#black").fadeTo("fast", 1);
        $('body').height($('#navigatie').height() + 60);
        $('html').height($('#navigatie').height() + 60);
        $('body').css('overflow','hidden');
        activeNav = !activeNav;
        toggleSettingsMenu(false);
    } else if (activeNav) {
        $("#navigatie").animate({
            left: "-=80%"
        }, 300, false);
        if (buttonPressed) {
            $("#black").fadeTo("fast", 0, function () {
                $("#black").hide();
                $('body').css('height', '');
                $('html').css('height', '');
                $('body').css('overflow','');
            });
        }

        activeNav = !activeNav;
    }
}

function toggleSettingsMenu(buttonPressed) {
    if (!activeSettings && buttonPressed) {
        $("#settings").show();
        $("#settings").animate({
            right: "+=80%"
        }, 300, false);
        $("#black").show();
        $('#black').height($('#settings').height());
        $("#black").fadeTo("fast", 1);
        $('body').height($('#settings').height() + 60);
        $('html').height($('#settings').height() + 60);
        $('body').css('overflow','hidden');
        toggleNavMenu(false);
        activeSettings = !activeSettings;
    } else if (activeSettings) {
        $("#settings").animate({
            right: "-=80%"
        }, 300, false, function () {
            $("#settings").hide();
        });
        if (buttonPressed) {
            $("#black").fadeTo("fast", 0, function () {
                $("#black").hide();
                $('body').css('height', '');
                $('html').css('height', '');
                $('body').css('overflow','');
            });
        }
        activeSettings = !activeSettings;
    }
}





function onDeviceReady() {

    // Mock device.platform property if not available
    
}

function handleExternalURLs() {
    // Handle click events for all external URLs
    if (/android/i.test(navigator.userAgent)) {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
    }
    else {
        // Leave standard behaviour
    }
}

