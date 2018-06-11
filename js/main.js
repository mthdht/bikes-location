/*
 * Slider: Flexible and customizable
 * this is the main js file which handle slider object, map interaction
 * Author: mthdht
 * Dependency: jQuery library
 * Version: 1.0
 */

$(document).ready(function () {

/*
 * logic for slider
 */
    //data for slide
    var sliderData = [
        {
            data : {
                imageSrc: 'http://gaetanboyron.fr/wp-content/uploads/2017/06/IMG_0442-1200x500.jpg',
                imageAlt: 'stand de velo',
            },
            options: {
                titleColor: '#fff',
                descriptionColor: '#fff'
            }
        },
        {
            data : {
                imageSrc: 'https://pbs.twimg.com/media/DbikTUGXcAAFnoT.jpg',
                imageAlt: 'ville de lyon',
                title: 'ville de lyon'
            },
            options: {
                titleColor: '#fff'
            }
        },
        {
            data: {
                imageSrc: 'http://backgroundcheckall.com/wp-content/uploads/2017/12/parallax-background-image-1.jpg',
                imageAlt: 'ville de lyon',
                title: 'ville de lyon'
            },
            options: {
                titleColor: '#fff'
            }
        }
    ];

    // options for slide
    var myoptions = {
        interval:4000,
        keyboard: true,
        autoplay: true,
        animation: 'slide',
        controls: true
    };

    // new instance of slide
    var slider = new Slider(sliderData, myoptions);

    /*
     * logic for map
     */
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 45.7524845, lng: 4.8474354 },
    });

    $.get({
        url:'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=74369f6b8f27af8c8490527ed36bfc461783501c'
    }).done(function (data) {
        var mapManager = new MapManager(map, data);
        console.log(mapManager);
        mapManager.makeMarkers();
        mapManager.markersEventsListeners();
    });
});
