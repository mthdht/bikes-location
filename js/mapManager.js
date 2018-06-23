/*
 * Map manager for map handling
 * Author: mthdht
 * Version: 1.0
 */

/**
 * Constructor for Map Manager that handle the map and markers
 *
 * @param map
 * @param stations
 * @constructor
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
    this.selectedStation = null;
    this.interval = null;

    this.init();
}

/* ==============================================
   MapManager METHODS
   ============================================== */

/**
 * Generate the map markers from the stations array, create markers array
 */
MapManager.prototype.makeMarkers = function () {
    this.stations.forEach(function (station, index) {
        var icons = {
            green: 'https://user-images.githubusercontent.com/24936683/41283205-4467be02-6e36-11e8-93a3-5332345b81ea.png',
            orange: 'https://user-images.githubusercontent.com/24936683/41283217-4681bd00-6e36-11e8-9d96-8bf975d24aa9.png',
            red: 'https://user-images.githubusercontent.com/24936683/41283264-63833262-6e36-11e8-8738-b8bf838f1dcb.png',
            black: 'https://user-images.githubusercontent.com/24936683/41502964-3c403526-71c7-11e8-93f8-dcfdbbd73c29.png'
        };
        var marker = new google.maps.Marker({
            position: {lat: station.position.lat, lng: station.position.lng},
            map: this.map,
            title: station.name.split('-')[1],
            stationIndex: index,
            icon: station.status != 'OPEN' ? icons.black : station.available_bikes > 5 ? icons.green : station.available_bikes > 0 ? icons.orange : icons.red
        });
        this.markers.push(marker);
    }, this);
    var markerCluster = new MarkerClusterer(this.map, this.markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        minimumClusterSize: 5
    });
};

/**
 * Fill the Station info panel with station information
 * @param station
 */
MapManager.prototype.fillStationInfos = function (station) {
    $('.name span').html(station.name.split('-')[1]);

    $('.address span').html(station.address);

    $('.available-bike-stands span').html(station.available_bike_stands);

    $('.available-bikes span').html(station.available_bikes);

    $('.status span').html(station.status);

    // show 'Réserver' button if available bikes
    if (station.available_bikes < 1) {
        $('.reservation-button').css('display', 'none');
    } else {
        $('.reservation-button').css('display', 'block');
    }
};

/**
 * Change the marker icon color
 *
 * this function sees the available bikes of the current station and change the icon color to the
 * marker it belong depends on the status
 * (green to orange, orange to green if status is 'down' and reverse for 'up' status
 *
 * @param status
 */
MapManager.prototype.changeMarkerIcon = function (status) {
    var index = window.sessionStorage.getItem('station');
    if (status == 'up') {
        // change marker icon to be: red => orange, orange => green
        switch (this.stations[index].available_bikes) {
            case 0:
                this.markers[index].setIcon('https://user-images.githubusercontent.com/24936683/41283217-4681bd00-6e36-11e8-9d96-8bf975d24aa9.png');
                break;
            case 5:
                this.markers[index].setIcon('https://user-images.githubusercontent.com/24936683/41283205-4467be02-6e36-11e8-93a3-5332345b81ea.png');
                break;
        }
    } else {
        // change marker icon to be: orange => red, green => orange
        switch (this.stations[index].available_bikes) {
            case 0:
                this.markers[index].setIcon('https://user-images.githubusercontent.com/24936683/41283264-63833262-6e36-11e8-8738-b8bf838f1dcb.png');
                break;
            case 5:
                this.markers[index].setIcon('https://user-images.githubusercontent.com/24936683/41283217-4681bd00-6e36-11e8-9d96-8bf975d24aa9.png');
                break;
        }
    }
};

/**
 * Take care of the registration with associated time
 *
 * this function create a new registration object and change the icon marker if needed.
 * It also generate the timer for displaying reservation message and remove it if time is up
 *
 * @param time
 */
MapManager.prototype.handleRegistration = function (time) {
    // change icon to marker and add available bikes to prev registration
    if (window.sessionStorage.getItem('station') && time == 1200) {
        this.changeMarkerIcon('up');
        this.stations[window.sessionStorage.getItem('station')].available_bikes += 1;
    }

    // remove interval of printing registration message
    clearInterval(this.interval);

    var index = this.stations.indexOf(this.currentStation);

    // make new registration based on time (new or refresh)
    this.registration = new Registration(this.currentStation, index, time);
    this.registration.fillReservationMessage();

    var that = this;

    // show registration message
    $('.message').css('display', 'block');

    // create the interval for changing message infos (time left)
    this.interval = setInterval(function () {
        that.registration.timeLeft -= 1;
        that.registration.fillReservationMessage();

        // if there is no time on registration
        if (that.registration.timeLeft < 0) {
            // stop printing registration message
            clearInterval(that.interval);
            $('.message').toggle();

            that.changeMarkerIcon('up');

            // clear the registration storage
            that.registration.storage.clear();

            that.stations[index].available_bikes += 1;
            that.fillStationInfos(that.registration.station);
            $('#panel').css('display', 'block');

        }
    }, 1000);

    // change number of available bike and change marker icon if needed
    this.stations[index].available_bikes -= 1;
    this.changeMarkerIcon('down');
};

/**
 * Create all the events Listeners that the map needs
 */
MapManager.prototype.eventsListeners = function () {
    var that = this;
    // marker event listener
    this.markers.forEach(function (marker, index) {
        marker.addListener('click', function () {
            that.selectedStation = that.stations[marker.stationIndex];
            $('.reservation-signature').css('display', 'none');
            $('.blank-signature').css('display', 'none');
            that.fillStationInfos(that.selectedStation);
            $('#panel').css('display', 'block');
            window.location.href = '#panel';
        });
    }, this);

    // canvas events listeners
    var canvas = $('#reservation-canvas');
    var context = canvas[0].getContext('2d');
    context.lineJoin="round";
    context.lineCap = "round";
    context.lineWidth=3;
    var paiting = false;

    canvas[0].addEventListener('touchstart', function (event) {
        event.preventDefault();
        context.beginPath();
        context.moveTo(event.changedTouches[0].clientX - this.getBoundingClientRect().x, event.changedTouches[0].clientY - this.getBoundingClientRect().y);
        paiting = true;

    });

    canvas[0].addEventListener('touchend', function (event) {
        paiting = false;
    });

    canvas[0].addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (paiting) {
            $('.blank-signature').css('display', 'none');
            context.lineTo(event.changedTouches[0].clientX - this.getBoundingClientRect().x, event.changedTouches[0].clientY - this.getBoundingClientRect().y);
            context.stroke();
        }
    });



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
        $('#panel').toggle();
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
            that.currentStation = that.selectedStation;
            that.handleRegistration(1200);
            $('.reservation-signature').toggle();
            $('.blank-signature').css('display', 'none');
            context.clearRect(0,0,canvas[0].width, canvas[0].height);
            that.fillStationInfos(that.currentStation);
        } else {
            $('.blank-signature').css('display', 'block');
        }
    });
};

/**
 * Initialise what the map need,
 *  - create the markers
 *  - start the events listeners
 *  - start a registration for bike if there is stored in session storage
 *  - fill bikes and stations infos
 */
MapManager.prototype.init = function () {
    this.makeMarkers();
    this.eventsListeners();

    var time = 1200 - (new Date() - new Date(window.sessionStorage.time)) / 1000;
    // if there is already a registration
    if (time > 0) {
        this.currentStation = this.stations[window.sessionStorage.getItem('station')];
        this.handleRegistration(time);
    }

    // show infos of all stations
    var available_bikes = 0, stations = 0;
    this.stations.forEach(function (station) {
        available_bikes += station.available_bikes;
        station.status == 'OPEN' ? stations += 1 : null;
    });

    $('.bikes p').html(available_bikes + " vélos disponibles");
    $('.stations p').html(stations + ' stations ouvertes');
};
