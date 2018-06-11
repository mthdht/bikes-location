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

};

// TODO: create markerEventsListeners method
MapManager.prototype.markersEventsListeners = function () {

};

// TODO: create init method
MapManager.prototype.init = function () {

};