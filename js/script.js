var heroSlider;

$(function ($) {

  initSelect();

  initHeroSlider();

  initTabs();

  $('.bsOnLoad').each(function () {
    var img = $(this);
    img.parent().backstretch(img.attr('src'));
  });

});

function plural(n, str1, str2, str5) {
  return n + ' ' + ((((n % 10) === 1) && ((n % 100) !== 11)) ? (str1) : (((((n % 10) >= 2) && ((n % 10) <= 4)) && (((n % 100) < 10) || ((n % 100) >= 20))) ? (str2) : (str5)))
}


function initTabs() {

  $('.tabContainer').each(function (ind) {
    var tabs = $(this);

    tabs.bind('easytabs:before', function (event, link, panel) {
      var func = $(this).attr('data-mob-event');

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
