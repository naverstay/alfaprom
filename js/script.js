var heroSlider, html,
    articleThumbSlider, articleSlider, reviewSlider, certificatesSlider;


$(function ($) {
    html = $('html');

    initSelect();

    initHeroSlider();

    initArticleSlider();

    initReviewSlider();

    initCertificatesSlider();

    initTabs();

    initMask();

    browserCheck();

    $('body')
        .delegate('.collapseBtn', 'click', function () {
            $(this).closest('.collapseHolder').toggleClass('_opened').find('.collapseBlock').slideToggle();
            return false;
        })
        .delegate('.valPlus', 'click', function () {
            var valCell = $(this).closest('.valCell'),
                inp = valCell.find('input'),
                val = parseInt(inp.val().replace(/\D/g, '')) || 0,
                min_val = 1 * inp.attr('data-min'),
                max_val = 1 * inp.attr('data-max'),
                new_val = val + (1 * inp.attr('data-step'));

            inp.val(new_val <= max_val ? (new_val >= min_val ? new_val : min_val) : max_val).focus();

            return false;
        })
        .delegate('.valMinus', 'click', function () {
            var valCell = $(this).closest('.valCell'),
                inp = valCell.find('input'),
                val = parseInt(inp.val().replace(/\D/g, '')),
                min_val = 1 * inp.attr('data-min'),
                max_val = 1 * inp.attr('data-max'),
                new_val = val - (1 * inp.attr('data-step'));

            inp.val(new_val >= min_val ? (new_val <= max_val ? new_val : max_val) : min_val).focus();

            return false;
        })
        .delegate('.openMobMenu', 'click', function () {
            if (html.hasClass('_menu_opened')) {
                html.removeClass('_menu_opened').css('margin-right', '');
            } else {
                html.addClass('_menu_opened').css('margin-right', getScrollbarWidth());
            }

            return false;
        });

    $('.bsOnLoad').each(function () {
        var img = $(this);
        img.parent().backstretch(img.attr('src'));
    });

});

function initMask(el) {

    if (el === void 0) {
        el = $("input");
    }

    el.each(function (i, el) {
        var inp = $(el), param = {};

        if (inp.attr('data-inputmask') !== void 0) {
            inp.inputmask();
        }

        if (inp.attr('data-inputmask-email') !== void 0) {
            param.regex = inp.attr('data-inputmask-email');
            param.placeholder = '_';

            inp.inputmask('Regex', param);
        }

        if (inp.attr('data-inputmask-regex') !== void 0) {
            inp.inputmask('Regex', param);
        }

        if (inp.attr('data-inputmask-custom') !== void 0) {
            inp.inputmask(JSON.parse('{' + inp.attr('data-inputmask-custom').replace(/'/g, '"') + '}'));
        }
    });
}

function browserCheck() {
    var myNav = navigator.userAgent.toLowerCase(), ie,
        html = document.documentElement;

    if ((myNav.indexOf('msie') != -1)) {
        ie = ((myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false);
        html.className += ' msie';
        html.className += ' ie' + ie;
    } else if (!!myNav.match(/trident.*rv\:11\./)) {
        ie = 11;
        html.className += ' ie' + ie;
    }

    if (myNav.indexOf('safari') != -1) {
        if (myNav.indexOf('chrome') == -1) {
            html.className += ' safari';
        } else {
            html.className += ' chrome';
        }
    }

    if (myNav.indexOf('firefox') != -1) {
        html.className += ' firefox';
    }

    if ((myNav.indexOf('windows') != -1)) {
        html.className += ' windows';
    }

    if (/ipad|iphone|ipod/ig.test(myNav) && !window.MSStream) {
        html.className += ' ios';
    }
}

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

function plural(n, str1, str2, str5) {
    return n + ' ' + ((((n % 10) === 1) && ((n % 100) !== 11)) ? (str1) : (((((n % 10) >= 2) && ((n % 10) <= 4)) && (((n % 100) < 10) || ((n % 100) >= 20))) ? (str2) : (str5)))
}

function initArticleSlider() {

    if ($('.articleSlider').length && $('.articleThumbSlider').length) {

        articleSlider = $('.articleSlider').on('init', function (event, slick, direction) {

        }).slick({
            //variableWidth: true,
            dots: false,
            mobileFirst: true,
            infinite: true,
            arrows: true,
            swipe: true,
            accessibility: false,
            autoplay: false,
            autoplaySpeed: 3000,
            //centerMode: true,
            //variableWidth: true,
            speed: 600,
            zIndex: 1,
            initialSlide: 0,
            //asNavFor: '.activeTabSlider, .productOptionSlider',
            //centerPadding: '0',
            slide: '.articleSlider .article_slide',
            appendArrows: '.articleControls',
            appendDots: '.articleControls',
            asNavFor: '.articleThumbSlider',
            //prevArrow: '.serviceSlider .slide_prev',
            //nextArrow: '.serviceSlider .slide_next',

            //variableWidth: true,
            slidesToShow: 1,
            touchThreshold: 10
        });

        articleThumbSlider = $('.articleThumbSlider').on('init', function (event, slick, direction) {

        }).slick({
            //variableWidth: true,
            dots: false,
            mobileFirst: true,
            infinite: true,
            arrows: false,
            swipe: true,
            variableWidth: true,
            accessibility: false,
            autoplay: false,
            autoplaySpeed: 3000,
            //centerMode: true,
            //variableWidth: true,
            speed: 600,
            zIndex: 1,
            initialSlide: 0,
            //asNavFor: '.activeTabSlider, .productOptionSlider',
            //centerPadding: '0',
            slide: '.articleThumbSlider .article_thumb_slide',
            //appendArrows: '.articleControls',
            //appendDots: '.articleControls',
            asNavFor: '.articleSlider',
            //prevArrow: '.serviceSlider .slide_prev',
            //nextArrow: '.serviceSlider .slide_next',

            //variableWidth: true,
            slidesToShow: 1,
            touchThreshold: 10
        });
    }
}

function initReviewSlider() {

    if ($('.reviewSlider').length) {

        reviewSlider = $('.reviewSlider').on('init', function (event, slick, direction) {

        }).slick({
            //variableWidth: true,
            dots: true,
            mobileFirst: true,
            infinite: true,
            arrows: true,
            swipe: true,
            accessibility: false,
            autoplay: false,
            autoplaySpeed: 3000,
            //centerMode: true,
            //variableWidth: true,
            speed: 600,
            zIndex: 1,
            initialSlide: 0,
            //asNavFor: '.activeTabSlider, .productOptionSlider',
            //centerPadding: '0',
            slide: '.reviewSlider .review_slide',
            appendArrows: '.reviewControls',
            appendDots: '.reviewControls',
            //prevArrow: '.serviceSlider .slide_prev',
            //nextArrow: '.serviceSlider .slide_next',

            //variableWidth: true,
            slidesToShow: 1,
            touchThreshold: 10
        });
    }

}

function initCertificatesSlider() {

    if ($('.certificatesSlider').length) {
        certificatesSlider = $('.certificatesSlider').on('init', function (event, slick, direction) {

        }).slick({
            //variableWidth: true,
            dots: true,
            mobileFirst: true,
            infinite: true,
            arrows: true,
            swipe: true,
            accessibility: false,
            autoplay: false,
            autoplaySpeed: 3000,
            //centerMode: true,
            //variableWidth: true,
            speed: 600,
            zIndex: 1,
            initialSlide: 0,
            //asNavFor: '.activeTabSlider, .productOptionSlider',
            //centerPadding: '0',
            slide: '.certificatesSlider .certificates_slide',
            appendArrows: '.certificatesControls',
            appendDots: '.certificatesControls',
            //prevArrow: '.serviceSlider .slide_prev',
            //nextArrow: '.serviceSlider .slide_next',

            //variableWidth: true,
            slidesToShow: 1,
            touchThreshold: 10,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

}

function initTabs() {

    $('.tabContainer').each(function (ind) {
        var tabs = $(this);

        tabs.bind('easytabs:before', function (event, link, panel) {
            var func = $(this).attr('data-event');

            if (func && func in window) {
                window[func](event, link, panel, $(this));
            }
        }).easytabs({
            //animationSpeed: 0,
            tabs: '.tabControls>li'
        });
    });
}

function initHeroSlider() {

    if ($('.heroSlider').length) {
        heroSlider = $('.heroSlider').on('init', function (event, slick, direction) {

            slick.$slider.find('.bsImg').each(function () {
                var img = $(this);
                img.parent().backstretch(img.attr('src'));
            });

        }).slick({
            //variableWidth: true,
            dots: true,
            mobileFirst: true,
            infinite: true,
            arrows: true,
            swipe: true,
            accessibility: false,
            autoplay: false,
            autoplaySpeed: 3000,
            //centerMode: true,
            //variableWidth: true,
            speed: 600,
            zIndex: 1,
            initialSlide: 0,
            //asNavFor: '.activeTabSlider, .productOptionSlider',
            //centerPadding: '0',
            slide: '.heroSlider .hero_slide',
            appendArrows: '.heroControls',
            appendDots: '.heroControls',
            //prevArrow: '.serviceSlider .slide_prev',
            //nextArrow: '.serviceSlider .slide_next',

            //variableWidth: true,
            slidesToShow: 1,
            touchThreshold: 10
        });
    }

}

function initSelect() {
    $.fn.select2.amd.define('select2/i18n/ru', [], function () {
        // Russian
        return {
            errorLoading: function () {
                return 'Результат не может быть загружен.';
            },
            inputTooLong: function (args) {
                var overChars = args.input.length - args.maximum;
                return 'Пожалуйста, удалите ' + overChars + ' символ' + plural(overChars, '', 'а', 'ов');
            },
            inputTooShort: function (args) {
                var remainingChars = args.minimum - args.input.length;

                return 'Пожалуйста, введите ' + remainingChars + ' или более символов';
            },
            loadingMore: function () {
                return 'Загружаем ещё ресурсы…';
            },
            maximumSelected: function (args) {
                var message = 'Вы можете выбрать ' + args.maximum + ' элемент' + plural(args.maximum, '', 'а', 'ов');

                if (args.maximum >= 2 && args.maximum <= 4) {
                    message += 'а';
                } else if (args.maximum >= 5) {
                    message += 'ов';
                }

                return message;
            },
            noResults: function () {
                return 'Ничего не найдено';
            },
            searching: function () {
                return 'Поиск…';
            }
        };
    });

    var s2options = {
            language: 'ru',
            width: '100%',
            closeOnSelect: true,
            allowClear: false,
            minimumResultsForSearch: 3,
            containerCssClass: "select_c2"
        },

        s2ajax = {
            ajax: {
                //url: "https://api.github.com/search/repositories",
                url: "data/cities.json",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used

                    params.page = params.page || 1;

                    return {
                        results: data.cities,
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            minimumInputLength: 1
        };

    $('.select2').each(function (ind) {
        var $slct = $(this),
            cls = $slct.attr('data-select-class') || '',
            opt = {
                placeholder: $slct.attr('data-placeholder') || 'Select a state',
                dropdownParent: $slct.parent(),
                adaptDropdownCssClass: function (c) {
                    return cls;
                }
            };

        opt = $.extend({}, opt, ($slct.hasClass('ajax') ? s2ajax : s2options));

        opt = $.extend({}, opt, ($slct.hasClass('prefix') ? s2prefix : s2options));

        $slct.select2(opt);
    });
}
