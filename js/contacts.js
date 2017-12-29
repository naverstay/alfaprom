var all_pins = [],
  map_timer,
  all_tooltips = [],
  offices = [
    { // Moscow
      lt: 55.748697,
      ln: 37.609663
    },
    { // Samara
      lt: 53.223330,
      ln: 50.192732
    },
    { // Tolliatti
      lt: 53.505992,
      ln: 49.412826
    },
    { // Sizran
      lt: 53.141607,
      ln: 48.442664
    }
  ],
  mapProp = {
    zoom: 16,
    // disableDefaultUI: true,
    scrollwheel: false,
    // navigationControl: false,
    mapTypeControl: false,
    scaleControl: false
  },
  gmap,
  center;

function checkMapSize() {
  clearTimeout(map_timer);

  map_timer = setTimeout(function () {
    if (gmap && center) gmap.setCenter(center);
  }, 10);
}

function updateMap(event, link, panel, el) {
  var ind = link.attr('data-office') * 1 - 1;

  if (ind <= offices.length) {
    center = new google.maps.LatLng(offices[ind].lt, offices[ind].ln);
    checkMapSize();
  }
}

function loadMap() {

  // без таймаута не работает :(

  setTimeout(function () {
    center = new google.maps.LatLng(offices[0].lt, offices[0].ln);
    gmap = new google.maps.Map(document.getElementById("contacts_map"), mapProp);
    gmap.setCenter(center);

    for (var i = 0; i < offices.length; i++) {
      var ofc = offices[i];

      createPin(gmap, 'Альфапром', {
        lat: ofc.lt,
        lng: ofc.ln
      }, false);
    }

  }, 0);
}

function createPin(target_map, name, latlng, icon, icon_hover, magic_top_offset) {
  var img = new Image(), marker;

  if (icon && icon.length) {
    $(img).one('load', function () {
      var image = new google.maps.MarkerImage(
        icon,
        new google.maps.Size(img.width, img.height),
        new google.maps.Point(0, 0),
        new google.maps.Point((img.width / 2).toFixed(), img.height + (magic_top_offset || 0))
      );

      marker = new google.maps.Marker({
        position: latlng,
        map: target_map,
        icon: image,
        title: name
      });

      if (icon_hover && icon_hover.length) {
        google.maps.event.addListener(marker, 'mouseover', function () {
          marker.setIcon(icon_hover);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
          marker.setIcon(icon);
        });
      }

      return marker;
    });

    img.src = icon;

  } else {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });

    if (icon_hover && icon_hover.length) {
      google.maps.event.addListener(marker, 'mouseover', function () {
        //marker.setIcon(icon_hover);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
        //marker.setIcon(icon);
      });
    }

    return marker;
  }
}

$(window).on('resize load', function () {
  checkMapSize();
});

$(function ($) {
  checkMapSize();

  $('.mapBtn').on('click', function () {
    var firedEl = $(this), ind = firedEl.attr('data-office') * 1 - 1;

    if (ind <= offices.length) {
      $('.mapBtn').removeClass('active');
      firedEl.addClass('active');
      center = new google.maps.LatLng(offices[ind].lt, offices[ind].ln);
      checkMapSize();
    }

    return false;
  }).first().click();

});
