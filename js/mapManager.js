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
    this.markers.forEach(function (marker) {
        var that = this;
        marker.addListener('click', function () {
            that.currentStation = marker.station;
            that.showStationInfos(marker.station);
        });
    }, this);

    $('.toggle-panel').on('click', function (event) {
        $('#panel').css('display', 'none');
    });

    $('.reservation-button').on('click', function (event) {
        $('.reservation-signature').css('display', 'flex');
    });

    $('.toggle-canvas, .reservation-signature').on('click', function (event) {
        $('.reservation-signature').css('display', 'none');
    });

    $('#reservation-canvas').on('click', function (event) {
        event.stopPropagation();
    })


};

// TODO: create init method
MapManager.prototype.init = function () {

};