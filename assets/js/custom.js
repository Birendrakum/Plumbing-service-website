
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});






$(document).ready(function () {
$(".mobnav-icon").click(function () {
$(".mobile-menu").slideToggle(500);
$(".top-line").toggleClass("top-animate");
$(".mid-line").toggleClass("mid-animate");
$(".bot-line").toggleClass("bottom-animate");
});
});



    $('.testimonialslider').slick({
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: '<i class="fa-solid fa-chevron-right"></i>',
      prevArrow: '<i class="fa-solid fa-chevron-left"></i>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
