"use strict";

$(function () {
  $(".hamburger, #page_overlay, .sidemenu a").on('click', function () {
    $("#mobile_menu_wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  });
}); //fix menu

$(window).on('scroll', function () {
  if ($(window).scrollTop() > $(".first_screen").height()) {
    if (!$("header").hasClass("fixed_nav")) {
      $("header").addClass("fixed_nav");
    }
  } else {
    if ($("header").hasClass("fixed_nav")) {
      $("header").removeClass("fixed_nav");
    }
  }
}); //плавное прокручивание (отмена загрузки страницы)

$(".main_menu a").on('click', function (e) {
  e.preventDefault(); //при клике на ссылку перемещаем (высота от меню сверху от блока -79, прокручиване от верха 500мc)

  var top = $($(this).attr("href")).offset().top - 79;
  $("html, body").animate({
    scrollTop: top + 'px'
  }, 500);
}); //при нажатии на стрелку прокручиваем к первому блоку

$(".arrow_wrap").on('click', function (e) {
  e.preventDefault();
  var top = $(".arrow_wrap").offset().top;
  $("html, body").animate({
    scrollTop: top + 'px'
  }, 500);
}); //slick slider

$(function () {
  $('#slider_first').slick({
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    dots: true
  });
}); //JSON

$(function getNews() {
  $.ajax({
    url: 'json_file/news.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';
      json.forEach(function (el) {
        html += "\n                <div class=\"card_1_see cards\">\n                  <img width=\"100%\"src=\"".concat(el.pic, "\" alt=\"\">\n\n                    <div class=\"card_text\">\n                        <h4>").concat(el.title, "</h4>\n                        <p>").concat(el.description, "</p>\n\n                        <div class=\"author\">\n                              <div class=\"athor_pic\"> <img src=\"").concat(el.avatar, "\" alt=\"\"></div>\n                              <div class=\"name\">").concat(el.author, "</div>\n                              <div class=\"date\">").concat(el.date, "</div>\n                        </div>\n                    </div>\n                  </div>");
      });
      $(".ajax").html(html);
      sliderInit($('#slider'));
    }
  });
}); //$("#slider_2").slick({

function sliderInit($slider_2) {
  if (!$slider_2.hasClass('slick-initialized')) {
    $("#slider_second").slick({
      speed: 3000,
      slidesToShow: 3,
      dots: true,
      autoplay: true,
      autoplaySpeed: 250,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  }
}

lightGallery(document.getElementById('lightgallery'), {
  plugins: [lgZoom, lgThumbnail],
  thumbnail: true,
  zoom: true,
  actualSize: true,
  animateThumb: true,
  zoomFromOfigin: true //  licenseKey: "0000-0000-000-0000",
  // speed: "500"

});
$(function () {
  $("#init_map").on('click', function () {
    $(this).remove();
    var map = L.map('my_map').setView([40.71216442573062, -74.00905137419346], 13);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var myIcon = L.icon({
      iconUrl: 'assets/plugins/leaflet/images/Pin.png',
      iconAnchor: [12, 41],
      popupAnchor: [40, -21]
    });
    var marker = L.marker([40.71216442573062, -74.00905137419346], {
      icon: myIcon
    }).addTo(map).bindPopup("\n      <div class=\"map_popup\">\n       <img src=\"assets/images/new_york_popup.jpg\"\" alt=\"\">\n          <div class=\"map-info\">\n              <b>New York City!!!<br>\n                Come to us!</b>\n          </div>\n      </div>\n      ");
    marker.on('click', function () {
      document.getElementById('to_google_map').click(); // window.location.href='https://www.google.com/maps/@40.6976684,-74.2605517,10z';
    });
  });
  $("#registration_wrap").on('submit', function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    $("#name").removeClass("error");
    $("#email").removeClass("error");

    if (name.length <= 1) {
      $("#name").addClass("error");
      alert.danger('Please, enter your name!', true);
    } else if (email.length <= 1) {
      $("#email").addClass("error");
      alert.danger('Please, enter your email!', true);
    } else {
      $("#name").removeClass("error");
      $("#email").removeClass("error");
    }
  });
});
/*
$("#registration_wrap").on('submit', function(){

  if ($("#name").val() = '' ) {
    alert("Please, enter your name");
  }

  if ($("#email").val() = '' ) {
    alert("Please, enter your email");
  }

});
*/