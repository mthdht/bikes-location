/*
 * Map manager for map handling
 * Author: mthdht
 * Version: 1.0
 */

function MapManager(map, stations) {
    /* ==============================================
       MapManager PROPERTIES
       ============================================== */
    this.map = map;
    this.stations = stations;
    this.markers = [];
    this.registration = null;
    this.currentStation = null;

    // this.init();
}

/* ==============================================
   MapManager METHODS
   ============================================== */
// TODO: create makeMarkers method
MapManager.prototype.makeMarkers = function () {
    this.stations.forEach(function (station) {
        var icons = {
            green: 'https://user-images.githubusercontent.com/24936683/41283205-4467be02-6e36-11e8-93a3-5332345b81ea.png',
            orange: 'https://user-images.githubusercontent.com/24936683/41283217-4681bd00-6e36-11e8-9d96-8bf975d24aa9.png',
            red: 'https://user-images.githubusercontent.com/24936683/41283264-63833262-6e36-11e8-8738-b8bf838f1dcb.png'
        };
        var marker = new google.maps.Marker({
            position: {lat: station.position.lat, lng: station.position.lng},
            map: map,
            title: station.name,
            station: station,
            icon: station.available_bikes > 5 ? icons.green : station.available_bikes > 0 ? icons.orange : icons.red
        });
        this.markers.push(marker);
    }, this);
    var markerCluster = new MarkerClusterer(map, this.markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        minimumClusterSize: 5
    });
};

// TODO: create showStationInfos method
MapManager.prototype.showStationInfos = function (station) {
    $('.name span').html(station.name.split('-')[1]);

    $('.address span').html(station.address);

    $('.available-bike-stands span').html(station.available_bike_stands);

    $('.available-bikes span').html(station.available_bikes);

    $('.status span').html(station.status);

    $('#panel').css('display', 'block');

};

// TODO: create markerEventsListeners method
MapManager.prototype.eventsListeners = function () {

    // marker event listener
    this.markers.forEach(function (marker) {
        var that = this;
        marker.addListener('click', function () {
            that.currentStation = marker.station;
            that.showStationInfos(marker.station);
        });
    }, this);

    // canvas events listeners
    var canvas = $('#reservation-canvas');
    var context = canvas[0].getContext('2d');
    context.lineJoin="round";
    context.lineCap = "round";
    context.lineWidth=3;
    var paiting = false;

    canvas.on('mousedown', function (event) {
        context.beginPath();
        context.moveTo(event.offsetX, event.offsetY);
        paiting = true;
    });

    canvas.on('mousemove', function (event) {
        if (paiting) {
            $('.blank-signature').css('display', 'none');
            context.lineTo(event.offsetX , event.offsetY);
            context.moveTo(event.offsetX, event.offsetY);
            context.stroke();
        }
    });

    canvas.on('mouseup', function (event) {
        paiting = false;
    });

    canvas.on('mouseleave', function (event) {
        paiting = false;
    });

    // close button on panel
    $('.toggle-panel').on('click', function (event) {
        $('#panel').css('display', 'none');
    });

    // reservation button open the modal
    $('.reservation-button').on('click', function (event) {
        $('.reservation-signature').css('display', 'flex');
    });

    // close signature modal on click on it or close button
    $('.toggle-canvas, .reservation-signature').on('click', function (event) {
        $('.reservation-signature').css('display', 'none');
        $('.blank-signature').css('display', 'none');
        context.clearRect(0,0,canvas[0].width, canvas[0].height);
    });

    // make click on canvas or 'envoyer' button not dismiss the modal
    $('#reservation-canvas, .reservation-complete').on('click', function (event) {
        event.stopPropagation();
    });

    // check signature and register the reservation
    $('.reservation-complete').on('click', function (event) {
       // check if the canvas is not empty
        var blank = document.createElement('canvas');
        blank.width = canvas[0].width;
        blank.height = canvas[0].height;

        if (canvas[0].toDataURL() != blank.toDataURL()) {
            console.log('not empty');
        } else {
            $('.blank-signature').css('display', 'block');
        }
    });
};

// TODO: create init method
MapManager.prototype.init = function () {

};