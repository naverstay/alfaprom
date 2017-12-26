var reviewSlider, certificatesSlider;

$(function ($) {

  initReviewSlider();

  initCertificatesSlider();

});

function initReviewSlider() {

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

function initCertificatesSlider() {

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
        breakpoint: 768,
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

