$(function () {


  /*-------------------------------------------
  Load Page
  ---------------------------------------------*/

  $('body').waitForImages({
    finished: function () {
      Website();
      $('body').jKit();
    },
    waitForAll: true
  });

  /*-------------------------------------------
  Load Page - next Open Site
  ---------------------------------------------*/

  function Website() {
    CheckScripts();
    Masonry();
    $('body').jKit();
    backgroundmenu();
    setTimeout(function () {
      $('header').fadeIn();
    }, 100);
  }


  /*-------------------------------------------
  Init and check list scripts
  ---------------------------------------------*/

  function CheckScripts() {

    $(document).ready(function () {
      Typewriting();
    });

  }


  /*-------------------------------------------
  Masonry Check Script
  ---------------------------------------------*/

  function Masonry() {
    var $container = $('.portfolio-grid');

    $container.imagesLoaded(function () {
      $container.masonry({
        itemSelector: 'li'
      });
    });
  }


  /*-------------------------------------------
  Multi purpose init Background menu
  ---------------------------------------------*/

  function backgroundmenu() {

    $(document).ready(function () {
      if ($("#header-fade").length) {

        $(window).scroll(function () {
          if ($(this).scrollTop() > 10) {
            $('header').fadeOut();
          } else {
            $('header').fadeIn();
          }
        });
      }

      if ($("#header-white").length) {

        $(window).scroll(function () {
          if ($(this).scrollTop() > 10) {
            $('header').css("background", "white");
            $('header .logo > a').css("borderBottom", "0");

          } else {
            $('header').css("background", "none");
          }
        });
      }


    });

  }

  /*-------------------------------------------
  Typewriting init script
  ---------------------------------------------*/

  function Typewriting() {


    $(document).ready(function () {
      setTimeout(function () {
        if ($("#site-type").length) {
          $(".typewrite span").typed({
            strings: ["show case ", "solution "],
            typeSpeed: 100,
            backDelay: 500,
            loop: false,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
          });
        }
      }, 3000);
    });
  }

})//End