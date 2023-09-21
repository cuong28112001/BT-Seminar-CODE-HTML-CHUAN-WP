// $("#track").width($("#content1").width());
$(document).ready(function () {
    // add bg-transparent
    $(".card").addClass("bg-transparent");

    // header slider
    $("#track").removeClass("d-none");

    // menu
    $(".header__button--menu").click(function () {
        $(".header__nav").addClass("header__nav--show");
        $(".header__shadow").addClass("header__shadow--show");
    });

    $(".header__nav--icon-close").click(function () {
        $(".header__nav").removeClass("header__nav--show");
        $(".header__shadow").removeClass("header__shadow--show");
    });

    $(".header__shadow").click(function () {
        $(".header__nav").removeClass("header__nav--show");
        $(".header__shadow").removeClass("header__shadow--show");
    });

    // search
    $(".header__button--search").click(function () {
        $(".header__form--search").removeClass("width-0");
        $(".header__form--search").addClass("width-100");
    });

    $(".header__search-close").click(function () {
        $(".header__form--search").removeClass("width-100");
        $(".header__form--search").addClass("width-0");
    });

    $(".search__form--icon-clear").click(function () {
        $(".search__form--input").val("");
    });

    $(window).scroll(function () {
        if ($(window).width() >= 576) {
            if (window.pageYOffset >= 234) {
                $(".header__freeze").addClass("header__freezed");
            } else {
                $(".header__freeze").removeClass("header__freezed");
            }
        } else {
            if (window.pageYOffset >= 184) {
                $(".header__freeze").addClass("header__freezed");
            } else {
                $(".header__freeze").removeClass("header__freezed");
            }
        }
    });
});
