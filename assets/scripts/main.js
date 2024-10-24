var headerHeight = 0;
var bannerHeight = 0;
var currSeconds = 0;
var resetTimer = () => {

    currSeconds = 0;
    $('#app-header').removeClass("show");
}
var timerIncrement = () => {

    currSeconds = currSeconds + 1;
    if (currSeconds > 5) {
        $('#app-header').addClass("show");

    }
    // console.log(currSeconds);
}

window.onInitPage = ($event, scrollEvent = true) => {
    $($event).mousemove(resetTimer);
    $($event).keypress(timerIncrement);
    $($event).scroll(resetTimer);
    setInterval(timerIncrement, 1000);

    if (scrollEvent) {
        let isSimple = $('#app-header').hasClass('simple');
        let isHidden = $('#app-header').attr('data-type') == 'hidden';
        headerHeight = $('#app-header').outerHeight();
        if ($('#app-banner') && $('#app-banner').length) {
            bannerHeight = $('#app-banner').outerHeight();
        }
        if (isSimple) {
            $('#app-header-placeholder').height(headerHeight + 3);
        }

        $(window).on('scroll', function (e) {
            let fromTop = $(window).scrollTop();
            if (isSimple) {
                if (fromTop > headerHeight) {
                    $('#app-header').addClass('invisible fixed');
                    setTimeout(() => {
                        $('#app-header').addClass("active");
                    }, 1000);
                }
                else {
                    $('#app-header').removeClass("fixed");
                    $('#app-header').removeClass('invisible');
                    $('#app-header').removeClass("active");
                }
            }
            else {
                $("body").css({ "padding-top": Math.min(fromTop, headerHeight) });
                if (fromTop > headerHeight) {
                    $('#app-header').addClass('invisible');
                    setTimeout(() => {
                        $('#app-header').addClass("active");
                    }, 1000);
                }
                else {
                    $('#app-header').removeClass('invisible');
                    $('#app-header').removeClass("active");
                }

                if (fromTop > headerHeight + bannerHeight) {
                    $('#app-header').addClass("fixed");
                    setTimeout(() => {
                        $('#app-header').addClass("active");
                    }, 1000);

                }
                else {

                    // $("body").removeClass("scrollable");
                    $('#app-header').removeClass("fixed");
                    $('#app-header').removeClass("active");
                }
            }
        });
    }

}


$('#app-menu-center-button').on('click', function () {
    $('#popup-menu').toggleClass('open');
    $(this).toggleClass('open');
    $('html').toggleClass('menu-open');
});
$('#app-header-menu-toggler').on('click', function () {
    $('#popup-menu').toggleClass('open');
    $(this).toggleClass('open');
    $('html').toggleClass('menu-open');
});
$('#popup-menu .menu-toggler').on('click', function () {
    $('#popup-menu').removeClass('open');
    $('html').toggleClass('menu-open');
});
$("#back-to-top-btn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
});