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

    // this.init();
}

/* ==============================================
   MapManager METHODS
   ============================================== */
// TODO: create makeMarkers method
MapManager.prototype.makeMarkers = function () {
    this.stations.forEach(function (station) {
        var marker = new google.maps.Marker({
            position: {lat: station.position.lat, lng: station.position.lng},
            map: map,
            title: station.name,
            station: station
        });
        this.markers.push(marker);
    }, this);
};

// TODO: create showStationInfos method
MapManager.prototype.showStationInfos = function (station) {
    var togglePanel = $('<button>', {
        'class': 'toggle-panel',
        html: 'close'
    }).on('click', function (event) {
        $('#panel').toggle();
    }).append($('<i>', {
        'class':'fas fa-times'
    }).css('paddingLeft', '10px'));

    var heading = $('<h2>', {
        html: '<div class="icon"><i class="fas fa-info-circle fa-2x"></i></div> Détail de la station'
    });

    var infos = $('<div>', {
        'class': 'station-info'
    });
    var name = $('<p>', {
       html: '<strong>Nom</strong>: ' + station.name.split('-')[1]
    });

    var adresse = $('<p>', {
        html: '<strong>Adresse</strong>: ' + station.address
    });

    // var bikeStands = $('<p>', {
    //     html: '<strong>Nombre d\'emplacements</strong>: ' + station.bike_stands
    // });

    var availableBikeStands = $('<p>', {
        html: '<strong>Emplacements libres</strong>: ' + station.available_bike_stands
    });

    var availableBikes = $('<p>', {
        html: '<strong>Vélos disponibles</strong>: ' + station.available_bikes
    });

    var status = $('<p>', {
        html: '<strong>statut</strong>: ' + (station.status == "OPEN" ? 'Ouvert' : 'Fermé')
    });

    infos.append(name, adresse, availableBikeStands, availableBikes, status);
    $('#panel').html('').append(togglePanel, heading, infos).css('display', 'block');

};

// TODO: create markerEventsListeners method
MapManager.prototype.markersEventsListeners = function () {
    this.markers.forEach(function (marker) {
        var that = this;
        marker.addListener('click', function () {
            that.showStationInfos(marker.station);
        });
    }, this);
};

// TODO: create init method
MapManager.prototype.init = function () {

};